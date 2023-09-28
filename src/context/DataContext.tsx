/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "antd";
import { createContext, useContext, ReactNode, useReducer } from "react";
import { useNavigate } from "react-router-dom";

interface IDataContext {
  children: ReactNode,
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
}
const dataInitialState = {
  message: "",
}
const dataReducer = (state: any, action: any): any => {
  const { type, payload } = action;
  switch (type) {
    case "message":
      return {
        ...state,
        message: payload,
      }
  }
}

const DataContext = createContext({
  dataState: dataInitialState,
  xs: false,
  sm: false,
  md: false,
  lg: false,
  dataDispatcher: (_data: any) => { },
  navigateToSpecificRoute: (_path: string) => { },
  navigateRouteWithState: (_path: string) => { },
})

export const useData = () => useContext(DataContext);

const DataContextProvider = (props: IDataContext) => {
  const { children } = props;
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
  const values: any = {
    xs,
    sm,
    md,
    lg,
    navigateToSpecificRoute,
    navigateRouteWithState
  }
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>
}

export default DataContextProvider;