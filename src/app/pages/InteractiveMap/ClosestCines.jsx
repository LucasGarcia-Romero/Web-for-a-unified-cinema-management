import React from 'react';

/**
 * Función para calcular la distancia entre dos pares de coordenadas (en km) usando la fórmula de haversine.
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} distancia en km
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function ClosestCines({ cines, userLocation }) {
  if (!userLocation || !cines || cines.length === 0) {
    return null;
  }

  const { latitude, longitude } = userLocation;

  // Calculamos distancias de cada cine al usuario
  const cinesConDistancia = cines.map(cine => {
    const dist = calculateDistance(latitude, longitude, cine.latitud, cine.longitud);
    return { ...cine, distancia: dist };
  });

  // Ordenamos por distancia ascendente
  cinesConDistancia.sort((a, b) => a.distancia - b.distancia);

  // Tomamos los 5 primeros (o menos si no hay tantos)
  const cincoMasCercanos = cinesConDistancia.slice(0, 5);

  return (
    <div className="container mx-auto text-white px-4 mb-10">
      <h2 className="text-2xl font-bold mb-4">Cines más cercanos</h2>
      <ul className="space-y-4">
        {cincoMasCercanos.map((cine) => (
          <li key={cine.id} className="border-b border-gray-500 pb-2">
            <p className="font-semibold">{cine.nombre}</p>
            <p>Dirección: {cine.direccion}</p>
            <p>Distancia: {cine.distancia.toFixed(2)} km</p>
            <a 
              href={`/pages/CinemaList/${cine.id}`} 
              className="text-blue-400 underline"
            >
              Ver más detalles
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
