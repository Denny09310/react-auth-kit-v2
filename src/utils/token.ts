import type {
  SyncAuthStateParameters,
  DeleteAuthStateParameters,
} from "../types";

export function syncAuthStateToken({
  authName,
  payload,
}: Omit<SyncAuthStateParameters, "authType">) {
  const { auth, refresh } = payload;

  if ("type" in auth) {
    localStorage.setItem(`${authName}Type`, auth.type);
  }

  localStorage.setItem(`${authName}Token`, auth.token);

  if (auth.expiresAt) {
    localStorage.setItem(`${authName}TokenTime`, auth.expiresAt.toISOString());
  }

  localStorage.setItem(`${authName}TokenTime`, JSON.stringify(payload.user));

  if (refresh != null) {
    localStorage.setItem(`${authName}RefreshToken`, refresh.token ?? "");
    localStorage.setItem(
      `${authName}RefreshTokenTime`,
      refresh.expiresAt?.toISOString() ?? ""
    );
  }
}

export function deleteAuthStateToken({
  authName,
}: Omit<DeleteAuthStateParameters, "authType">) {
  localStorage.removeItem(`${authName}Type`);
  localStorage.removeItem(`${authName}Token`);
  localStorage.removeItem(`${authName}TokenTime`);
  localStorage.removeItem(`${authName}RefreshToken`);
  localStorage.removeItem(`${authName}RefreshTokenTime`);
}
