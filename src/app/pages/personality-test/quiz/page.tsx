"use client"
// pages/quiz-page.tsx

import React, { useState } from "react";
import { QuizNewStyle } from "@/components/quiz-newstyle";
import PrivateRoute from "@/components/privateroute";
// import useClearCacheload from "@/hooks/useClearCacheload";

const QuizPage: React.FC = () => {
    // useClearCacheload();

    return (
        <PrivateRoute>

            <QuizNewStyle />
            
        </PrivateRoute>
    );
};

export default QuizPage;
