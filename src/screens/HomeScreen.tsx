import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { personalitiesData } from '../data/personalities';
import PersonalityCard from '../components/PersonalityCard';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-4xl font-extrabold text-gray-800">
          Hevel Game
        </Text>
        <Text className="text-lg text-gray-500 mt-1">
          Choose a great mind to start.
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <View className="flex-row flex-wrap justify-between">
          {personalitiesData.map((p) => (
            <PersonalityCard
              key={p.id}
              personality={p}
              onPress={() => navigation.navigate('Game', { personality: p })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;