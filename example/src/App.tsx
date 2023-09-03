import { AuthProvider } from "react-auth-kit-v2";
import Routes from "./routes";
import refresh from "./utils/refresh";

const App = () => {
  return (
    <AuthProvider authType="token" refresh={refresh}>
      <Routes />
    </AuthProvider>
  );
};
export default App;
