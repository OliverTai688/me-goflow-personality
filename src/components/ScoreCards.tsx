// components/ScoreCards.tsx
import React from 'react';
import { characters } from '@/data/pncharacter';

type ScoreCardsProps = {
    letterScores: Record<string, number>;
};

const getScoreLevel = (score: number): string => {
    if (score >= 0 && score <= 7) {
        return 'L';
    } else if (score >= 8 && score <= 15) {
        return 'M';
    } else if (score >= 16 && score <= 22) {
        return 'H';
    } else {
        return '未定義';
    }
};

// Function to find character data based on letter and level
const getCharacterData = (letter: string, level: string) => {
    return characters.find(character => character.letter === letter && character.level === level);
};

const ScoreCards: React.FC<ScoreCardsProps> = ({ letterScores }) => {
    const letters = "ABCDEFGHIJKLMNOPQ";

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {letters.split('').map(letter => {
                const score = letterScores[letter] || 0;
                const level = getScoreLevel(score);
                const characterData = getCharacterData(letter, level);

                return (
                    <div key={letter} className="card bg-white shadow-lg p-4 rounded-lg">
                        <h3 className="text-xl font-semibold">
                            {characterData ? characterData.coretrait : `${letter}組`}
                        </h3>
                        <p className="text-lg">{score} / {level}</p>
                        {characterData ? (
                            <div className="mt-2">
                                <p className="font-bold text-lg p-4">{characterData.people}</p>
                                <p className="font-bold p-4">描述: {characterData.description}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">沒有找到對應的角色資料</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ScoreCards;
