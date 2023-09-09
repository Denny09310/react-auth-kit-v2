import type React from "react";
import { type PropsWithChildren, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { createReducer, initialState } from "./reducers";
import { type CookieAuthProps, type RefreshTokenCallback, type TokenAuthProps } from "./types";
import { checkAuthState, handleRefreshInterval } from "./utils";

interface BaseAuthProviderProps {
  authName?: string;
  refresh?: RefreshTokenCallback;
}

type Props = BaseAuthProviderProps & (CookieAuthProps | TokenAuthProps);

const AuthProvider: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, authName = "__auth", refresh } = props;
  const provider = { ...props, authName };

  const [state, dispatch] = useReducer(createReducer, initialState);

  useEffect(() => checkAuthState({ dispatch, provider }), []);

  useEffect(
    () =>
      handleRefreshInterval({
        provider,
        state,
        dispatch,
      }),
    [refresh, state]
  );

  return <AuthContext.Provider value={{ state, dispatch, provider }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export type AuthProviderProps = Props;
