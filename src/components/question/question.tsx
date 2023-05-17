import React, { FC, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import QuestionProps from "./question.interface";

const Question: FC<{ block: QuestionProps }> = ({ block }) => {
  const { id, question, options, onSubmit } = block;
  const [checked, setChecked] = useState<Array<Number>>([]);
  const onClickSubmit = async () => {
    await onSubmit(checked);
  };
  const onCheck = (
    e: React.SyntheticEvent<Element, Event>,
    optionID: Number
  ) => {
    const { checked: isChecked } = e.target as HTMLInputElement;
    let tmp = Object.assign([], checked);
    if (isChecked) {
      tmp.push(optionID);
      tmp = tmp.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      setChecked(tmp);
    } else {
      const index = tmp.indexOf(optionID);
      if (index > -1) {
        tmp.splice(index, 1);
      }
      setChecked(tmp);
    }
  };
  return (
    <>
      <h1>{question}</h1>
      <FormGroup sx={{ mt: 5 }}>
        {options.map((option: any) => (
          <FormControlLabel
            control={<Checkbox />}
            label={option.text}
            key={`${id}-${option.id}`}
            onChange={(e) => onCheck(e, option.id)}
          />
        ))}
        <Button variant="contained" sx={{ mt: 5 }} onClick={onClickSubmit}>
          Next
        </Button>
      </FormGroup>
    </>
  );
};

export default Question;
