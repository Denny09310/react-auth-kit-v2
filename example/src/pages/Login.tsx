import { useSignInDispatch } from "react-auth-kit-v2";
import { useNavigate } from "react-router-dom";
import login from "../utils/login";

const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignInDispatch();

  const handleSignIn = () =>
    login().then((data) => {
      const { token, ...rest } = data;
      signIn({
        auth: {
          type: "Bearer",
          token,
          expiresAt: new Date(),
        },
        refresh: {
          token: "refresh-token",
          expiresAt: new Date(),
        },
        user: rest,
      });
      navigate("/", { replace: true });
    });

  return <button onClick={handleSignIn}>Sign In</button>;
};

export default Login;
