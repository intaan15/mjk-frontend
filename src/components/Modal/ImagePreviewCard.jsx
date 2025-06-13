import React from 'react';

export const ImagePreviewCard = ({ imageSrc, imageAlt, label, onImageClick, className = "" }) => {
  return (
    <div className={`flex flex-col gap-2 w-full text-left px-10 ${className}`}>
      <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">
        {label}
      </label>
      <div className="rounded-xl p-2 w-60 h-40 flex items-center justify-center gap-2 relative group">
        {imageSrc ? (
          <div 
            className="relative cursor-pointer"
            onClick={() => onImageClick(imageSrc, imageAlt)}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="rounded-xl p-2 w-60 h-40 border-2 border-[#025F96] object-cover transition-all duration-300 group-hover:brightness-75"
            />
            {/* Zoom Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">Belum ada foto</p>
        )}
      </div>
    </div>
  );
};

// ImagePreviewModal.jsx - Modal untuk menampilkan gambar ukuran penuh
export const ImagePreviewModal = ({ isOpen, imageSrc, imageAlt, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70  flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-screen p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-white rounded-full p-2 hover:bg-[#004A76]  transition-colors duration-200 z-10"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-gray-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
        
        {/* Image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-auto max-h-auto object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* Image Title */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#004A76] text-xl text-white p-3 rounded-b-lg">
          <p className="text-center font-medium">File : {imageAlt}</p>
        </div>
      </div>
    </div>
  );
};