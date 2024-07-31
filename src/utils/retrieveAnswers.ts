// utils/retrieveAnswers.ts

import { AnswerData } from "./calculateScores"; // Import the type from calculateScore.ts

type QuizAnswers = Record<string, AnswerData>;

export const retrieveAnswers = (): QuizAnswers => {
  const storedAnswers = localStorage.getItem('quizAnswers');

  if (storedAnswers) {
    // Parse JSON string back to JavaScript object
    const answersObject: QuizAnswers = JSON.parse(storedAnswers);
    console.log("Retrieved Answers:", answersObject);
    return answersObject;
  }

  // Return an empty object if no answers are found
  return {};
};
