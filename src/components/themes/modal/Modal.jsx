import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[rgba(0,0,0,0.1)]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
          ✖
        </button>
        <h2 className="text-lg font-bold">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;