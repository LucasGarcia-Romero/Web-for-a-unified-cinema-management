export default function SuccessModal ({ message, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="w-full max-w-sm bg-[#1b1b28] rounded-2xl shadow-xl border border-[#3d3f50] p-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            ¡Éxito!
          </h2>
          <p className="text-lg text-center text-purple-300 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full py-3 text-lg font-bold text-white rounded-lg bg-purple-600 hover:bg-purple-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };
    