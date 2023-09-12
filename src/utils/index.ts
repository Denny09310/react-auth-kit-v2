import {
  CheckAuthStateParameters,
  DeleteAuthStateCookieParameters,
  DeleteAuthStateParameters,
  SyncAuthStateCookieParameters,
  SyncAuthStateParameters,
} from "../types";
import { checkAuthStateCookie, deleteAuthStateCookie, syncAuthStateCookie } from "./cookie";
import { checkAuthStateToken, deleteAuthStateToken, syncAuthStateToken } from "./token";

export * from "./refresh";

export function syncAuthState({ authType, ...props }: SyncAuthStateParameters | SyncAuthStateCookieParameters) {
  if (authType === "token") {
    syncAuthStateToken(props);
  } else if (authType === "cookie") {
    syncAuthStateCookie(props as SyncAuthStateCookieParameters);
  }
}

export function deleteAuthState({ authType, ...props }: DeleteAuthStateParameters | DeleteAuthStateCookieParameters) {
  if (authType === "token") {
    deleteAuthStateToken(props);
  } else if (authType === "cookie") {
    deleteAuthStateCookie(props as DeleteAuthStateCookieParameters);
  }
}

export function checkAuthState(props: CheckAuthStateParameters) {
  const { authType, authenticate } = props.provider;

  const signOut = () => props.dispatch({ type: "SIGN_OUT" });

  const check = () => {
    if (authType === "token") {
      checkAuthStateToken(props);
    } else if (authType === "cookie") {
      checkAuthStateCookie(props);
    }
  };

  if (authenticate) {
    authenticate()
      .then((success) => (success ? check() : signOut()))
      .catch(signOut);
  } else {
    check();
  }
}
