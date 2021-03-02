export enum Category {
  COMPUTERS_SCIENCE = "18",
}

export type QuizResponse = {
  category: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export const fetchQuizData = async (
  amount: number,
  category: Category
): Promise<QuizResponse[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`;

  const data = await (await fetch(endpoint)).json();

  return data.results;
};
