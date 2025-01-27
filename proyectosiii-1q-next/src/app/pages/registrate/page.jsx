"use client";
import React, { useState } from "react";
import SuccessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";

const Registrate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const router = useRouter();

  // Función para manejar el registro
  const handleRegister = (e) => {
    e.preventDefault();

    if (email && password) {
      // Guardamos los datos en localStorage
      localStorage.setItem('userData', JSON.stringify({ email, password }));
      setModal(true); 
      setEmail(""); // Limpiar campos
      setPassword(""); // Limpiar campos
    } else {
      alert("Por favor, complete ambos campos.");
    }
  };

  const handleOnClose = () => { 
    setModal(false);
    router.push("/pages/Login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] flex justify-center items-center font-hostGrotesk">
      <div className="w-full max-w-lg bg-[#1b1b28] p-8 rounded-2xl shadow-xl border border-[#3d3f50] animate-fade-in-up">
        <h2 className="text-[50px] font-righteous text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Registro
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2 text-purple-300">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="nombre@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#3d3f50] bg-[#2c2e3e] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium mb-2 text-purple-300">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#3d3f50] bg-[#2c2e3e] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-white rounded-lg bg-purple-600 hover:bg-purple-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Registrarse
          </button>
        </form>
      </div>
      {modal && (
        <SuccessModal
          message="¡Tu cuenta ha sido creada exitosamente!"
          onClose={() => handleOnClose()}
        />
      )}
    </div>
  );
};

export default Registrate;
