import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signIn, getData } from '../../api/signin'
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../context/AuthProvider';

export default function Signin() {

  const {auth, setAuth} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/cms";
  
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const {register, handleSubmit, watch, formState: { errors } } = useForm();


  const handleSignIn = (evt) => {
    signIn(formData,setAuth,navigate,from);
  };

  const handleError = (errors) => {
    console.log(errors);
  }

  const registerOptions = {
    email: {
        required: "email is required",
    },
    password: {
        required: "password is required"
    }
  };

  const handleChange = (evt) => {
    setformData( currData => {
        return { 
            ...currData,
            [evt.target.name]: evt.target.value,
        };
    });
  };

  return (
<div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit(handleSignIn, )}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" {...register("email",registerOptions.email)} value={formData.email} onChange={handleChange} name="email" type="text" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>

        <small className='text-red-600'>
            {errors?.email && errors.email.message}
        </small>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" {...register("password",registerOptions.password)} value={formData.password} onChange={handleChange}  name="password" type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
        <small className='text-red-600'>
            {errors?.password && errors.password.message}
        </small>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

  </div>
</div>

  )
}
