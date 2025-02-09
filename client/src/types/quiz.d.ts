declare type QuestionType = 'PICTURE' | 'MULTI_TEXT'

declare interface QuestionData {
  _id: string
  questionText: string;
  options: string[],
  correctIndex: number,
  questionType: QuestionType,
  myResponse: number | null;
}

declare interface RoundQuestion extends QuestionData {
  myResponse: number | null;
} 

declare interface QuizData {
  _id: string
  quizName: string,
  rounds:QuestionData[][]
}