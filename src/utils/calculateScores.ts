// utils/calculateScore.ts

// Define the AnswerData type to match the new answers structure
export type AnswerData = {
  selectedOption: string | null;
  code: string;
  letter: string;
};

// Adjust the QuizAnswers type to reflect the new answers structure
type QuizAnswers = Record<string, AnswerData>;

// Define scoring maps
const positiveScoringMap: Record<string, number> = {
  "很符合": 2,
  "有點符合": 1,
  "不符合": 0,
};

const negativeScoringMap: Record<string, number> = {
  "很符合": 0,
  "有點符合": 1,
  "不符合": 2,
};

// Define a set of codes for questions that need negative scoring
const negativeScoringCodes = new Set([
  "A3", "A7", "A8", "A9",
  "B4", "B8",
  "C2", "C9", "C11",
  "D1", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11",
  "E1", "E2", "E3", "E6", "E7", "E8", "E9", "E10", "E11",
  "F1", "F2", "F3", "F5", "F6", "F7", "F8", "F9", "F10", "F11",
  "G1", "G2", "G3", "G5", "G6", "G7", "G8", "G9", "G10", "G11",
  "H3", "H4", "H11",
  "I2", "I3", "I9", "I10", "I11",
  "J1", "J2", "J3", "J4", "J8", "J9",
  "K1", "K6", "K11",
  "L4", "L8", "L9", "L11",
  "M3", "M4", "M5", "M10", "M11",
  "N4", "N5", "N7", "N10",
  "O6", "O7", "O10",
  "P3", "P6", "P8", "P9",
  "Q1", "Q3", "Q4", "Q7", "Q9",
  "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"
]);

export const calculateScore = (answers: QuizAnswers): { totalScore: number, letterScores: Record<string, number> } => {
  let totalScore = 0;
  const letterScores: Record<string, number> = {};

  Object.entries(answers).forEach(([questionNumber, answerData]) => {
    const { selectedOption, code, letter } = answerData;

    if (!selectedOption) {
      return;
    }

    // Calculate score based on negative or positive scoring
    const score = negativeScoringCodes.has(code)
      ? negativeScoringMap[selectedOption] ?? 0
      : positiveScoringMap[selectedOption] ?? 0;

    // Update total score
    totalScore += score;

    // Update letter-specific scores
    if (!letterScores[letter]) {
      letterScores[letter] = 0;
    }
    letterScores[letter] += score;
  });

  return { totalScore, letterScores };
};
