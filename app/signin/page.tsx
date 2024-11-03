import React from "react";

export default function Page() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col w-1/2 bg-slate-800 font-semibold p-8 rounded-lg">
                    <h1 className="text-2xl mb-3">Sign in page</h1>
                    <div className="flex flex-col space-y-2">
                        <h2>Email:</h2>
                        <form className="flex flex-col space-y-4">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="gametrees@gmail.com"
                                className="text-slate-500 py-1 px-2 rounded-lg"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 rounded-lg"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
