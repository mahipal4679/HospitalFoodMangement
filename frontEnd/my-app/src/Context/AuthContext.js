import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      console.log("Attempting login with:", email);

      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      console.log("API Response:", response?.data);

      if (!response.data || !response.data.token || !response.data.user) {
        throw new Error("Invalid API response structure");
      }

      const { token, user } = response.data;

      sessionStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      return user;
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
