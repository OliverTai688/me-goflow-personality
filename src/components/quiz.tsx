// components/Quiz.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { GrSend } from "react-icons/gr";

interface QuizProps {
  sectionIndex: number;
  currentQuestionIndex: number;
  answers: (string | null)[][];
  onAnswerChange: (sectionIndex: number, questionIndex: number, answer: string | null) => void;
  onQuestionIndexChange: (index: number) => void;
  onSectionIndexChange: (index: number) => void;
  totalSections: number;
  questions: {
    sectionTitle: string;
    questions: {
      question: string;
      options: string[];
    }[];
  }[];
}

const Quiz: React.FC<QuizProps> = ({
  sectionIndex,
  currentQuestionIndex,
  answers,
  onAnswerChange,
  onQuestionIndexChange,
  onSectionIndexChange,
  totalSections,
  questions,
}) => {
  const router = useRouter();

  const currentSection = questions[sectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];

  const handleOptionChange = (selectedOption: string) => {
    onAnswerChange(sectionIndex, currentQuestionIndex, selectedOption);

    // Automatically move to the next question
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      onQuestionIndexChange(currentQuestionIndex + 1);
    } else if (sectionIndex < totalSections - 1) {
      // If it's the last question in the section, move to the next section
      onSectionIndexChange(sectionIndex + 1);
      onQuestionIndexChange(0); // Reset to first question of the new section
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      onQuestionIndexChange(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      onQuestionIndexChange(currentQuestionIndex - 1);
    }
  };

  const handlePreviousSection = () => {
    if (sectionIndex > 0) {
      onSectionIndexChange(sectionIndex - 1);
      onQuestionIndexChange(0); // Reset to first question of the previous section
    }
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Your answers have been submitted!");
    router.push("/results");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{`${currentSection.sectionTitle} - Question ${
            currentQuestionIndex + 1
          } of ${currentSection.questions.length}`}</h2>
          <p className="text-lg mt-2">{currentQuestion.question}</p>
        </div>
        <form className="space-y-4">
          <div className="flex flex-col space-y-2">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-2 border rounded-md cursor-pointer transition-colors ${
                  answers[sectionIndex][currentQuestionIndex] === option
                    ? "bg-primary text-white"
                    : "bg-gray-100"
                } hover:bg-primary hover:text-white`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={answers[sectionIndex][currentQuestionIndex] === option}
                  onChange={() => handleOptionChange(option)}
                  className="radio radio-primary"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePreviousQuestion}
              className="btn btn-secondary"
              disabled={currentQuestionIndex === 0}
            >
              <FaArrowAltCircleLeft />
            </button>
            {currentQuestionIndex < currentSection.questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="btn btn-primary"
                disabled={answers[sectionIndex][currentQuestionIndex] === null}
              >
                <FaArrowAltCircleRight />
              </button>
            ) : null}
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePreviousSection}
              className="btn btn-secondary"
              disabled={sectionIndex === 0}
            >
              上一區段
            </button>
            {sectionIndex === totalSections - 1 && currentQuestionIndex === currentSection.questions.length - 1 && (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-success"
                disabled={answers.some((sectionAnswers) => sectionAnswers.includes(null))}
              >
                發送<GrSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
