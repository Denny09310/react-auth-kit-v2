import { AuthenticateCallback } from "react-auth-kit-v2";

const authenticate: AuthenticateCallback = () =>
  new Promise((resolve) => {
    console.log("Authenticating");

    setTimeout(() => {
      console.log("NOT Authenticated");
      resolve(false);
    }, 1000);
  });

export default authenticate;
