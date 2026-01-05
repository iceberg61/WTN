export type Subject =
  | "Mathematics"
  | "English"
  | "Biology"
  | "Chemistry"
  | "Physics";

export type Level =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type MaterialType = "PDF" | "Video";

export interface LibraryMaterial {
  _id: string;
  title: string;
  description: string;
  subject: Subject;
  level: Level;
  type: MaterialType;
  isPremium: boolean;

  
  driveUrl: string;
  quizUrl?: string;

  // createdAt: string;
}
