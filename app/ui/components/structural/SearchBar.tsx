import React from "react";

interface SearchBarProps {
    actionUrl: string;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ actionUrl, placeholder = "Search..." }) => {
    return (
        <form action={`/game-search/${actionUrl}`} method="GET" className="flex items-center w-full max-w-3xl h-9">
            <div className="flex w-full h-full items-center justify-center">
                <input
                    type="text"
                    name="query"
                    placeholder={placeholder}
                    className="text-base-content h-full w-full text-sm p-4 rounded-l-md border border-slate-700 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:text-white dark:border-slate-900 dark:placeholder-gray-400"
                    required
                />
            </div>
            <button
                type="submit"
                className="h-full w-12 flex items-center justify-center pr-1 text-sm font-medium text-white bg-blue-700 rounded-r-md border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </form>
    );
};

export default SearchBar;
