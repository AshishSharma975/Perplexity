import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "../features/auth/hook/useauth";
import { useEffect } from "react";
const App = () => {
  const auth = useAuth()
  
  useEffect(() => {
    auth.handleGetMe()
  }, [])
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
};

export default App;