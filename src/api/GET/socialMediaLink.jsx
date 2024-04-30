import { baseAxios } from "../axios";
import useAuth from "../../hooks/useAuth";

const usegetSocmedLink = () => {

        const getSocmedLink = async () => {
                const response = await baseAxios.get('/socialmedias', {
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

        return getSocmedLink;
}
export default usegetSocmedLink;
