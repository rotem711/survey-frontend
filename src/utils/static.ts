interface QuestionContent {
  id: Number;
  question: String;
  options: {
    id: Number;
    text: String;
  }[];
}

interface AnswerContent {
  id?: Number;
  answers: Number[];
}

export type { QuestionContent, AnswerContent };
