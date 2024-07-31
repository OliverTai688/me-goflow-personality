// lib/login-status.ts

// Function to set login status
export const setLoginStatus = (status: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('loggedIn', JSON.stringify(status));
    }
  };
  
  // Function to get login status
  export const getLoginStatus = (): boolean => {
    if (typeof window !== 'undefined') {
      const status = localStorage.getItem('loggedIn');
      console.log('Retrieving login status:', status);
      return status === 'true';
    }
    return false;
  };
  
  // Function to clear login status
  export const clearLoginStatus = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('loggedIn');
    }
  };
  