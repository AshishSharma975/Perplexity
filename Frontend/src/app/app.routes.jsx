import {createBrowserRouter} from "react-router";
import App from "./App";
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },  
]);