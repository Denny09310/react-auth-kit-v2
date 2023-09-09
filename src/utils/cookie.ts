import Cookies from "universal-cookie";
import { CheckAuthStateParameters, type DeleteAuthStateCookieParameters, type SyncAuthStateCookieParameters } from "../types";

export function syncAuthStateCookie({
  authName,
  cookieDomain: domain,
  cookieSecure: secure,
  payload,
}: Omit<SyncAuthStateCookieParameters, "authType">) {
  const { auth, refresh } = payload;

  const cookie = new Cookies(null, { domain, secure });

  if ("type" in auth) {
    cookie.set(`${authName}Type`, auth.type);
  }

  cookie.set(`${authName}Token`, auth.token);

  if (auth.expiresAt) {
    cookie.set(`${authName}TokenTime`, auth.expiresAt.toISOString());
  }

  cookie.set(`${authName}State`, JSON.stringify(payload.user));

  if (refresh != null) {
    cookie.set(`${authName}RefreshToken`, refresh.token ?? "");

    if (refresh.expiresAt) {
      cookie.set(`${authName}RefreshTokenTime`, refresh.expiresAt?.toISOString() ?? "");
    }
  }
}

export function deleteAuthStateCookie({ authName, cookieDomain: domain, cookieSecure: secure }: Omit<DeleteAuthStateCookieParameters, "authType">) {
  const cookie = new Cookies(null, { domain, secure });

  cookie.remove(`${authName}Type`);
  cookie.remove(`${authName}Token`);
  cookie.remove(`${authName}TokenTime`);
  cookie.remove(`${authName}State`);
  cookie.remove(`${authName}RefreshToken`);
  cookie.remove(`${authName}RefreshTokenTime`);
}

export function checkAuthStateCookie({ provider, dispatch }: CheckAuthStateParameters) {
  if (provider.authType !== "cookie") {
    dispatch({ type: "SIGN_OUT" });
    return;
  }

  const { cookieDomain: domain, cookieSecure: secure, authName } = provider;

  const cookie = new Cookies(null, { domain, secure });

  const type = cookie.get(`${authName}Type`);
  const token = cookie.get(`${authName}Token`);
  const tokenTime = cookie.get(`${authName}TokenTime`);
  const authState = cookie.get(`${authName}State`);
  const refreshToken = cookie.get(`${authName}RefreshToken`);
  const refreshTokenTime = cookie.get(`${authName}RefreshTokenTime`);

  if (!token || !type) {
    dispatch({ type: "SIGN_OUT" });
  } else {
    dispatch({
      type: "SIGN_IN",
      payload: {
        auth: {
          type,
          token,
          expiresAt: tokenTime ? new Date(tokenTime) : undefined,
        },
        refresh: {
          token: refreshToken ?? undefined,
          expiresAt: refreshTokenTime ? new Date(refreshTokenTime) : undefined,
        },
        user: authState ? JSON.parse(authState) : undefined,
      },
    });
  }
}
