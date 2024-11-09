"use client";

import React from "react";
import { useFormStatus, useFormState } from "react-dom";
import mysqlServerAction from "@/database/mysqlServerAction";

const initialState = {
  message: "",
};

const ModifyUserData = () => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(mysqlServerAction, initialState);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col w-1/2 p-8 bg-slate-800 rounded-lg shadow-lg">
          <h1 className="text-3xl mb-4 text-white font-semibold text-center">
            Form MySQL Data Changer Page
          </h1>
          <form method="post" action={formAction}>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="username"
                className="text-lg text-white font-medium"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="new username"
                className="py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <label
                htmlFor="name"
                className="text-lg text-white font-medium"
              >
                Type Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="new type name"
                className="py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <label
                htmlFor="email"
                className="text-lg text-white font-medium"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="new type email"
                className="py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <label
                htmlFor="password"
                className="text-lg text-white font-medium"
              >
                Password:
              </label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="new type password"
                className="py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Error Message */}
            <div className="text-white py-2 mt-4">
              {state?.message ? (
                <div className="opacity-75 flex justify-center text-center bg-red-600 rounded-lg w-full py-2 px-4">
                  <p className="text-white">{state?.message}</p>
                </div>
              ) : null}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              name="submit"
              id="submit"
              value="insert"
              className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              {pending ? "Inserting..." : "Insert"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModifyUserData;
