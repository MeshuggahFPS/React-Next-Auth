import React, { FC, ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import router from 'next/router';

const LOGIN_USER_KEY = 'loginUser';
const REGISTERED_USERS_KEY = 'registeredUsers';

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (credentials: ILoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (newUser: IRegisterCredentials) => Promise<void>;
  reset: () => Promise<void>;
}

const initial: IAuthContext = {
  user: null,
  isAuthenticated: false,
  login: async () => { },
  logout: async () => { },
  register: async () => { },
  reset: async () => { },
};

export const AuthContext = createContext<IAuthContext>(initial);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Check if app has registered users in AsyncStorage
        // If so, set user in state
        const storedUser = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
        if (storedUser) {
          console.log('User found in AsyncStorage', storedUser);
          setUser(JSON.parse(storedUser));
        }

      } catch (error) {
        console.error('Error loading user from AsyncStorage:', error);
      }
    }
    checkUser();
  }, []);

  const login = async (credentials: ILoginCredentials) => {
    try {
      // Get registered users from AsyncStorage and parse to JSON
      const registeredUsers = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
      if (registeredUsers) {
        const registeredUsersList: IUser[] = JSON.parse(registeredUsers);

        // Check if user exists in registered users list
        // If user exists, set user in state and AsyncStorage
        const matchingUser = registeredUsersList.find(
          (user) =>
            user.email === credentials.email && user.password === credentials.password
        );

        if (matchingUser) {
          await AsyncStorage.setItem(LOGIN_USER_KEY, JSON.stringify(matchingUser));
          setUser(matchingUser);
        } else {
          console.error('User not found in registered users');
        }
      }
    } catch (error) {
      console.error('Error checking user in registeredUsers:', error);
    }
  };

  const logout = useCallback(async () => {
    try {
      // Remove user from AsyncStorage and set user to null 
      // So that the user is logged out and redirected to login page
      await AsyncStorage.removeItem(LOGIN_USER_KEY);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error removing user from AsyncStorage:', error);
    }
  }, []);

  const register = async (newUser: IRegisterCredentials) => {
    try {

      // Get registered users from AsyncStorage and parse to JSON
      const registeredUsers = (await AsyncStorage.getItem(REGISTERED_USERS_KEY)) ?? '[]';
      const registeredUsersList: IUser[] = JSON.parse(registeredUsers);

      // Check if email is already registered
      const isEmailUnique = !registeredUsersList.some(user => user.email === newUser.email);

      if (isEmailUnique) {
        // Add new user to registered users list and save to AsyncStorage
        registeredUsersList.push(newUser);
        // Set new list of registered users in AsyncStorage
        await AsyncStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredUsersList));

        // When user is registered, log them in
        // Send them to the home page
        login(newUser);

        console.log('User registered and logged in')
      } else {
        console.error('Email is already registered.');
      }
    } catch (error) {
      console.error('Error saving user registration to AsyncStorage:', error);
    }
  };

  const reset = async () => {
    try {
      await AsyncStorage.removeItem(LOGIN_USER_KEY);
      await AsyncStorage.removeItem(REGISTERED_USERS_KEY);
      setUser(null);
      console.log('AsyncStorage cleared');
    } catch (error) {
      console.error('Error removing user from AsyncStorage:', error);
    }
  };

  const isAuthenticated = Boolean(user);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      register,
      reset,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isAuthenticated, login, register, reset]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
