import {baseAxios} from "./axios";


async function signIn(formData, setAuth, navigate, from){
  
    const user = formData.email;
    const pwd = formData.password;

    console.log(email);

    const postData = new FormData();
    postData.append('username', user);
    postData.append('password', pwd);
    
    console.log(postData);
    
    try {
      const response = await baseAxios.post('login/',
      postData,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
    );

      const accessToken = response?.data?.res?.access_token;
      const user = response?.data?.user;
      
      console.log(response?.data.res);
      setAuth({user:user, access_token:accessToken});
      
      navigate(from, { replace: true });

    } 
    catch (err) {
     if (err.response?.status === 400) {
          console.log('Missing Username or Password');
      } else if (err.response?.status === 401) {
          console.log('Unauthorized');
      } 
  }

}


async function getData(formData){

    console.log(accessToken);
    const response = await baseAxios.get('http://127.0.0.1:8000/users/',
    {
      headers: {
         'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
        },
      withCredentials: true

    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

}

export { signIn,getData  }