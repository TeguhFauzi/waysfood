import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
  isLogin: false,
  isRegister: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'OPEN_LOGIN_MODAL': {
      return {
        isLogin: true,
        isRegister: false,
      };
    }
    case 'OPEN_REGISTER_MODAL': {
      return {
        isLogin: false,
        isRegister: true,
      };
    }
    case 'CLOSE_AUTH_MODAL': {
      return {
        isLogin: false,
        isRegister: false,
      };
    }
    default:
      throw new Error();
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
};
