import Cookies from "universal-cookie";
import {
  type DeleteAuthStateCookieParameters,
  type SyncAuthStateCookieParameters,
} from "../types";

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

  cookie.set(`${authName}TokenTime`, JSON.stringify(payload.user));

  if (refresh != null) {
    cookie.set(`${authName}RefreshToken`, refresh.token ?? "");
    cookie.set(
      `${authName}RefreshTokenTime`,
      refresh.expiresAt?.toISOString() ?? ""
    );
  }
}

export function deleteAuthStateCookie({
  authName,
  cookieDomain: domain,
  cookieSecure: secure,
}: Omit<DeleteAuthStateCookieParameters, "authType">) {
  const cookie = new Cookies(null, { domain, secure });

  cookie.remove(`${authName}Type`);
  cookie.remove(`${authName}Token`);
  cookie.remove(`${authName}TokenTime`);
  cookie.remove(`${authName}RefreshToken`);
  cookie.remove(`${authName}RefreshTokenTime`);
}
