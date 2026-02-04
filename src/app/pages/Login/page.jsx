"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SuccessModal from "@/app/components/SuccessModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Recuperamos los datos de localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    // Verificamos que los datos de login coincidan con los almacenados
    if (storedUserData && email === storedUserData.email && password === storedUserData.password) {
      setModal(true); // Abre el modal
    } else {
      setErrorMessage("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  const handleOnClose = () => {
    setModal(false); // Cierra el modal
    localStorage.setItem("redirectToHome", "true"); // Marca para redirección
    window.location.reload(); // Recarga la página
  };

  useEffect(() => {
    // Redirección después de recargar
    if (localStorage.getItem("redirectToHome") === "true") {
      localStorage.removeItem("redirectToHome"); // Limpia la marca
      router.push("/"); // Redirige a la página principal
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] flex justify-center items-center font-hostGrotesk">
      <div className="w-full max-w-lg bg-[#1b1b28] p-8 rounded-2xl shadow-xl border border-[#3d3f50] animate-fade-in-up">
        <h2 className="text-[50px] font-righteous text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
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
          {errorMessage && (
            <div className="text-red-400 text-sm mb-4">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-white rounded-lg bg-purple-600 hover:bg-purple-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Entrar
          </button>
        </form>
      </div>
      {modal && (
        <SuccessModal
          message="¡Inicio de sesión exitoso!"
          onClose={handleOnClose}
        />
      )}
    </div>
  );
};

export default Login;
