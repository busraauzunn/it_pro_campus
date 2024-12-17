import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { LoadingPage } from "./pages/pages";
import { getUser } from "./api/api";
import { useDispatch } from "react-redux";
import { login, logout } from "./context/slices/auth-slices";

const App = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // whenever app starts (refresh, restart or user changes url manually, this will cause app to unmount and remount), get the user information and update the central state using token in the local storage

    const loadUser = async () => {
        try {
            const responseUser = await getUser();
            dispatch(login(responseUser.data));
        } catch (error) {
            console.log(error);
            dispatch(logout());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? <LoadingPage /> : <RouterProvider router={router} />;
};

export default App;
