"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User } from "@/app/types/user";
import { useRouter } from "next/navigation";


export interface Props {
  user: User;
}

const RegisterPage = () => {
  //states
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  //functions

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  //Function to submit the data from the form 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("username", user.username);
    // formData.append("email", user.email);
    // formData.append("password", user.password);

    if (!isValidEmail(user.email)) {
      setError("Invalid email");
      return;
    }

    if (!user.password || user.password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        //  body: formData
      });
      const responseData = await res.json();
      console.log(responseData);
      if (res.status === 400) {
        setError("There is an account with this email already");
      }
      if (res.status === 200) {
        setError("");
        router.push("/account/login");
      }
    } catch (error) {
      setError("There was an error, please try again");
      console.log(error);
    }

    //Sending the user to the login page
    // try {
    //   router.push("/account/login");
    // } catch (error) {
    //   setError("Something went wrong, try again");
    // }
  };

  //Getting the input from the user
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Event Target:", e.target);
    console.log("Target username:", e.target.name);
    console.log("Target value:", e.target.value);
    e.preventDefault();
    const { name, value } = e.target;
    if (name) {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else {
      console.error("Nothing found here", e.target);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-500">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-800 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          <Link
            href="/account/login"
            className="font-medium text-red-800 hover:text-red-700"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
