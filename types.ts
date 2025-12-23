
export enum GamePhase {
  SETUP = 'SETUP',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  REVEALED = 'REVEALED'
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: 'math' | 'general';
}

export interface GameState {
  theme: string;
  imageUrl: string | null;
  questions: Question[];
  currentQuestionIndex: number;
  revealedTiles: number[];
  score: number;
  totalTiles: number;
}
