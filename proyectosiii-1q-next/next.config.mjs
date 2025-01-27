/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Desactiva el modo estricto
    devIndicators: {
      buildActivity: false, // Elimina los indicadores de actividad de compilación
      autoPrerender: false, // Desactiva las notificaciones de pre-renderizado
    },
};

export default nextConfig;
