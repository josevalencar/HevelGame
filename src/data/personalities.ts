import { Personality } from '../types';

export const personalitiesData: Personality[] = [
  {
    id: 'steve-jobs',
    name: 'Steve Jobs',
    imageUrl: 'https://placehold.co/150x150/000000/FFFFFF?text=SJ',
    phrases: [
      {
        id: 'sj-1',
        text: 'Because the ones who are {blank} enough to think they can change the world, are the ones who actually do.',
        fullText: 'Because the ones who are crazy enough to think they can change the world, are the ones who actually do.',
        answer: 'crazy',
        options: ['funny', 'dumb', 'crazy'],
      },
      {
        id: 'sj-2',
        text: 'Your time is {blank}, so don’t waste it living someone else’s life.',
        fullText: 'Your time is limited, so don’t waste it living someone else’s life.',
        answer: 'limited',
        options: ['endless', 'valuable', 'limited'],
      },
    ],
  },
  {
    id: 'albert-einstein',
    name: 'Albert Einstein',
    imageUrl: 'https://placehold.co/150x150/E8E8E8/000000?text=AE',
    phrases: [
      {
        id: 'ae-1',
        text: 'Imagination is more {blank} than knowledge.',
        fullText: 'Imagination is more important than knowledge.',
        answer: 'important',
        options: ['fun', 'difficult', 'important'],
      },
    ],
  },
  {
    id: 'elon-musk',
    name: 'Elon Musk',
    imageUrl: 'https://placehold.co/150x150/4B5563/FFFFFF?text=EM',
    phrases: [
        {
            id: 'em-1',
            text: 'When something is important enough, you do it even if the {blank} are not in your favor.',
            fullText: 'When something is important enough, you do it even if the odds are not in your favor.',
            answer: 'odds',
            options: ['people', 'odds', 'rules'],
        }
    ]
  }
];
