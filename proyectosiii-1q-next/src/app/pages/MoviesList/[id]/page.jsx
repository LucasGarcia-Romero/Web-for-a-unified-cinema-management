"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // Íconos de estrellas

const puertoApi = 3001;

const MovieDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [cines, setCines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // Estado para favoritos

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:${puertoApi}/api/peliculas/${id}`);
        if (!response.ok) throw new Error("Error al obtener la película");
        const data = await response.json();
        setMovie(data);
        setCines(data.cines);

        // Verificar si está en favoritos
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        setIsFavorite(favoritos.includes(data.id));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleCineClick = (cineId) => {
    router.push(`/pages/CinemaList/${cineId}`);
  };

  const toggleFavorite = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let nuevosFavoritos;

    if (isFavorite) {
      // Quitar de favoritos
      nuevosFavoritos = favoritos.filter((favId) => favId !== movie.id);
    } else {
      // Agregar a favoritos
      nuevosFavoritos = [...favoritos, movie.id];
    }

    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    setIsFavorite(!isFavorite);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e]">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] text-gray-400 text-xl">
        Película no encontrada
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] text-white px-6 py-12">
      {/* Cabecera */}
      <div className="flex flex-col lg:flex-row items-start gap-8 max-w-6xl mx-auto relative">
        {/* Imagen de la película */}
        <div className="flex-shrink-0 w-full lg:w-1/3 relative">
          <img
            src={movie.imagen}
            alt={movie.titulo}
            className="w-full h-auto rounded-lg shadow-lg"
          />

          {/* Icono de favoritos */}
          <div
            className="absolute top-4 right-4 text-yellow-400 text-3xl cursor-pointer"
            onClick={toggleFavorite}
          >
            {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
          </div>
        </div>

        {/* Tráiler y detalles */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            {movie.titulo}
          </h1>
          {movie.trailer && (
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailer}`}
                title={`Tráiler de ${movie.titulo}`}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Detalles de la película */}
          <div className="mt-6 bg-[#1b1b28] p-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-300 mb-4">
              <strong className="text-purple-400">Descripción:</strong> {movie.descripcion}
            </p>
            <p className="text-lg text-gray-300 mb-4">
              <strong className="text-purple-400">Género:</strong> {movie.genero}
            </p>
            <p className="text-lg text-gray-300">
              <strong className="text-purple-400">Duración:</strong> {movie.duracion} minutos
            </p>
          </div>
        </div>
      </div>

      {/* Lista de cines */}
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-purple-400 mb-6">Disponible en los siguientes cines:</h2>

        {cines && cines.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cines.map((cine) => (
              <li
                key={cine.id}
                className="relative bg-[#1b1b28] p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-[#2c2e3e] transition-all cursor-pointer group"
                onClick={() => handleCineClick(cine.id)}
              >
                <h3 className="text-xl font-semibold text-purple-300 group-hover:text-white mb-2">
                  {cine.nombre}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300">{cine.direccion}</p>
                {/* <span className="absolute bottom-4 right-4 text-sm text-gray-500 group-hover:text-gray-300">
                  Haz clic para ver más
                </span> */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-lg italic">No hay cines disponibles para esta película.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
