  "use client"
  import React from 'react'
  import PrivateRoute from "@/components/privateroute";
  // import useClearCacheload from '@/hooks/useClearCacheload';
  import ScoreDisplay from '@/components/ScoreDisplay';

  
  const ResultPage: React.FC = () => {
    // useClearCacheload();


    return (
      <PrivateRoute>
        <ScoreDisplay />
      </PrivateRoute>
    )
  }

  export default ResultPage;