import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[hsl(224,72%,47%)]">
      <div className="w-full max-w-md  p-6 rounded-2xl min-h-screen flex items-center justify-center bg-[hsl(224,72%,47%)]">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
