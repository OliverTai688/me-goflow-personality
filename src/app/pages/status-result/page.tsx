"use client"
import React from 'react'
import PrivateRoute from "@/components/privateroute";
import useClearCacheload from '@/hooks/useClearCacheload';
import { useEffect, useState } from 'react';

const retrieveAnswers = () => {
  const storedAnswers = localStorage.getItem('quizAnswers');
  if (storedAnswers) {
    // Parse JSON string back to JavaScript array
    const answersArray = JSON.parse(storedAnswers);
    console.log("Retrieved Answers:", answersArray);
    return answersArray;
  }
  return [];
};

const ResultPage: React.FC = () => {
  useClearCacheload();

  const [answers, setAnswers] = useState<(string | null)[]>([]);

  useEffect(() => {
    // Retrieve answers from localStorage when component mounts
    const fetchedAnswers = retrieveAnswers();
    setAnswers(fetchedAnswers);
  }, []);

  return (
    <PrivateRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 px-4 w-full pt-6">
        <div className="w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Quiz Results</h1>
          <div className="space-y-4">
            {Object.entries(answers).map(([questionNumber, answer]) => (
              <div key={questionNumber} className="p-4 border rounded-md">
                <p className="text-lg font-semibold">Question {questionNumber}:</p>
                <p className="text-md text-gray-700">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default ResultPage;