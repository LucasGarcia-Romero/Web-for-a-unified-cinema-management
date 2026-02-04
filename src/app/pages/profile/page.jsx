'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; // Iconos de favoritos

export default function Profile() {
    const router = useRouter();
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtener datos del usuario del localStorage
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        if (!userData || !userData.email) {
            // Redirigir a la página de inicio de sesión si no hay un correo disponible
            router.push('/pages/Login');
            return;
        }

        const [name] = userData.email.split('@'); // Extraer nombre antes del @
        setUserName(name.charAt(0).toUpperCase() + name.slice(1)); // Capitalizar el nombre
        setUserEmail(userData.email);

        // Obtener favoritos y películas
        const favourites = JSON.parse(localStorage.getItem('favoritos') || '[]'); // Obtener favoritos del localStorage

        const fetchFavoriteMovies = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/peliculas');
                if (!response.ok) throw new Error('Error al obtener las películas');
                const data = await response.json();

                // Filtrar solo las películas favoritas
                const favMovies = data.filter((movie) => favourites.includes(movie.id));
                setFavoriteMovies(favMovies);
            } catch (error) {
                console.error('Error al obtener películas favoritas:', error);
            }
        };

        fetchFavoriteMovies();
    }, []);

    const toggleFavorite = (movieId) => {
        const favourites = JSON.parse(localStorage.getItem('favoritos') || '[]');
        let updatedFavorites;

        if (favourites.includes(movieId)) {
            // Eliminar de favoritos
            updatedFavorites = favourites.filter((id) => id !== movieId);
        } else {
            // Añadir a favoritos
            updatedFavorites = [...favourites, movieId];
        }

        localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
        setFavoriteMovies((prev) =>
            prev.filter((movie) => updatedFavorites.includes(movie.id))
        ); // Actualizar la lista local
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] text-white p-8">
            <div className="animate-fade-in-up">
                <h1 className="purple-title text-center text-[130px] mb-8">PERFIL</h1>

                <div className="max-w-6xl mx-auto bg-[#2c2e3e] rounded-xl shadow-lg p-8">
                    {/* Información del usuario */}
                    <div className="flex flex-col md:flex-row items-center mb-12">
                        <div className="flex-shrink-0 mb-4 md:mb-0">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/10542/10542486.png"
                                alt="Perfil"
                                className="w-40 h-40 rounded-full shadow-md border-4 border-purple-400"
                            />
                        </div>

                        <div className="text-center md:text-left md:ml-8">
                            <h2 className="text-4xl font-bold mb-2">{userName}</h2>
                            <p className="text-lg text-gray-300">{userEmail}</p>
                            <p className="mt-4 text-gray-400 italic">"Me gusta el cine"</p>
                        </div>
                    </div>

                    {/* Películas favoritas */}
                    <div>
                        <h3 className="text-3xl font-semibold text-purple-400 mb-6">
                            Películas Favoritas
                        </h3>

                        {favoriteMovies.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {favoriteMovies.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="bg-[#1b1b28] rounded-lg p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 hover-grow relative"
                                    >
                                        <img
                                            src={movie.imagen}
                                            alt={movie.titulo}
                                            className="w-full h-auto rounded-lg mb-4 shadow-md"
                                            onClick={() => router.push(`/pages/MoviesList/${movie.id}`)}
                                        />
                                        <h4 className="text-center text-lg font-medium text-white">
                                            {movie.titulo}
                                        </h4>

                                        {/* Estrella para favoritos */}
                                        <div
                                            className="absolute top-4 right-4 text-yellow-400 text-3xl cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Evitar que haga clic en la tarjeta
                                                toggleFavorite(movie.id);
                                            }}
                                        >
                                            <AiFillStar />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center">
                                <p className="text-gray-400 text-lg italic mb-4">
                                    No tienes películas favoritas aún.
                                </p>
                                <button
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
                                    onClick={() => router.push('/pages/MoviesList')}
                                >
                                    Añadir películas
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
