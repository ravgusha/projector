import React from 'react';
import jwtDecode from 'jwt-decode';
import { ILocal } from '../localization/types';

export const getUserInformation = (): IUser => {
  const token = JSON.parse(localStorage.getItem('user') as string)?.token;

  if (token) {
    try {
      const decoded = jwtDecode<IUser>(token);
      const user = { ...decoded, isUserSignIn: true };

      return user;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  return { isUserSignIn: false };
};

export enum Localization {
  ru = 'РУС',
  en = 'ENG',
}

export interface IUser {
  userId?: string;
  login?: string;
  isUserSignIn?: boolean;
}

interface IGlobalState {
  userState: IUser;
  localization: Localization;
  setUserState: (user: IUser) => void;
  setLocalization: (Localize: Localization) => void;
  textContent?: ILocal;
}

export const defaultGlobalState: IGlobalState = {
  userState: getUserInformation(),
  localization: Localization.en,
  setUserState: () => {},
  setLocalization: () => {},
};

export const GlobalContext = React.createContext(defaultGlobalState);
