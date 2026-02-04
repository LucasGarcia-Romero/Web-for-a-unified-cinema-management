'use client';

import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // Importar iconos de estrellas
import Loading from "@/app/components/Loading";
import Link from "next/link";

const puertoApi = 3001;

export default function Peliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [favoritos, setFavoritos] = useState([]);

  const [cines, setCines] = useState([]);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await fetch(`http://localhost:${puertoApi}/api/peliculas`);
        if (!response.ok) throw new Error("Error al obtener las películas");
        const data = await response.json();
        setPeliculas(data);
      } catch (error) {
        console.error("Error al cargar películas:", error);
      } finally {
        setLoading(false);
      }
    };

    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favs);

    fetchPeliculas();
  }, []);

  const abrirModal = async(pelicula) => {
    setPeliculaSeleccionada(pelicula);
    setModalAbierto(true);


    //PARA SABER EN QUÉ CINE ESTÁ LA PELÍCULA
    try{
      const response = await fetch(`http://localhost:${puertoApi}/api/peliculas/${pelicula.id}`);
      if(!response.ok) throw new Error("Error al obtener la película");

      const data = await response.json();
      setCines(data.cines);
    }catch(e){
      console.error(e.message);
      setCines([]);
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPeliculaSeleccionada(null);
  };

  const toggleFavorito = (peliculaId) => {
    let nuevosFavoritos;

    if (favoritos.includes(peliculaId)) {
      //eliminar favs
      nuevosFavoritos = favoritos.filter((id)=> id !== peliculaId); //eliminas
    } else {
      //añadir favs
      nuevosFavoritos = [...favoritos, peliculaId]; //añades
    }

    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] text-white p-6 flex flex-col items-center">
      <div className="animate-fade-in-up">

        {loading ? (
            <Loading />
        ) : (
          <>
            <h1 className="text-[100px] purple-title">
              PELÍCULAS
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              {peliculas.map((pelicula) => (
                <div
                  key={pelicula.id}
                  className="relative cursor-pointer group hover-grow"
                >
                  <img
                    src={pelicula.imagen}
                    alt={pelicula.titulo}
                    className="w-full h-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    onClick={() => abrirModal(pelicula)}
                  />

                  {/*icono de Favoritos */}
                  <div
                    className="absolute top-2 right-2 text-yellow-400 text-3xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita abrir el modal al hacer clic en la estrella
                      toggleFavorito(pelicula.id);
                    }}
                  >
                    {favoritos.includes(pelicula.id) ? <AiFillStar /> : <AiOutlineStar />}
                  </div>
                </div>
              ))}

            </div>
          </>
        )}
      </div>

      {peliculas.length === 0 && !loading && (
        <p className="text-xl text-gray-400 mt-8 animate-fade-in-up">
          No se encontraron películas disponibles.
        </p>
      )}


      {modalAbierto && peliculaSeleccionada && (
        <Modal onClose={cerrarModal}>
          <div className="flex flex-col md:flex-row items-center text-white bg-[#1b1b28] p-8 rounded-2xl shadow-2xl max-w-5xl w-full mx-auto">
            <div className="flex-1 text-center md:text-left md:pr-8">
              <h2 className="text-4xl md:text-5xl font-serifDisplay mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {peliculaSeleccionada.titulo}
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                <strong className="text-purple-400">Descripción:</strong> {peliculaSeleccionada.descripcion}
              </p>

              {peliculaSeleccionada.trailer && (
                <div
                  className="relative w-full max-w-[600px] mx-auto mb-8"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                    src={`https://www.youtube.com/embed/${peliculaSeleccionada.trailer}`}
                    title={`Trailer de ${peliculaSeleccionada.titulo}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <h3 className="text-2xl font-semibold text-purple-300">
                Duración: <span className="text-gray-300"> {peliculaSeleccionada.duracion} min</span>
              </h3>

              <div className='mt-3'>
                <Link href={`/pages/MoviesList/${peliculaSeleccionada.id}`} className="font-parkinsans transition duration-200 hover:text-gray-400">Ver más...</Link>
              </div>
            </div>

            <div className="flex-shrink-0 w-64 h-auto mt-6 md:mt-0">
              <img
                src={`${peliculaSeleccionada.imagen}`}
                alt={peliculaSeleccionada.titulo}
                className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              />
            </div>


          </div>
        </Modal>
      )}
    </div>
  );
}
