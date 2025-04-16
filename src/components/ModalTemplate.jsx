export default function Modal({ open, onClose, children }) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-xl shadow transition-all w-2/5
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="p-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          ></button>
          {children}
        </div>
      </div>
    </div>
  );
}
