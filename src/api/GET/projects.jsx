import { baseAxios } from "../axios";
import useAuth from "../../hooks/useAuth";

const usegetProjects = () => {

        const getAllProjects = async () => {
                const response = await baseAxios.get('/projects', {
                    withCredentials: true,
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

        return getAllProjects;
}
export default usegetProjects;