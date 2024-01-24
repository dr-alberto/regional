// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { useSignup } from '../hooks/useSignup';
// import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '../hooks/useAuthContext';




function isNotEmpty(str) {return str !== ""}


export default function VerifyEmail() {
    const [pin, setPin] = useState(['', '', '', '', '', '']);

    const handleChange = (index, value) => {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
        
        // Automatically focus on the next input
        if (value.length === 1 && index < 5) {
            document.getElementById(`code-${index + 2}`).focus();
        } else if (value.length === 0 && index > 0) {
            document.getElementById(`code-${index}`).focus();
        } else if (index == 5 && newPin.every(isNotEmpty)) {
            console.log("EDGE CASE")
        }

        console.log(newPin, index, value)
    };
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();
    const { user } = useAuthContext();

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(pin)
    }


    async function sendCode(e) {
        console.log(e)
        e.preventDefault()
    }


    return (
        
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Verify your email 
            </h2>
            <p>To continue, please enter the 6-digit verification code sent to your email.</p>

            <a href="#" onClick={sendCode} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Send code
            </a>
        </div>
        
        {/* {user && (
            <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{user.message}</h2>
            
            <button onClick={handleClick}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Logout
          </button>
          </>
          
        )} */}
        
        <form className="max-w-sm mx-auto grid gap-2" onSubmit={handleSubmit}>
            <div className="flex mb-2 space-x-2 rtl:space-x-reverse mt-5">
                {pin.map((value, index) => (
                <div key={index}>
                    <label htmlFor={`code-${index + 1}`} className="sr-only">{`Code ${index + 1}`}</label>
                    <input
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    id={`code-${index + 1}`}
                    className="block w-10 h-10 py-3 text-sm font-extrabold text-center text-gray-900 bg-gray-100 border border-gray-400 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                    />
                </div>
                ))}
            </div>
            {/* <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please introduce the 6-digit code we sent via email.

            </p> */}
            <button disabled={isLoading}
                type="submit"
                className="flex w-full justify-center mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Continue
              </button>
        </form>
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            

            {error && <div className='error'>{error}</div>}
          </form>
        </div>
      </div>
    )

}


