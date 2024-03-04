import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuth(isLoggedIn) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);
};

export default useAuth;