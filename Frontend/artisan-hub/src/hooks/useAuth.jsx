
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id: 'some_id', name: 'John Doe', role: 'buyer' }

  useEffect(() => {
    // TODO: Implement actual logic to check for logged-in user (e.g., from localStorage, session, or initial API call)
    // For demonstration, let's mock a user
    const loggedInUser = {
      id: 'user123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'buyer', // 'buyer', 'seller', or 'admin'
    };
    setUser(loggedInUser);

    // If using JWT, you'd decode it here and set the user state
    // const token = localStorage.getItem('jwt_token');
    // if (token) {
    //   try {
    //     const decodedUser = decodeToken(token); // Implement your token decoding
    //     setUser(decodedUser);
    //   } catch (error) {
    //     console.error('Invalid token', error);
    //     localStorage.removeItem('jwt_token');
    //   }
    // }
  }, []);

  const login = async (credentials) => {
    // TODO: Call your backend login API
    console.log('Attempting login with:', credentials);
    try {
      // const response = await axios.post('/api/auth/login', credentials);
      // const { token, user } = response.data;
      // localStorage.setItem('jwt_token', token);
      // setUser(user);
      // Mock successful login
      const mockUser = { id: 'user123', name: 'Logged In User', email: credentials.email, role: 'buyer' };
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    // TODO: Clear token from localStorage/session and unset user
    console.log('Logging out...');
    localStorage.removeItem('jwt_token');
    setUser(null);
    window.location.href = '/'; // Redirect to home or login after logout
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};