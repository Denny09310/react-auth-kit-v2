import { LoginResponse } from "../types";

export default () =>
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "kminchelle",
      password: "0lelplR",
      expiresInMins: 5, // optional
    }),
  })
    .then((res) => res.json())
    .then((data) => data as LoginResponse);
