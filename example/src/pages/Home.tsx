import { useSignOutDispatch, useUser } from "react-auth-kit-v2";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const signOut = useSignOutDispatch();
  const navigate = useNavigate();

  const user = useUser<User>();

  const handleSignOut = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h2>Welcome, {user?.email}!</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;
