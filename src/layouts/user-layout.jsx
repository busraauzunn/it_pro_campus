import React from "react";
import RootLayout from "./root-layout";
import { Outlet } from "react-router-dom";
import { Menubar, Topbar, Footer } from "../components/components";

const UserLayout = () => {
    // IF THERE WASNT ANY ROOT LAYOUT, WE COULD USE THE CODE BELOW
    // const { pathname } = useLocation();
    // useEffect(() => {
    //     // window.scrollTo(0, 0);
    //     document.documentElement.scrollTo({ top: 0 });
    // }, [pathname]);

    return (
        <RootLayout>
            <Topbar />
            <Menubar />
            <Outlet />
            <Footer />
        </RootLayout>
    );
};

export default UserLayout;
