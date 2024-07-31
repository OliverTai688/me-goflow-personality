"use client";

import React, { useEffect, useState } from 'react';
import { retrieveAnswers } from '../utils/retrieveAnswers';
import { calculateScore } from '@/utils/calculateScores'; // 確保這裡的路徑正確
import ScoreCards from '@/components/ScoreCards';

const ScoreDisplay: React.FC = () => {
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [letterScores, setLetterScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const answers = retrieveAnswers();
    const { totalScore, letterScores } = calculateScore(answers);

    setTotalScore(totalScore);
    setLetterScores(letterScores);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 px-4 w-full pt-6">
      <div className="w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">所有加總分數</h1>
        {totalScore !== null ? (
          <>
            <p className="text-4xl font-semibold mb-6">總分: {totalScore}</p>
            <ScoreCards letterScores={letterScores} />
          </>
        ) : (
          <p className="text-lg">計算分數中...</p>
        )}
      </div>
    </div>
  );
};

export default ScoreDisplay;
