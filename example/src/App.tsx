import { AuthProvider } from "react-auth-kit-v2";
import Routes from "./routes";
import refresh from "./utils/refresh";
import authenticate from "./utils/authenticate";

const App = () => {
  return (
    <AuthProvider authType="token" refresh={refresh} authenticate={authenticate}>
      <Routes />
    </AuthProvider>
  );
};
export default App;
