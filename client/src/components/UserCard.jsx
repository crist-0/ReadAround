import React from "react";

const UserCard = ({user}) => {
    return (
        <div className="flex justify-center items-center py-5 bg-gray-900">
            <div className="max-w-sm w-full bg-gray-800 border border-gray-200 rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                {/* Card Header */}
                <div className="flex justify-center pt-4">
                    <img
                        className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-lg"
                        src="/bg1.jpg"
                        alt="Bonnie image"
                    />
                </div>
                {/* Card Body */}
                <div className="text-center p-4">
                    <h5 className="text-xl font-bold text-gray-900 dark:text-white">{user}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Creative Designer</p>
                    {/* Action Button */}
                    <div className="mt-6">
                        <a
                            href="#"
                            className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
                        >
                            Follow
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
