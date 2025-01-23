import React from "react";

const CustomAlert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: "bg-green-100 text-green-700 border-green-500",
    error: "bg-red-100 text-red-700 border-red-500",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        className={`p-4 rounded-lg border shadow-lg w-80 ${
          type ? alertStyles[type] : alertStyles.error
        }`}
      >
        <p className="text-center">{message}</p>
        <button
          onClick={onClose}
          className="block mt-4 mx-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
