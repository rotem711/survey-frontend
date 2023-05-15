import { FC, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { getQuestionList } from "../api/modules/question";
import Question from "../components/question/question";
import { QuestionContent } from "../utils/static";

const Home: FC = () => {
  const [questions, setQuestions] = useState<QuestionContent[]>([]);

  const loadData = async () => {
    try {
      const res = await getQuestionList();
      setQuestions(
        res.data.map((item: any) => ({
          id: item.id,
          question: item.attributes.question,
          options: item.attributes.options,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (answers: Array<Number>) => {
    console.log(answers)
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Container maxWidth="md">
        {questions.length > 0 && (
          <Question block={{ ...questions[0], onSubmit }} />
        )}
        {questions.length === 0 && (
          <p>You completed our quiz! Please wait for the result!</p>
        )}
      </Container>
    </>
  );
};

export default Home;
