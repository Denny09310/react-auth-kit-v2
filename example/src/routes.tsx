import { Route, Routes as RoutesPrimitive } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Routes = () => {
  return (
    <RoutesPrimitive>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </RoutesPrimitive>
  );
};

export default Routes;
