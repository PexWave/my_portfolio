import {baseAxios} from "./axios";


export default async function logout(auth) {

    const data = {"access_token":auth?.access_token}

    try {
        const response = await baseAxios.post('logout/',
        data,
        {
            headers: { 'Content-Type': 'application/json' },
        }
      );

      } 
      catch (err) {
        console.log(response);

       if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } 
    }

    return auth;
}


