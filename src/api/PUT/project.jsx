import { baseAxios } from "../axios";
import useAuth from "../../hooks/useAuth";

async function updateProject(formData, auth) {
    const postData = new FormData();

    for (const [key, value] of Object.entries(formData)) {
        postData.append(key, value);
      }

      console.log(auth.access_token);
      
    try {
        const response = await baseAxios.put(`projects/${formData.id}/`,postData,
        {headers: 
            { 
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${auth.access_token}`
            },
            withCredentials: true
        })
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

export {updateProject}