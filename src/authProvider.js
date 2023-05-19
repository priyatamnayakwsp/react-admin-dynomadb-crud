// authProvider.js
const authProvider = {
    login: (params) => {
      const { username, password } = params;
  
      // Hardcoded username and password for authentication
      if (username === 'admin' && password === 'password') {
        localStorage.setItem('auth', JSON.stringify({ username }));
        return Promise.resolve();
      } else {
        return Promise.reject(new Error('Invalid username or password'));
      }
    },
  
    logout: () => {
      localStorage.removeItem('auth');
      return Promise.resolve();
    },
  
    checkAuth: () => {
      return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject();
    },
  
    checkError: (error) => {
      // Handle any authentication-related errors here
      // For example, if the API returns a 401 Unauthorized response
      if (error.status === 401) {
        localStorage.removeItem('auth');
        return Promise.reject();
      }
      return Promise.resolve();
    },
  
    getPermissions: () => {
      return Promise.resolve();
    },
  };
  
export default authProvider;
  