// --- file: src/components/PersonalityCard.tsx ---

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Personality } from '../types';

interface PersonalityCardProps {
  personality: Personality;
  onPress: () => void;
}

const PersonalityCard = ({ personality, onPress }: PersonalityCardProps) => (
  <TouchableOpacity
    className="bg-white p-4 rounded-2xl border-2 border-gray-200 shadow-md w-[48%] mb-4 items-center"
    onPress={onPress}
  >
    <Image
      source={{ uri: personality.imageUrl }}
      className="w-24 h-24 rounded-full mb-4"
    />
    <Text className="text-lg font-bold text-gray-800 text-center">
      {personality.name}
    </Text>
  </TouchableOpacity>
);

export default PersonalityCard;
