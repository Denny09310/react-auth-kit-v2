import { AuthProviderProps } from "./AuthProvider";
import { RefreshTokenActionPayload, SignInActionPayload } from "./actions";
import type KnownActions from "./actions";

export interface CookieAuthProps {
  authType: "cookie";
  cookieDomain: string;
  cookieSecure: boolean;
}

export interface TokenAuthProps {
  authType: "token";
}

export interface RefreshTokenCallbackRequest {
  accessToken: Omit<AccessToken, "type">;
  refreshToken: RefreshToken;
  user: UserState;
}

interface SuccessRefreshTokenCallbackResponse {
  success: true;
  accessToken: WithRequired<Omit<AccessToken, "type">, "token">;
  refreshToken: WithRequired<RefreshToken, "token">;
  user: UserState;
}

interface ErrorRefreshTokenCallbackResponse {
  success: false;
}

export type RefreshTokenCallbackResponse =
  | SuccessRefreshTokenCallbackResponse
  | ErrorRefreshTokenCallbackResponse;

export interface RefreshTokenCallback {
  interval: number;
  apiCallback: (
    props: RefreshTokenCallbackRequest
  ) => Promise<RefreshTokenCallbackResponse>;
}

export interface AccessToken {
  type: string;
  token?: string;
  expiresAt?: Date;
}

export type RefreshToken = Omit<AccessToken, "type">;

export type UserState = Record<string, any>;

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export interface RefreshTokenCallbackHandlerParameters {
  provider: WithRequired<AuthProviderProps, "authName">;
  state: AuthState;
  dispatch: React.Dispatch<KnownActions>;
}

export interface DeleteAuthStateParameters {
  authType: AuthProviderProps["authType"];
  authName: string;
}

export interface SyncAuthStateParameters extends DeleteAuthStateParameters {
  payload: RefreshTokenActionPayload | SignInActionPayload;
}

export interface DeleteAuthStateCookieParameters
  extends DeleteAuthStateParameters {
  cookieDomain: string;
  cookieSecure: boolean;
}

export type SyncAuthStateCookieParameters = SyncAuthStateParameters &
  DeleteAuthStateCookieParameters;

export interface AuthState {
  auth: AccessToken | undefined;
  refresh: RefreshToken | undefined;
  user: UserState | undefined;
  isAuthenticated: boolean;
  isUsingRefreshToken: boolean;
}
