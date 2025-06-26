import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Phrase } from '../types';

type GameScreenProps = NativeStackScreenProps<RootStackParamList, 'Game'>;

const GameScreen = ({ route, navigation }: GameScreenProps) => {
  const { personality } = route.params;
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showMemory, setShowMemory] = useState(true);

  const MEMORY_TIME = 7000;

  // Progress bar state
  const progress = useRef(new Animated.Value(0)).current;

  const phrase = personality.phrases[currentPhraseIndex];

  useEffect(() => {
    setShowMemory(true);
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: MEMORY_TIME,
      useNativeDriver: false,
      easing: t => t,
    }).start();
    const timer = setTimeout(() => {
      setShowMemory(false);
    }, MEMORY_TIME);
    return () => {
      clearTimeout(timer);
      progress.stopAnimation();
    };
  }, [currentPhraseIndex]);

  const handleOptionPress = (option: string) => {
    if (showFeedback || showMemory) return;
    setSelectedOption(option);
    const correct = option === phrase.answer;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    if (isCorrect) {
      if (currentPhraseIndex < personality.phrases.length - 1) {
        setCurrentPhraseIndex(currentPhraseIndex + 1);
      } else {
        navigation.goBack(); // All phrases completed
      }
    }
    setIsCorrect(null);
  };

  const renderMemoryText = (currentPhrase: Phrase) => {
    const parts = currentPhrase.text.split('{blank}');
    return (
      <Text className="text-2xl text-center text-gray-700 leading-relaxed">
        {parts[0]}
        {currentPhrase.answer}
        {parts[1]}
      </Text>
    );
  };
  
  const renderPhraseText = (currentPhrase: Phrase) => {
    const parts = currentPhrase.text.split('{blank}');
    return (
      <Text className="text-2xl text-center text-gray-700 leading-relaxed">
        {parts[0]}
        <View className="px-8 py-1 bg-gray-200 border-b-2 border-gray-400 rounded-md mx-2">
          <Text className="text-2xl font-bold text-gray-200">_____</Text>
        </View>
        {parts[1]}
      </Text>
    );
  }
  
  const getOptionButtonStyle = (option: string) => {
    if (!showFeedback) return "bg-white border-2 border-gray-200";
    if (option === phrase.answer) return "bg-green-100 border-2 border-green-500";
    if (option === selectedOption) return "bg-red-100 border-2 border-red-500";
    return "bg-white border-2 border-gray-200 opacity-50";
  }
  
  const getOptionTextStyle = (option: string) => {
    if (!showFeedback) return "text-gray-800";
    if (option === phrase.answer) return "text-green-700 font-bold";
    if (option === selectedOption) return "text-red-700 font-bold";
    return "text-gray-500";
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 justify-between">
      <View className="p-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
           <Text className="text-lg text-blue-500 font-bold">{'< Home'}</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-800 ml-4 flex-1 text-center">
          {personality.name}
        </Text>
         <View className="w-16"/>
      </View>

      {/* Progress bar for memory phase */}
      {showMemory && (
        <View className="w-full h-2 bg-gray-200 mb-2">
          <Animated.View
            style={{
              height: 8,
              backgroundColor: '#3B82F6', // blue-500
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              borderRadius: 4,
            }}
          />
        </View>
      )}

      <View className="flex-1 justify-center items-center px-6">
        {showMemory ? renderMemoryText(phrase) : renderPhraseText(phrase)}
      </View>
      
      <View className="px-6 pb-8">
        {!showMemory && phrase.options.map((option) => (
          <TouchableOpacity
            key={option}
            className={`p-4 rounded-2xl w-full mb-3 shadow-sm ${getOptionButtonStyle(option)}`}
            onPress={() => handleOptionPress(option)}
            disabled={showFeedback}
          >
            <Text className={`text-center text-lg ${getOptionTextStyle(option)}`}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Modal animationType="slide" transparent={true} visible={showFeedback}>
        <View className="flex-1 justify-end">
            <View className={`p-6 rounded-t-3xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <Text className={`text-2xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? "You got it!" : "That's not it."}
                </Text>
                {!isCorrect && (
                  <Text className="text-lg mt-2 text-red-600">
                      Correct answer: {phrase.answer}
                  </Text>
                )}
                <TouchableOpacity
                    className={`mt-6 p-4 rounded-2xl w-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                    onPress={handleNext}
                >
                    <Text className="text-white text-center text-lg font-bold">
                        {isCorrect ? 'Next' : 'Try Again'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default GameScreen;
