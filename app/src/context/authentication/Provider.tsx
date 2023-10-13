import React, { FC, ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import router from 'next/router';
import { ILoginCredentials } from './types/Login.types';
import { IRegisterCredentials } from './types/Register.types';
import IUser from './types/User.types';
import { AuthKeys } from './keys';
import { IAuthContext } from './types/Provider.types';
import initialValues from './data/InitialState';
import { IFeedback } from '@/src/components/error/Feedback.types';

export const AuthContext = createContext<IAuthContext>(initialValues);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [feedback, setFeedback] = useState<IFeedback>({
    type: null,
    message: ''
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Check if app has registered users in AsyncStorage
        // If so, set user in state
        const storedUser = await AsyncStorage.getItem(AuthKeys.LOGIN_USER_KEY);
        if (storedUser) {
          console.log('User found in AsyncStorage', storedUser);
          setUser(JSON.parse(storedUser));
        }
        console.log('No user found in AsyncStorage');
      } catch (error) {
        console.error('Error loading user from AsyncStorage:', error);
      }
    }
    checkUser();
  }, []);

  const login = async (credentials: ILoginCredentials) => {
    try {
      // Get registered users from AsyncStorage and parse to JSON
      const registeredUsers = await AsyncStorage.getItem(AuthKeys.REGISTERED_USERS_KEY);
      if (registeredUsers) {
        const registeredUsersList: IUser[] = JSON.parse(registeredUsers);

        // Check if user exists in registered users list
        // If user exists, set user in state and AsyncStorage
        const matchingUser = registeredUsersList.find(
          (user) =>
            user.email === credentials.email
        );
        if (matchingUser) {
          await AsyncStorage.setItem(AuthKeys.LOGIN_USER_KEY, JSON.stringify(matchingUser));
          setUser(matchingUser);
        } else {
          setFeedback({ type: 'error', message: 'User not found in registered users' });
        }
      }

      setFeedback({ type: 'error', message: 'There are no registered users' });
    } catch (error) {
      console.error('Error checking user in registeredUsers:', error);
    }
  };

  const logout = useCallback(async () => {
    // Remove user from AsyncStorage and set user in state to null
    await AsyncStorage.removeItem(AuthKeys.LOGIN_USER_KEY);
    // Set user in state to null to log them out
    setUser(null);
    router.push('/login');
  }, []);

  const register = async (newUser: IRegisterCredentials) => {
    try {
      // Get registered users from AsyncStorage and parse to JSON
      const registeredUsers = (await AsyncStorage.getItem(AuthKeys.REGISTERED_USERS_KEY)) ?? '[]';
      const registeredUsersList: IUser[] = JSON.parse(registeredUsers);

      // Check if email is already registered
      const isEmailUnique = !registeredUsersList.some(user => user.email === newUser.email);

      if (isEmailUnique) {
        // Add new user to registered users list and save to AsyncStorage
        registeredUsersList.push(
          {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
          }
        );
        // Set new list of registered users in AsyncStorage
        await AsyncStorage.setItem(AuthKeys.REGISTERED_USERS_KEY, JSON.stringify(registeredUsersList));

        // When user is registered, log them in
        // Send them to the home page
        login(newUser);

        setFeedback({ type: 'success', message: 'User registered and logged in.' });
      } else {
        setFeedback({ type: 'error', message: 'User is already registered.' });
      }
    } catch (error) {
      console.error('Error saving user registration to AsyncStorage:', error);
    }
  };

  const reset = async () => {
    try {
      await AsyncStorage.removeItem(AuthKeys.LOGIN_USER_KEY);
      await AsyncStorage.removeItem(AuthKeys.REGISTERED_USERS_KEY);
      setUser(null);
      console.log('AsyncStorage cleared');
    } catch (error) {
      console.error('Error removing user from AsyncStorage:', error);
    }
  };

  const isAuthenticated = Boolean(user);
  console.log(user ? 'Logged in' : 'Logged out')
  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      feedback,
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
