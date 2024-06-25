import { baseAxios } from "../axios";
import useAuth from "../../hooks/useAuth";

async function saveProject(formData, auth) {
    const postData = new FormData();

    for (const [key, value] of Object.entries(formData)) {
        postData.append(key, value);
      }

    try {

        const response = await baseAxios.post(`projects/`,postData,
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
            console.log('Somethin went wrong');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } 
    }
}

export {saveProject}
