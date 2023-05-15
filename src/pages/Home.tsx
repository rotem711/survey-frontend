import { FC, useEffect } from "react";
import { getQuestionList } from "../api/modules/question";
import Question from "../components/question/question";

const Home: FC = () => {
  const question = {
    question: "test",
  };

  const loadData = async () => {
    try {
      const res = await getQuestionList()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Question block={question} />
      </div>
    </>
  );
};

export default Home;
