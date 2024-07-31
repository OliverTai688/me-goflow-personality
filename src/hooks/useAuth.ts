import { useEffect, useState } from 'react';
import { getLoginStatus } from '../utils/login-status';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      const status = getLoginStatus();
      console.log('Fetching authentication status:', status);
      setIsAuthenticated(status);
    };

    checkStatus();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === 'loggedIn') {
        checkStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Return `false` if status is still being determined
  return isAuthenticated;
};
