import { baseAxios } from "../axios";
import useAuth from "../../hooks/useAuth";

const usegetBlogs = () => {

        const getAllBlogs = async () => {
                const response = await baseAxios.get('/blogs', {
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

        return getAllBlogs;
}
export default usegetBlogs;
