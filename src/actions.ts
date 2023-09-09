import { AccessToken, RefreshToken, UserState, WithRequired } from "./types";

export interface SignInActionPayload {
  auth: WithRequired<AccessToken, "token">;
  refresh?: RefreshToken;
  user?: UserState;
}

export interface SignInAction {
  type: "SIGN_IN";
  payload: SignInActionPayload;
}

export interface RefreshTokenActionPayload {
  auth: Omit<WithRequired<AccessToken, "token">, "type">;
  refresh?: RefreshToken;
  user: UserState;
}

export interface RefreshTokenAction {
  type: "REFRESH_TOKEN";
  payload: RefreshTokenActionPayload;
}

interface ActivateRefreshTokenAction {
  type: "ACTIVATE_REFRESH_TOKEN";
}

interface SignOutAction {
  type: "SIGN_OUT";
}

type KnownActions =
  | SignInAction
  | RefreshTokenAction
  | SignOutAction
  | ActivateRefreshTokenAction;

export default KnownActions;
