import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';



export default function Signup() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    async function handleSubmit(e) {
        e.preventDefault();

        await signup(name, lastName, email, password)
    }
        

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">


        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <a href="/">
            <img
                className="mx-auto h-10 w-auto"
                src="/logo.svg"
                alt="Your Company"
            />
          </a>
          <h2 className="mt-20 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="flex space-x-4">
    
                <div className="flex-1">
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                    </label>
                    <div className="mt-2">
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        placeholder='John'
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div className="flex-1">
                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                    </label>
                    <div className="mt-2">
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required
                        placeholder='Doe'
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
            </div>



            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Work email
                    </label>
                    <div className="text-sm text-gray-500">
                    No spam, guaranteed.
                    </div>
                </div>

                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    placeholder='john.doe@company.com'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            {error && <div className='error'>{error}</div>}
          </form>
          
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold leading-6 text-teal-600 hover:text-teal-500">
              Login with your account
            </a>
          </p>
        </div>
      </div>
    )

}
