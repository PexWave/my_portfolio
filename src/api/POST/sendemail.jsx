import { baseAxios } from "../axios";

async function sendEmail(formData) {
    const postData = new FormData();

    for (const [key, value] of Object.entries(formData)) {
        postData.append(key, value);
      }
    
    try {
        console.log(formData);

        const response = await baseAxios.post(`send-email/`,postData,
        {headers: 
            {       
            'Content-Type': 'multipart/form-data',
                        "ngrok-skip-browser-warning": "69420",
// Use multipart/form-data for FormData
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

export {sendEmail}
