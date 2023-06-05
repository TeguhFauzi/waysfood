import { createContext, useReducer } from 'react';

export const DropdownContext = createContext();

const initialState = {
  isCustomer: false,
  isPartner: false,
  isPenOrder: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'OPEN_DROPDOWN': {
      return {
        isCustomer: true,
        isPartner: true,
      };
    }
    case 'CLOSE_DROPDOWN': {
      return {
        isCustomer: false,
        isPartner: false,
      };
    }
    case 'OPEN_PENORDER_NOTICE': {
      return {
        isPenOrder: true,
      };
    }
    case 'CLOSE_PENORDER_NOTICE': {
      return {
        isPenOrder: false,
      };
    }
    default:
      throw new Error();
  }
};

export const DropdownContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <DropdownContext.Provider value={[state, dispatch]}>{children}</DropdownContext.Provider>;
};
