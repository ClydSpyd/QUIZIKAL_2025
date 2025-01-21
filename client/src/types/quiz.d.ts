declare type QuestionType = 'PICTURE' | 'MULTI_TEXT'

declare interface QuestionData {
  _id: string
  questionText: string;
  options: string[],
  correctIndex: number,
  questionType: QuestionType
}

declare interface QuizData {
  _id: string
  quizName: string,
  rounds:QuestionData[][]
}