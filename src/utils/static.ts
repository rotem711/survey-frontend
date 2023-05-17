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
  question_text?: String;
  answers: {
    option_id: Number;
    option_text?: String;
  }[];
}

export type { QuestionContent, AnswerContent };
