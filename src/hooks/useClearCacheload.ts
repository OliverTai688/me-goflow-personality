// hooks/useClearCacheOnUnload.ts
import { useEffect } from 'react';

const useClearCacheload = () => {
  const clearCache = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('answers');
    // Optionally, clear other types of cache if needed
    // e.g., sessionStorage.clear(); or IndexedDB data clearing logic
    console.log("Cache cleared.");
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      clearCache();
      // Optional: Provide a message to the user (not all browsers support custom messages)
      event.preventDefault();
      event.returnValue = "您確定要離開嗎？您的進度將不會被保存。";
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};

export default useClearCacheload;
