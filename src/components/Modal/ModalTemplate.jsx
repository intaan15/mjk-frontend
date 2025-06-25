import { useEffect, useState } from "react";

export default function Modal({ open, onClose, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setTimeout(() => setAnimate(true), 15);
    } else {
      setAnimate(false);
      setIsVisible(false); 
    }
  }, [open]);

  if (!isVisible) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black/40 transition-opacity duration-300 p-4 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-lg shadow-md transition-opacity duration-300 p-2 
          w-full max-w-sm
          sm:max-w-lg sm:w-4/5
          md:max-w-2xl md:w-3/4
          lg:max-w-4xl lg:w-3/5
          xl:max-w-5xl xl:w-1/2
        ${
          animate ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="p-2 sm:p-6 overflow-y-auto max-h-[85vh] sm:max-h-[80vh] scrollbar-hide">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 sm:p-1.5 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200"
          >
          
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
