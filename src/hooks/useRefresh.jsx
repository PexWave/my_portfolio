import {baseAxios} from "../api/axios";
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await baseAxios.get('/refresh', {
            withCredentials: true
        })
        .catch(error => {
            // console.log(error.response.data.error);
            return error.response.data.error;
        });
        setAuth(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data.access_token);
            return {
                ...prev,
                user: response.data.user,
                access_token: response.data.access_token
            }
        });


        return response.data.access_token;
    }

    return refresh;
};

export default useRefreshToken;