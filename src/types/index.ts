// --- file: src/types/index.ts ---

export interface Phrase {
  id: string;
  text: string;
  fullText: string;
  answer: string;
  options: string[];
}

export interface Personality {
  id: string;
  name: string;
  imageUrl: string;
  phrases: Phrase[];
}

// We define the parameters for our navigation stack.
// This tells TypeScript what screens we have and what props they expect.
export type RootStackParamList = {
  Home: undefined; // HomeScreen doesn't need any parameters
  Game: { personality: Personality }; // GameScreen expects a 'personality' object
};