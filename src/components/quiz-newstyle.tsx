"use client";

import React, { useState, useRef, useCallback } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { questions, Question } from "@/data/pnquestion-list";
import { toast } from 'react-toastify'; 
import { useRouter } from 'next/navigation';

export const QuizNewStyle: React.FC = () => {
  const questionsPerSection = 6;
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  type AnswerData = {
    selectedOption: string | null;
    code: string;
    letter: string;
  };
  const [answers, setAnswers] = useState<Record<string, AnswerData>>({}); // Use an object to store answers by questionNumber
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter(); // Use the router from next/navigation

  // Divide questions into sections
  const sections = Array.from({ length: Math.ceil(questions.length / questionsPerSection) }, (_, i) =>
    questions.slice(i * questionsPerSection, i * questionsPerSection + questionsPerSection)
  );

  const scrollToElement = (element: HTMLDivElement | null) => {
    if (!element) return;
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middleOfScreen = window.innerHeight / 2 - elementRect.height / 2;

    window.scrollTo({
      top: absoluteElementTop - middleOfScreen,
      behavior: "smooth",
    });
  };

  const handleOptionChange = useCallback((questionNumber: string, selectedOption: string) => {
    // Find the current question using question number
    const questionIndex = parseInt(questionNumber.replace('S', ''), 10) - 1;
    const question = questions[questionIndex];
    
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: {
        selectedOption,
        code: question.code, // Add code
        letter: question.letter, // Add letter
      },
    }));

    // Automatically move to the next question if not the last one
    if (currentQuestionIndex < sections[currentSectionIndex].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Scroll to the next question
      scrollToElement(questionRefs.current[currentQuestionIndex + 1]);
    }
  }, [currentQuestionIndex, currentSectionIndex, sections]);

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Scroll to the previous question
      scrollToElement(questionRefs.current[currentQuestionIndex - 1]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sections[currentSectionIndex].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Scroll to the next question
      scrollToElement(questionRefs.current[currentQuestionIndex + 1]);
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(0);

      // Scroll to the first question of the previous section
      scrollToElement(questionRefs.current[0]);
    }
  };

  const handleNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      // Check if all questions in the current section are answered
      const sectionAnswers = sections[currentSectionIndex].map((question, index) =>
        answers[`S${currentSectionIndex * questionsPerSection + index}`]
      );
      if (sectionAnswers.every(answer => answer !== null)) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        setCurrentQuestionIndex(0);

        // Scroll to the first question of the next section
        scrollToElement(questionRefs.current[0]);
      } else {
        alert("Please answer all questions in the current section before moving to the next section.");
      }
    }
  };

  const handleSubmit = () => {
    // Convert answers to JSON format
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    console.log("Submitted Answers:", answers);
    toast.info('恭喜完成測驗');
    router.push('/result'); // Navigate to the "result" page

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 px-4 w-full pt-6">
      <div className="w-full bg-white p-8 rounded-lg shadow-lg">
        {sections[currentSectionIndex].map((question, index) => {
          const questionNumber = `S${currentSectionIndex * questionsPerSection + index + 1}`; // Generate question number
          return (
            <div
              key={questionNumber}
              ref={(el) => {
                questionRefs.current[index] = el;
              }}
              className={`flex flex-col space-y-4 p-8 rounded-md transition-all duration-300 ${currentQuestionIndex === index
                ? "bg-white text-black font-bold flex items-center"
                : "text-gray-500 flex items-center"
              }`}
            >
              <div className="mb-4">
                <p className="text-[1.4rem]">{question.question}</p>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center mb-6">
                  <div className="w-full z-[20] border-t-2 border-dashed border-gray-200" />
                </div>
                <div className="relative flex items-center justify-center w-[60vw]">
                  <div className="flex items-center justify-between w-full">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex flex-col items-center space-y-2"
                      >
                        <button
                          onClick={() => handleOptionChange(questionNumber, option)}
                          className={`flex items-center justify-center z-[30] w-12 h-12 rounded-lg border-2 ${optionIndex === 0
                              ? answers[questionNumber]?.selectedOption === option
                                ? "bg-green-500 text-white border-green-400"
                                : "bg-white border-green-400 hover:bg-green-400 hover:text-white"
                              : optionIndex === question.options.length - 1
                                ? answers[questionNumber]?.selectedOption === option
                                  ? "bg-red-500 text-white border-red-400"
                                  : "bg-white border-red-400 hover:bg-red-400 hover:text-white"
                                : optionIndex === Math.floor(question.options.length / 2)
                                  ? answers[questionNumber]?.selectedOption === option
                                    ? "bg-gray-500 text-white border-gray-400 transform rotate-45 w-8 h-8"
                                    : "bg-white border-gray-400 hover:bg-gray-400 hover:text-white transform rotate-45 w-8 h-8"
                                  : answers[questionNumber]?.selectedOption === option
                                    ? "bg-green-500 text-white"
                                    : "bg-white border-gray-500 hover:bg-green-100"
                            } transition-colors duration-200 ease-in-out`}
                        >
                          {/* Square Button */}
                        </button>
                        <span className="text-sm text-center">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center pt-16 pb-16">
          {/* <button
            type="button"
            onClick={handlePreviousSection}
            className="btn btn-secondary"
            disabled={currentSectionIndex === 0}
          >
            <FaArrowAltCircleLeft />
            <span className="ml-2">上一區段</span>
          </button> */}
          <button
            type="button"
            onClick={handleNextSection}
            className={`btn btn-primary w-[80vw] ${currentSectionIndex === sections.length - 1  ? "hidden" : ""}`}
          >
            <span className="mr-2">下一區段</span>
            <FaArrowAltCircleRight />
          </button>
          {/* {currentSectionIndex === sections.length - 1 && ( */}
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-success w-[80vw]"
              // disabled={Object.values(answers).some(answer => answer === null)}
            >
              <span className="mr-2">發送</span>
              <GrSend />
            </button>
          {/*    */}
        </div>
      </div>
    </div>
  );
};
