import { FC, useEffect } from "react";
import Question from "../components/question/question";

const Home: FC = () => {
  const question = {
    question: "test",
  };
  const loadData = async () => {
    //
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
