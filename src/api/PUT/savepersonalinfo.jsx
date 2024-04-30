import { baseAxios } from "../axios";
import useAuth from "../../hooks/useAuth";

async function savePersonalInfo(formData, auth) {
    const postData = new FormData();

    for (const [key, value] of Object.entries(formData)) {
        postData.append(key, value);
      }

      console.log(formData);
      
    try {
        const response = await baseAxios.put(`users/${formData.id}/`,postData,
        {headers: 
            { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${auth.access_token}`,
                        "ngrok-skip-browser-warning": "69420",

            },
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

export {savePersonalInfo}
