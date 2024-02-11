import { baseAxios } from "./axios";
import useAuth from "../hooks/useAuth";

async function savePersonalInfo(formData) {
    const {auth} = useAuth();
    const postData = new FormData();

    for (const [key, value] of Object.entries(formData)) {
        postData.append(key, value);
      }
    
    try {
        const response = await baseAxios.post('cms/personalInfo',postData,{headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${auth.access_token}`},withCredentials: true})
        .then(response => {
            console.log(response.data);

          })
          .catch(error => {
            console.error(error);
          });
      
    } catch (error) {

        if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } 
    }
}

export {savePersonalInfo}