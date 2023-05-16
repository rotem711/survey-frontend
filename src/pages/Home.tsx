import { FC, useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { getQuestionList } from "../api/modules/question";
import Question from "../components/question/question";
import { QuestionContent, AnswerContent } from "../utils/static";

const Home: FC = () => {
  const [question, setQuestion] = useState<QuestionContent>();
  const [deviceID, setDeviceID] = useState<String>();
  const [loading, setLoading] = useState<Boolean>(true);

  const loadData = async (payload?: AnswerContent) => {
    setLoading(true);
    try {
      const res = await getQuestionList(payload);
      setQuestion({
        id: res.data.id,
        question: res.data.attributes.question,
        options: res.data.attributes.options,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const generateUserID = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    (window as any)["deviceID"] = result.visitorId;
    setDeviceID(result.visitorId);
  };

  const onSubmit = async (answers: Array<Number>) => {
    console.log(question?.id, answers);
    const payload = {
      id: question?.id,
      answers,
    };
    loadData(payload);
  };

  useEffect(() => {
    generateUserID();
  }, []);

  useEffect(() => {
    loadData();
  }, [deviceID]);

  return (
    <>
      <Container maxWidth="md">
        {question && !loading && <Question block={{ ...question, onSubmit }} />}
        {loading && (
          <div>
            <CircularProgress />
          </div>
        )}
        {!question && !loading && (
          <p>You completed our quiz! Please wait for the result!</p>
        )}
      </Container>
    </>
  );
};

export default Home;
