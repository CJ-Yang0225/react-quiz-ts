import { shuffleArray } from "./utils";

export enum Category {
  SCIENCE_COMPUTERS = "18",
}

export type Quiz = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuizResponse = Quiz & { options: string[] };

export const fetchQuizData = async (amount: number, category: Category) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`;

  const data = await (await fetch(endpoint)).json();

  return data.results.map((result: Quiz) => ({
    ...result,
    options: shuffleArray([result.correct_answer, ...result.incorrect_answers]),
  }));
};
