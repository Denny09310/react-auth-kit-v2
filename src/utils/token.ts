import type { SyncAuthStateParameters, DeleteAuthStateParameters, CheckAuthStateParameters } from "../types";

export function syncAuthStateToken({ authName, payload }: Omit<SyncAuthStateParameters, "authType">) {
  const { auth, refresh } = payload;

  if ("type" in auth) {
    localStorage.setItem(`${authName}Type`, auth.type);
  }

  localStorage.setItem(`${authName}Token`, auth.token);

  if (auth.expiresAt) {
    localStorage.setItem(`${authName}TokenTime`, auth.expiresAt.toISOString());
  }

  localStorage.setItem(`${authName}State`, JSON.stringify(payload.user));

  if (refresh != null) {
    localStorage.setItem(`${authName}RefreshToken`, refresh.token ?? "");
    localStorage.setItem(`${authName}RefreshTokenTime`, refresh.expiresAt?.toISOString() ?? "");
  }
}

export function deleteAuthStateToken({ authName }: Omit<DeleteAuthStateParameters, "authType">) {
  localStorage.removeItem(`${authName}Type`);
  localStorage.removeItem(`${authName}Token`);
  localStorage.removeItem(`${authName}TokenTime`);
  localStorage.removeItem(`${authName}State`);
  localStorage.removeItem(`${authName}RefreshToken`);
  localStorage.removeItem(`${authName}RefreshTokenTime`);
}

export function checkAuthStateToken({ provider, dispatch }: CheckAuthStateParameters) {
  const { authName } = provider;

  const type = localStorage.getItem(`${authName}Type`);
  const token = localStorage.getItem(`${authName}Token`);
  const tokenTime = localStorage.getItem(`${authName}TokenTime`);
  const authState = localStorage.getItem(`${authName}State`);
  const refreshToken = localStorage.getItem(`${authName}RefreshToken`);
  const refreshTokenTime = localStorage.getItem(`${authName}RefreshTokenTime`);

  if (!token || !type) return;

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
