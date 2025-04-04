import { Dispatch, SetStateAction } from "react";
import textIcon from "assets/images/multiIcon_orange.png";
import imageIcon from "assets/images/imageIcon_orange.png";
import sheetIcon from "assets/images/sheet_orange.png";

export interface QuestionProps {
  questionData: QuestionData;
  setQuestionData: Dispatch<SetStateAction<QuestionData>>;
  submitQuestion: () => void;
  optionsComplete: boolean;
  dataComplete: boolean;
  isEdit?: boolean;
}

export interface ButtonData {
  questionType: SelectedType;
  title: string;
  description: string;
  icon: string;
}
export const initialQuestionData: QuestionData = {
  questionText: "",
  options: ["", "", "", ""],
  correctIndex: -1,
  _id: "",
  questionType: "PICTURE",
  myResponse: null
};

export type SelectedType = QuestionType | "REUSE"

export const buttons: ButtonData[] = [
  {
    questionType: "PICTURE",
    title: "Image",
    description:
      "Multiple-choice question with 4 images for the possible answers",
    icon: imageIcon,
  },
  {
    questionType: "MULTI_TEXT",
    title: "Text",
    description: "Text-based multiple-choice question - 1 question, 4 options",
    icon: textIcon,
  },
  {
    questionType: "REUSE",
    title: "Reuse",
    description: "Add an existing question to this quiz",
    icon: sheetIcon,
  },
];
