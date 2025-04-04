declare type  TriviCategory = 
  "artliterature"|
  "language"|
  "sciencenature"|
  "general"|
  "fooddrink"|
  "peopleplaces"|
  "geography"|
  "historyholidays"|
  "entertainment"|
  "toysgames"|
  "music"|  
  "mathematics"|
  "religionmythology"|
  "sportsleisure"

declare interface ImgObject {
  url: string;
  height: number;
  width: number;
  author: {
    url: string;
    name: string;
  };
  description:string;
  size: number;
  source: {
    url: string;
  };
  license: {
    url:string;
    name: string;
  };
}
declare interface TriviaQuestion {
  question: { text: string };
  correctAnswer: string;
  category: TriviCategory;
}

declare interface TriviaImageQuestion {
  category: string;
  id: string;
  correctAnswer: ImgObject[];
  incorrectAnswers: ImgObject[][];
  question: { text: string };
  tags: string[];
  type: string;
  difficulty: 'hard' | 'medium' | 'hard';
}