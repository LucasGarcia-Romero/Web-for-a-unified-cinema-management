'use client';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";

const puertoApi = 3001;

export default function CineDetalles() {
    const { id } = useParams();
    const router = useRouter();
    const [cine, setCine] = useState(null);
    const [loading, setLoading] = useState(true);

    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalAdvertencia, setModalAdvertencia] = useState(false); // Estado para el modal de advertencia
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);

    const formatFecha = (fecha) => {
        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const anio = String(fecha.getFullYear()).slice(-2);
        return `${dia}/${mes}/${anio}`;
    };

    const diasDisponibles = Array.from({ length: 7 }, (_, i) => {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + i + 1); // Comienza desde mañana
        return formatFecha(fecha);
    });

    useEffect(() => {
        const fetchCineDetalles = async () => {
            try {
                const response = await fetch(`http://localhost:${puertoApi}/api/cines/${id}`);
                if (!response.ok) throw new Error("Error al obtener los detalles del cine");
                const data = await response.json();
                setCine(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCineDetalles();
    }, [id]);

    const abrirModal = (pelicula) => {
        setPeliculaSeleccionada(pelicula);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setPeliculaSeleccionada(null);
        setDiaSeleccionado(null);
    };

    const handleHorarioClick = (pelicula, horario, cineId) => {
        if (!diaSeleccionado) {
            setModalAdvertencia(true); // Abre el modal de advertencia
            return;
        }

        router.push(`/pages/seatSelection?movieId=${pelicula}&time=${horario}&date=${diaSeleccionado}`);
    };

    if (loading) return <p className="text-center text-white text-xl font-semibold animate-pulse">Cargando...</p>;

    const getEmbedYouTubeURL = (videoId) => {
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] text-white p-6 flex flex-col items-center animate-fade-in-up">
            <h1 className="text-[100px] purple-title">{cine?.nombre}</h1>
            <p className="text-lg mb-8 bg-[#2c2e3e] px-6 py-3 rounded-full shadow-lg">
                <strong className="text-purple-400">Dirección:</strong> {cine?.direccion}
            </p>

            <div className="bg-[#1b1b28]/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-5xl">
                <h2 className="text-4xl font-semibold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Películas Disponibles
                </h2>

                {cine?.peliculas?.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cine.peliculas.map((pelicula) => (
                            <li
                                key={pelicula.id}
                                onClick={() => abrirModal(pelicula)}
                                className="bg-[#2c2e3e] rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:bg-[#343b59] transition-all duration-300 cursor-pointer transform hover:scale-105"
                            >
                                <h3 className="text-xl mb-4 not-italic font-serifDisplay text-purple-300">{pelicula.titulo}</h3>
                                <img
                                    src={`${pelicula.imagen}`}
                                    alt={pelicula.titulo}
                                    className="w-48 h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-400 text-lg italic">
                        No hay películas disponibles en este cine.
                    </p>
                )}
            </div>

            {modalAbierto && peliculaSeleccionada && (
                <Modal onClose={cerrarModal}>
                    <div className="flex flex-col md:flex-row items-center text-white bg-[#1b1b28] p-8 rounded-2xl shadow-2xl max-w-5xl w-full mx-auto">
                        <div className="flex-1 text-center md:text-left md:pr-8">
                            <h2 className="text-4xl md:text-5xl font-serifDisplay mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{peliculaSeleccionada.titulo}</h2>

                            {peliculaSeleccionada.trailer && (
                                <div className="relative w-full max-w-[600px] mx-auto mb-8" style={{ paddingBottom: "56.25%" }}>
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                                        src={getEmbedYouTubeURL(peliculaSeleccionada.trailer)}
                                        title={`Trailer de ${peliculaSeleccionada.titulo}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}

                            <h3 className="text-2xl mb-4 font-semibold text-purple-300">Días Disponibles</h3>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                                {diasDisponibles.map((dia, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setDiaSeleccionado(dia)}
                                        className={`px-6 py-3 rounded-full ${diaSeleccionado === dia ? "bg-purple-600" : "bg-[#343b59]"
                                            } text-white hover:bg-purple-600 transition-all duration-300`}
                                    >
                                        {dia}
                                    </button>
                                ))}
                            </div>

                            <h3 className="text-2xl mb-4 font-semibold text-purple-300">Horarios Disponibles</h3>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                                {peliculaSeleccionada.horarios.map((horario, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleHorarioClick(peliculaSeleccionada.id, horario, id)}
                                        className="bg-[#343b59] text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                    >
                                        {horario}
                                    </button>
                                ))}
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

            {modalAdvertencia && (
                <Modal onClose={() => setModalAdvertencia(false)}>
                    <div className="text-center text-white bg-[#1b1b28] p-6 rounded-2xl shadow-xl">
                        <h3 className="text-2xl mb-4 font-semibold text-purple-400">¡Advertencia!</h3>
                        <p className="text-lg">Por favor, selecciona un día antes de elegir un horario.</p>
                        <button
                            onClick={() => setModalAdvertencia(false)}
                            className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300"
                        >
                            Cerrar
                        </button>

                    </div>
                </Modal>
            )}
        </div>
    );
}
