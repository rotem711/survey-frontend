import { FC, useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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
      if (res.data) {
        setQuestion({
          id: res.data.id,
          question: res.data.attributes.question,
          options: res.data.attributes.options,
        });
      } else {
        setQuestion(undefined);
      }
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
    const answerOptions = answers.map((item) => ({
      option_id: item,
      option_text: question?.options.find((option) => option.id === item)?.text,
    }));
    const payload = {
      id: question?.id,
      question_text: question?.question,
      answers: answerOptions,
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!question && !loading && (
          <h2>You completed our quiz! We are preparing new questions!</h2>
        )}
      </Container>
    </>
  );
};

export default Home;
