import { useAuth } from "./AuthContext";
import { type SignInActionPayload } from "./actions";
import { deleteAuthState, syncAuthState } from "./utils";

export const useUser = <T extends object>() => {
  const { state } = useAuth();

  if (state.user == null) return undefined;
  return state.user as T;
};

export const useIsAuthenticated = () => {
  const { state } = useAuth();
  return state.isAuthenticated;
};

export const useSignInDispatch = () => {
  const { provider, dispatch } = useAuth();
  return (payload: SignInActionPayload) => {
    syncAuthState({ ...provider, payload });
    dispatch({ type: "SIGN_IN", payload });
  };
};

export const useSignOutDispatch = () => {
  const { provider, dispatch } = useAuth();
  return () => {
    deleteAuthState({ ...provider });
    dispatch({ type: "SIGN_OUT" });
  };
};
