import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useRefreshToken from '../../hooks/useRefresh';
import useAuth from '../../hooks/useAuth';

const PersistLogin = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
                
                
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // Avoids unwanted call to verifyRefreshToken
        !auth?.user ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {

    }, [isLoading])

    return (
        <>
            {auth?.user
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin