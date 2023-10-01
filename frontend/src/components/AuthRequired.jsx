import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../constants";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const Component = () => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);

  if (loading)
    return (
      <div className="text-center mt-10 font-semibold text-4xl">
        Initialising User...
      </div>
    );

  if (error) throw error;

  if (user) return <Outlet />;

  return (
    <Navigate
      to={"/signin?message=You must Sign in first"}
      state={location.pathname}
      replace={true}
    />
  );
};

Component.diplayName = "AuthRequired";

export { default as ErrorBoundary } from "../components/ErrorBoundary";
