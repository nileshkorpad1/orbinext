// #region Global Imports
import { Store } from "redux";
import { AppInitialProps } from "next/app";
import { ThunkDispatch } from "redux-thunk";
// #endregion Global Imports
import { NextComponentType, NextPageContext } from "next";

interface AppStore extends Store {
    dispatch: ThunkDispatch;
}

export interface AppWithStore extends AppInitialProps {
    store: AppStore;
}

export interface ReduxNextPageContext extends NextPageContext {
    store: AppStore;
}
export interface ReduxAppContext extends AppContext {
    Component: NextComponentType<NextPageContext, {}, {}>;
    ctx: ReduxNextPageContext;
    router: Router;
}
