import React, { FC } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import QuestionProps from "./question.interface";

const Question: FC<{ block: QuestionProps }> = ({ block }) => {
  const {
  } = block;
  return (
    <>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel required control={<Checkbox />} label="Required" />
      </FormGroup>
    </>
  );
};

export default Question;
