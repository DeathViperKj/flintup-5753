// Tipos compartilhados entre os minigames

export type MinigameType = 
  | "this-or-that"
  | "first-date"
  | "complete-phrase"
  | "truth-dare"
  | "two-truths"
  | "vibe-map"
  | "playlist"
  | "flags"
  | "emoji"
  | "memory";

export interface MinigameResult {
  compatibility: number; // 0-100
  commonPoints: string[];
  differences?: string[];
}

export interface MinigameAnswer {
  questionId: string;
  answer: any;
  timestamp: Date;
}

export interface MinigameSession {
  id: string;
  type: MinigameType;
  matchId: number;
  userAnswers: MinigameAnswer[];
  partnerAnswers?: MinigameAnswer[];
  result?: MinigameResult;
  status: "waiting" | "completed";
  createdAt: Date;
}
