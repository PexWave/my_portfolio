import axios from "axios";

async function signIn(formData){
  console.log(formData);

    const res = await axios.get('http://127.0.0.1:8000/users/', {
        firstName: formData.email,
        lastName: formData.password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


    }

export { signIn }