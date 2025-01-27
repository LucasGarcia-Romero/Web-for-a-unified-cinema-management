"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa"; // Ícono de carrito
import SearchBar from "../components/SearchBar"; // Componente SearchBar
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Hook para obtener la ruta actual
import UserCircle from "@/app/components/UserCircle";

function Navbar() {
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]); // Datos locales de la API
  const [user, setUser] = useState(null);
  const pathname = usePathname(); // Obtén la ruta actual

  useEffect(() => {
    const currentPath = pathname; // Ruta actual

    // Determinar la API según la ruta actual
    let apiUrl = "";
    if (currentPath?.includes("/pages/MoviesList")) {
      apiUrl = "http://localhost:3001/api/peliculas";
    } else if (currentPath?.includes("/pages/CinemaList")) {
      apiUrl = "http://localhost:3001/api/cines";
    }

    if (apiUrl) {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setData(data); // Guardar los datos de la API localmente
        })
        .catch((error) => console.error("Error al cargar datos:", error));
    }
  }, [pathname]);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("userData"));
    if (userLocal) {
      setUser(userLocal);
    }
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Filtrar resultados localmente según el término ingresado
    const filteredResults = data.filter((item) =>
      (item.titulo || item.nombre) // Dependiendo del tipo de objeto
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <nav className="bg-[#2a2f46] p-4 font-parkinsans relative z-50 flex items-center">
      <ul className="flex items-center gap-6 text-white">
        <li className="font-bold text-lg">
          <Link href="/" passHref>
            <div className="cursor-pointer">
              <img
                src="/imagenes/logoTexto.png"
                alt="CineFácil Logo"
                className="h-6 filter brightness-0 invert ml-2"
              />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/pages/CinemaList" passHref>
            <div className="cursor-pointer hover:text-[#7a82a0]">Cines</div>
          </Link>
        </li>
        <li>
          <Link href="/pages/MoviesList" passHref>
            <div className="cursor-pointer hover:text-[#7a82a0]">Películas</div>
          </Link>
        </li>
        <li>
          <Link href="/pages/Promotions" passHref>
            <div className="cursor-pointer hover:text-[#7a82a0]">
              Promociones
            </div>
          </Link>
        </li>
        <li>
          <Link href="/pages/CinemaSnacks" passHref>
            <div className="cursor-pointer hover:text-[#7a82a0]">Comidas</div>
          </Link>
        </li>
        <li>
          <Link href="/pages/InteractiveMap" passHref>
            <div className="cursor-pointer hover:text-[#7a82a0]">
              Mapa interactivo
            </div>
          </Link>
        </li>
      </ul>

      {/* Barra de búsqueda */}
      <div className="ml-auto relative flex items-center">
        <SearchBar onSearch={handleSearch} />
        {results.length > 0 && (
          <div className="absolute top-full mt-2 left-0 w-80 bg-white text-black rounded-md shadow-lg max-h-64 overflow-y-auto z-50">
            <ul>
              {results.map((item) => (
                <li
                  key={item.id}
                  className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                >
                  <Link
                    href={
                      pathname.includes("/pages/MoviesList")
                        ? `/pages/MoviesList/${item.id}`
                        : `/pages/CinemaList/${item.id}`
                    }
                  >
                    <div>
                      <strong className="text-blue-600 hover:underline">
                        {item.titulo || item.nombre}
                      </strong>
                      {item.direccion && (
                        <p className="text-xs text-gray-500">{item.direccion}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Iconos adicionales */}
      <div className="ml-4 flex items-center gap-4">
        <Link href="/pages/Cart" passHref>
          <div className="cursor-pointer hover:text-[#7a82a0] flex items-center">
            <FaShoppingCart className="mr-2" />
            <span>Carrito</span>
          </div>
        </Link>
        {user ? (
          <UserCircle />
        ) : (
          <>
            <Link href="/pages/Login" passHref>
              <div className="cursor-pointer hover:text-[#7a82a0]">Inicia sesión</div>
            </Link>
            <Link href="/pages/registrate" passHref>
              <div className="cursor-pointer hover:text-[#7a82a0]">Regístrate</div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
