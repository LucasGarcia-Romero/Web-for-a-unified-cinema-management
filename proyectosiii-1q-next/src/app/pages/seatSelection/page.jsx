"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";

const SeatSelection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const movieId = searchParams.get("movieId");
  const time = searchParams.get("time");
  const date = searchParams.get("date");

  const [butacas, setButacas] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatCount, setSelectedSeatCount] = useState(0);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [titulo, setTitulo] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieSeats = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/peliculas/${movieId}`);
        if (!response.ok) throw new Error("Error al obtener los detalles de la película");

        const data = await response.json();
        setMovie(data);
        setTitulo(data.titulo);

        if (data.sala && data.sala.butacas) {
          setButacas(data.sala.butacas);
        } else {
          console.error("No se encontraron butacas para esta película.");
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieSeats();
  }, [movieId]);

  const toggleSeat = (rowIndex, colIndex) => {
    const updatedButacas = JSON.parse(JSON.stringify(butacas)); // Clonar el arreglo
    const seatStatus = updatedButacas[rowIndex][colIndex];
  
    if (seatStatus === 3) return; // Pasillo, no interactuable
  
    // Convertir índices a formato A1, B2, etc.
    const seatLabel = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
  
    if (seatStatus === 0) {
      updatedButacas[rowIndex][colIndex] = 2; // Seleccionado
      setSelectedSeats((prev) => [...prev, seatLabel]);
      setSelectedSeatCount((count) => count + 1);
    } else if (seatStatus === 2) {
      updatedButacas[rowIndex][colIndex] = 0; // Disponible
      setSelectedSeats((prev) => prev.filter((seat) => seat !== seatLabel));
      setSelectedSeatCount((count) => count - 1);
    }
  
    setButacas(updatedButacas);
  };

  const handleConfirm = () => {
    const existingData = JSON.parse(localStorage.getItem("paymentData")) || {};
    const price = selectedSeats.length * 6.95;

    const updatedData = {
      ...existingData,
      movieId,
      time,
      selectedSeats, // Añadimos la lista de asientos seleccionados
      price,
      titulo,
      date,
    };

    localStorage.setItem("paymentData", JSON.stringify(updatedData));
    router.push(`/pages/Payments?price=${price}`);
  };

  if (!butacas.length) return <Loading />;

  return (
    <div className="min-h-screen bg-[#1a1b2b] p-8 flex flex-col items-center">
      <h1 className="text-center pink-title text-[70px]">{movie.titulo}</h1>
      <h1 className="text-center pink-title text-[30px] mb-10">{date} {time}</h1>

      {/* Contenedor principal con imagen y contenido */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 w-full max-w-6xl mx-auto">
        {/* Imagen */}
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            src={movie.imagen}
            alt={movie.titulo}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Contenido */}
        <div className="flex-1">
          <div className="bg-[#3b3b8c] p-4 rounded-lg mb-12">
            <p className="text-center mb-5 font-parkinsans text-3xl">PANTALLA</p>
            <div className="flex justify-center items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#6366f1]"></div>
                <span className="text-white">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500"></div>
                <span className="text-white">Ocupado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#a855f7]"></div>
                <span className="text-white">Seleccionado</span>
              </div>
            </div>
          </div>

          {/* Grid de asientos */}
          <div className="mb-12">
            {butacas.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1 mb-1">
                {row.map((seat, colIndex) => {
                  let seatStyle = "";

                  if (seat === 0) seatStyle = "bg-blue-500 hover:bg-blue-600";
                  else if (seat === 1) seatStyle = "bg-red-500 opacity-50";
                  else if (seat === 2) seatStyle = "bg-purple-500 hover:bg-purple-600";
                  else if (seat === 3) seatStyle = "bg-gray-500 opacity-30";

                  return (
                    <button
                      key={colIndex}
                      onClick={() => toggleSeat(rowIndex, colIndex)}
                      disabled={seat === 1 || seat === 3}
                      className={`w-8 h-8 rounded ${seatStyle} transition-all duration-200`}
                    ></button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <p className="text-white text-lg">Asientos seleccionados: {selectedSeatCount}</p>
            <button
              onClick={handleConfirm}
              disabled={selectedSeatCount === 0}
              className="bg-[#a855f7] text-white px-6 py-2 rounded-md hover:bg-[#9333ea] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar selección
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
