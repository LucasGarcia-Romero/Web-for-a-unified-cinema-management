"use client";

import React, { useState, useEffect } from 'react';

import Login from "./pages/Login/page.jsx";
import Register from "./pages/registrate/page.jsx";
import Profile from "./pages/Login/Profile.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login"); 

  const handleLogin = (credentials) => {
 
    if (credentials.email === "test@example.com" && credentials.password === "123456") {
      setUser({ email: credentials.email });
    } else {
      alert("Credenciales inválidas");
    }
  };

  const handleRegister = (credentials) => {
  
    alert(`Usuario registrado con correo: ${credentials.email}`);
    setView("login");
  };

  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  if (user) {
    return <Profile user={user} onLogout={handleLogout} />;
  }

  return view === "login" ? (
    <Login onLogin={handleLogin} />
  ) : (
    <Register onRegister={handleRegister} />
  );
};

const Home = () => {
  const images = [
    "https://www.cinesa.es/media/wp2abtcv/hero-banner-smile-2.jpg?width=970&height=480&rxy=0.5%2C0.5",
    "https://www.cinesa.es/media/ojdotxap/hero-banner-wicked.jpg?width=970&height=480&rxy=0.5%2C0.5",
    "https://www.cinesa.es/media/xn5czl2o/hero-banner-vaiana-2.jpg?width=970&height=480&rxy=0.5%2C0.5",
    "https://www.cinesa.es/media/qybnnsax/hero-banner-pideme-lo-que-quieras.jpg?width=970&height=480&rxy=0.5%2C0.5"
  ];

  const titles = [
    "SMILE 2",
    "WICKED",
    "VAIANA 2",
    "PIDE LO QUE QUIERES"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false); // Estado para manejar la animación de fade

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Inicia la animación de desaparición
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false); // Después de cambiar la imagen, comienza la animación de aparición
      }, 500); // Espera medio segundo antes de cambiar la imagen
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [images.length]);

  return (
    <div style={{
      backgroundColor: '#343b59',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0'
    }}>
      {/* Header con el logo */}
      <header>
        <img 
          src="/imagenes/logoTextoyFrase.png" 
          alt="CineFácil Logo" 
          style={{
            maxWidth: '70%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
            filter: 'invert(1)',
            marginBottom: '10px',
            marginTop: '40px'
          }} 
        />
      </header>

      {/* Imagen principal y título */}
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        width: '100%',
        height: '60%',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transition: 'opacity 0.5s ease', // Transición rápida para el fade
          opacity: isFading ? 0 : 1, // Controla la opacidad para el fade
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}>
          <img
            src={images[currentImageIndex]}
            alt={`Imagen ${currentImageIndex + 1}`}
            style={{
              maxWidth: '80%', 
              height: 'auto',
            }}
          />
          <div style={{
            position: 'absolute',
            top: '45%',
            left: '5%',
            transform: 'translateY(-50%)',
            color: 'white',
            maxWidth: '250px',
            textAlign: 'left',
            zIndex: 1
          }}>
            <h1 style={{
              fontSize: '6rem',
              fontWeight: 'bold',
              lineHeight: '1',
              whiteSpace: 'nowrap',
              fontFamily: 'Bebas Neue',
              marginBottom: '5px'
            }}>
              {titles[currentImageIndex]}
            </h1>
            <button style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '5px',
              fontWeight: 'bold',
              position: 'relative',
              cursor: 'pointer'
            }}>
              ¡Ya en tu cine!
            </button>
          </div>
        </div>
      </section>

      {/* Indicadores debajo de las imágenes */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
        marginTop: '5px'
      }}>
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: '12px',
              height: '12px',
              border: '2px solid white',
              borderRadius: '50%',
              backgroundColor: currentImageIndex === index ? 'white' : 'transparent',
              transition: 'background-color 0.3s ease'
            }}
          ></div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        width: '100%',
        backgroundColor: '#2a3148',
        padding: '10px 20px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
      }}>
        {/* Texto de "Quiénes somos" alineado a la izquierda */}
        <p style={{
          fontSize: '1rem',
          margin: 0,
          lineHeight: '1.5',
          textAlign: 'left',
        }}>
          Quiénes somos
        </p>

        {/* Logos de las aplicaciones alineados a la derecha */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'flex-end'
        }}>
          <img 
            src="/imagenes/facebook.png" 
            alt="Facebook" 
            style={{
              width: '30px', 
              height: '30px', 
              filter: 'invert(1)'
            }} 
          />
          <img 
            src="/imagenes/instagram.png" 
            alt="Instagram" 
            style={{
              width: '30px', 
              height: '30px', 
              filter: 'invert(1)'
            }} 
          />
        </div>
      </footer>
    </div>
  );
};

export default Home;
