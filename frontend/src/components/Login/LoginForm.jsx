
import React, { useState, useEffect} from 'react';
import KTPLogo from '../../images/KTPLogo.jpeg';
import googleLogo from "../..//images/google-logo.png";
import { jwtDecode } from "jwt-decode";
import { useSnackbar } from 'notistack';
import axios from 'axios';



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isBUEmail, setIsBUEmail] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveUser = () => {
    const data = {
      email,
      firstName,
      lastName,
      isBUEmail
    };

  };



  function handleCallbackResponse(response){
     var userObject = jwtDecode(response.credential);

     console.log(userObject);

     setEmail(userObject.email)
     setFirstName(userObject.given_name)
     setLastName(userObject.family_name)
     
    if (userObject.hd === "bu.edu"){
      setIsBUEmail(true)
    } else{
      enqueueSnackbar('Email must be a BU Email', { variant: 'error' });
    }

     
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
       client_id: "632937425552-8cigqca0fkl4rcfsgss0f87h28u3fl60.apps.googleusercontent.com",
       callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("SignInDiv"),
      {theme: "outline", size: "large"}
    );

  }, []);

  return (

    <section className="bg-gray-full dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-11 h-11 mr-2 overflow-hidden rounded-full" src={KTPLogo} alt="logo" />
          KAPPA THETA PI
        </a>
        <div className="flex items-center justify-center w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div id="SignInDiv"></div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default LoginForm;
