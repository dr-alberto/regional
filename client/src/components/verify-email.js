import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';


// TODO: https://medium.com/designly/how-to-create-a-verification-code-input-component-in-react-next-js-39517dd5c75d
export default function Register() {
    const navigate = useNavigate()

    async function handleForm(e) {
        e.preventDefault();

        const form = e.target;
        const token = form[0].value;
        console.log(token)

        fetch(`/verify-token/${token}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
        })
        .then(res => {
            if (res.status == 200) {
                // Verification success
                navigate("/profile");
            } else {
                console.log(res)
                console.log(res.json())
                form.reset();
            } 
        });
    }

    function sendToken() {
        fetch("/send-token", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    useEffect(() => {
        fetch("/getUser", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.isLoggedIn) {
                data.user.verified ? navigate("/profile") : sendToken();
            } else {
                navigate("/login");
            }
        })

        
    }, []);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={event => handleForm(event)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Token
              </label>
              <div className="mt-2">
                <input
                  id="token"
                  name="token"
                  type="number"
                  autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login with your account
            </a>
          </p>
        </div>
      </div>
    )

}
