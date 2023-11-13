/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, ReactNode, useReducer } from "react";
import { Grid, message } from "antd";
import { useNavigate } from "react-router-dom";

// Define the data state interface
interface DataState {
  message: string;
}

// Define the action types
type DataAction = { type: "message"; payload: string };

// Define the data reducer
const dataReducer = (state: DataState, action: DataAction): DataState => {
  const { type, payload } = action;
  switch (type) {
    case "message":
      return {
        ...state,
        message: payload,
      };
    default:
      return state;
  }
};

// Define the data context interface
interface DataContextProps {
  children: ReactNode;
}

// Define the context interface
interface DataContextValue {
  dataState: DataState;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  messageApi: MessageApi;
  success: any;
  contextHolder: any; // You may want to provide a type for contextHolder
  dataDispatcher: React.Dispatch<DataAction>;
  navigateToSpecificRoute: (path: string) => void;
  navigateRouteWithState: (path: string, state: any) => void;
}

// Define the message API interface
interface MessageApi {
  success: (message: string, duration?: number) => void;
  open: (options: { type: string; content: string; duration?: number }) => void;
  // Define other message types and methods if needed
}

// Create the context
const DataContext = createContext<DataContextValue | undefined>(undefined);

// Create a hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataContextProvider');
  }
  return context as DataContextValue; // Assert that context is of type DataContextValue
};

// Define the initial data state
const dataInitialState: DataState = {
  message: "",
};

// Define the DataContextProvider component
const DataContextProvider: React.FC<DataContextProps> = ({ children }) => {
  const navigate = useNavigate();
  const [dataState, dataDispatcher] = useReducer(dataReducer, dataInitialState);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { xs, sm, md, lg } = screens as { [key: string]: boolean };

  const navigateToSpecificRoute = (path: string): void => {
    navigate(path);
  };

  const navigateRouteWithState = (path: string, state: object): void => {
    navigate(path, {
      state,
    });
  };

  const [messageApi, contextHolder] = message.useMessage() // Ensure this runs only once
  const success = (type: any, content: string, duration: number) => {
    messageApi.open({
      type,
      content,
      duration,
    });
  };


  const contextValue: DataContextValue = {
    dataState,
    xs,
    sm,
    md,
    lg,
    messageApi: {
      success: (msg, duration) => messageApi.success(msg, duration),
      open: (options: any) => messageApi.open(options),
    },
    success,
    contextHolder,
    dataDispatcher,
    navigateToSpecificRoute,
    navigateRouteWithState,
  };

  // Ensure that hooks are called consistently in every render path
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
