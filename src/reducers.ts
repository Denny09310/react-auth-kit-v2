import { produce } from "immer";
import { type RefreshTokenAction, type SignInAction } from "./actions";
import type KnownActions from "./actions";
import { type AuthState } from "./types";

const initialState: AuthState = {
  auth: undefined,
  refresh: undefined,
  user: undefined,
  isAuthenticated: null,
  isUsingRefreshToken: false,
};

function createReducer(state: AuthState, action: KnownActions): AuthState {
  switch (action.type) {
    case "SIGN_IN":
      return signInAction(state, action);

    case "REFRESH_TOKEN":
      return refreshTokenAction(state, action);

    case "ACTIVATE_REFRESH_TOKEN":
      return activateRefreshTokenAction(state);

    case "SIGN_OUT":
      return signOutAction();
  }
}

function signInAction(state: AuthState, action: SignInAction) {
  const {
    payload: { auth, refresh, user },
  } = action;
  return produce(state, (draft) => {
    draft.auth = auth;
    draft.refresh = refresh;
    draft.user = user;
    draft.isAuthenticated = true;
  });
}

function refreshTokenAction(state: AuthState, action: RefreshTokenAction) {
  const {
    payload: { auth, refresh, user },
  } = action;

  return produce(state, (draft) => {
    if (draft.auth == null) throw new Error("Cannot refresh token when not authenticated");

    draft.auth.token = auth.token;
    draft.auth.expiresAt = auth.expiresAt;

    draft.refresh = refresh;
    draft.user = user;
    draft.isAuthenticated = true;
  });
}

function activateRefreshTokenAction(state: AuthState) {
  return produce(state, (draft) => {
    draft.isUsingRefreshToken = true;
  });
}

function signOutAction() {
  return produce(initialState, (draft) => {
    draft.isAuthenticated = false;
  });
}

export { createReducer, initialState };
