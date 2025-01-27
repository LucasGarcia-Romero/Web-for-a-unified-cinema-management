"use client";
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ClosestCines from './ClosestCines'; // Ajuste la ruta según su estructura de carpetas

// Ícono por defecto para el resto de marcadores
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Ícono para la ubicación del usuario (imagen local)
const userLocationIcon = new L.Icon({
  iconUrl: '/icons/ubicacion.png', // Asegúrese de que la imagen exista en public/icons/mi-icono.png
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: null,
});

export default function Map() {
  const [cines, setCines] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error("El contenedor del mapa no existe.");
      return;
    }

    const map = L.map('map').setView([40.416775, -3.70379], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Carga de cines
    fetch('http://localhost:3001/api/cines')
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener datos de la API');
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCines(data);
          data.forEach((cine) => {
            if (cine.latitud && cine.longitud) {
              const marker = L.marker([cine.latitud, cine.longitud]).addTo(map);
              marker.bindPopup(`
                <div class="text-sm">
                  <b>${cine.nombre}</b><br>
                  Dirección: ${cine.direccion}<br>
                  Teléfono: ${cine.telefono}<br>
                  <a href="/pages/CinemaList/${cine.id}" class="text-blue-500 underline">Web</a>
                </div>
              `);
            } else {
              console.warn(`Coordenadas no disponibles para el cine: ${cine.nombre}`);
            }
          });
        } else {
          console.error('Los datos recibidos no son un array:', data);
        }
      })
      .catch((error) => console.error('Error al cargar los cines:', error));

    // Ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          const userMarker = L.marker([latitude, longitude], { icon: userLocationIcon }).addTo(map);
          userMarker.bindPopup('Tu ubicación actual');
          map.setView([latitude, longitude], 14);
        },
        (error) => {
          console.error('No se pudo obtener la ubicación del usuario:', error);
        }
      );
    } else {
      console.warn('La geolocalización no está disponible en este navegador.');
    }

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="bg-343b59 min-h-screen text-white">
      <div className='animate-fade-in-up'>
        <header className="text-center py-5 bg-[#1e2335] mb-10">
          <h1 className="purple-title text-[120px]">
            MAPA INTERACTIVO
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-parkinsans">
            Explora cines cerca de ti y conoce sus detalles.
          </p>
        </header>

        <div
          id="map"
          className="container mx-auto rounded-lg shadow-lg overflow-hidden border-4 border-purple-950"
          style={{ width: '90%', height: '500px', marginBottom: '2rem' }}
        ></div>

        {/* Listado de cines más cercanos */}
        <ClosestCines cines={cines} userLocation={userLocation} />
      </div>
    </div>
  );
}
