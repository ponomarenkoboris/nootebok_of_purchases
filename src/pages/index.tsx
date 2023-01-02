import { useRoutes, Navigate } from "react-router-dom";
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { CreatePurchase } from "./CretePurchase/CreatePurchase";
import { Exit } from "./Exit/Exit";

export const Pages = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/create-new-purchase',
            element: <CreatePurchase />
        },
        {
            path: '/exit',
            element: <Exit />
        },
        {
            path: '*',
            element: <Navigate to='/login' />
        }
    ])
    
    return routes
}