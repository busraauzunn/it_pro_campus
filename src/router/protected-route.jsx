import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    console.log(user);
    console.log(isLoggedIn);

    if (!isLoggedIn) return <Navigate to="/login" />;
    if (!props.roles.some((role) => role === user?.role))
        return <Navigate to="/unauthorized" />;

    return props.children;
};

export default ProtectedRoute;
