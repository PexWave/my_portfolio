import { baseAxios } from "../axios";
import useAuth from "../../hooks/useAuth";

const usegetPersonalInfo = () => {

        const getPersonalInfo = async () => {
                const response = await baseAxios.get('/users/', {
                    headers: {
                        'Content-Type': 'application/json',
                       },
                    
                })
                .catch(error => {
                    console.log(error.response.data.error);
                    return error.response.data.error;
                });
 
                return response.data;
        }

        return getPersonalInfo;
}
export default usegetPersonalInfo;
