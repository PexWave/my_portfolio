import { baseAxios } from "../axios";
import useAuth from "../../hooks/useAuth";

const usegetProjects = () => {

        const getAllProjects = async () => {
                const response = await baseAxios.get('/projects', {
                    headers: {
                        'Content-Type': 'application/json',
                                    "ngrok-skip-browser-warning": "69420",

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
