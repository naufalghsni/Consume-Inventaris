import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff/Stuff";
import TrashStuff from "./pages/Stuff/TrashStuff";
import Inbound from "./pages/Inbound";
import User from "./pages/User/User";
import TrashUser from "./pages/User/TrashUser";


export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/login", element: <Login /> },
    { path: "/profile", element: <Profile /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/Stuffs", element: <Stuff /> },
    { path: "/stuffs/trash", element: <TrashStuff /> },
    { path: "/inbound-stuffs", element: <Inbound /> },
    { path: "/user", element: <User /> },
    { path: "/user/trash", element: <TrashUser /> },
])