interface QuestionContent {
  id: Number;
  question: String;
  options: {
    id: Number;
    text: String;
  }[];
}

export type { QuestionContent };
