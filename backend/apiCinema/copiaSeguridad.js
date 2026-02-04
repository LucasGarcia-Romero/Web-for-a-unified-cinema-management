const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');


const app = express();

// Configurar CORS para permitir solicitudes desde el cliente
app.use(cors({
    origin: 'http://localhost:3000', // Cliente Next.js
}));

// Servir archivos estáticos desde el directorio 'public/images'
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
const salas = JSON.parse(fs.readFileSync('salas.json', 'utf-8'));

// Datos de los cines
const cines = [
    {
        id: 1,
        "nombre": "Kinépolis Madrid Ciudad de la Imagen",
        "direccion": "Calle Edgar Neville s/n, 28223 Pozuelo de Alarcón, Madrid",
        "latitud": 40.452123,
        "longitud": -3.784519,
        "telefono": "912 759 200",
        "web": "https://kinepolis.es/cines/kinepolis-madrid-ciudad-de-la-imagen/informacion",
        peliculas: [1, 2, 3, 6, 9, 11, 13]
    },
    {
        id: 2,
        "nombre": "Cinesa Príncipe Pío",
        "direccion": "Paseo de la Florida, s/n, 28008 Madrid",
        "latitud": 40.421265,
        "longitud": -3.718312,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Principe-Pio",
        peliculas: [1, 2, 4, 7, 9, 10, 13, 14]
    },
    {
        id: 3,
        "nombre": "Yelmo Cines Ideal",
        "direccion": "Calle del Doctor Cortezo, 6, 28012 Madrid",
        "latitud": 40.413759,
        "longitud": -3.703923,
        "telefono": "914 203 079",
        "web": "https://yelmocines.es/cartelera/madrid/ideal",
        peliculas: [1, 2, 3, 5, 8, 9, 12, 14],
    },
    {
        id: 4,
        "nombre": "Cines Callao",
        "direccion": "Plaza del Callao, 3, 28013 Madrid",
        "latitud": 40.419593,
        "longitud": -3.705722,
        "telefono": "915 472 606",
        "web": "https://www.cinescallao.es/",
        peliculas: [2, 4, 6, 7, 9, 10, 12, 15]
    },
    {
        id: 5,
        "nombre": "Cinesa Méndez Álvaro",
        "direccion": "Calle Acanto, 2, 28045 Madrid",
        "latitud": 40.394345,
        "longitud": -3.683583,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Mendez-Alvaro",
        peliculas: [2, 5, 6, 8, 9, 11, 14, 15]
    },
    {
        id: 6,
        "nombre": "Renoir Plaza de España",
        "direccion": "Calle Martín de los Heros, 12, 28008 Madrid",
        "latitud": 40.424021,
        "longitud": -3.712245,
        "telefono": "915 428 756",
        "web": "https://www.cinesrenoir.com/plaza-de-espana/",
        peliculas: [3, 4, 5, 7, 9, 12, 13]
    },
    {
        id: 7,
        "nombre": "Cinesa Proyecciones",
        "direccion": "Calle de Fuencarral, 136, 28010 Madrid",
        "latitud": 40.433123,
        "longitud": -3.700456,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Proyecciones",
        peliculas: [3, 7, 9, 10, 11, 15]
    },
    {
        id: 8,
        "nombre": "Yelmo Cines Islazul",
        "direccion": "Calle de la Calderilla, 1, 28054 Madrid",
        "latitud": 40.369482,
        "longitud": -3.745678,
        "telefono": "914 801 000",
        "web": "https://yelmocines.es/cartelera/madrid/islazul",
        peliculas: [4, 8, 9, 11, 14]
    },
    {
        id: 9,
        "nombre": "Cinesa Manoteras",
        "direccion": "Avenida de Manoteras, 40, 28050 Madrid",
        "latitud": 40.487654,
        "longitud": -3.669876,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Manoteras",
        peliculas: [5, 8, 9, 13]
    },
    {
        id: 10,
        "nombre": "Cines Verdi Madrid",
        "direccion": "Calle de Bravo Murillo, 28, 28015 Madrid",
        "latitud": 40.438123,
        "longitud": -3.703456,
        "telefono": "914 458 246",
        "web": "https://www.cines-verdi.com/madrid/",
        peliculas: [6, 9, 10, 12, 15]
    },
    {
        id: 11,
        "nombre": "Cinesa Las Rosas",
        "direccion": "Avenida de Guadalajara, 2, 28032 Madrid",
        "latitud": 40.421265,
        "longitud": -3.618312,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Las-Rosas",
        peliculas: [9]
    },
    {
        id: 12,
        "nombre": "Cinesa La Gavia",
        "direccion": "Calle Adolfo Bioy Casares, 2, 28051 Madrid",
        "latitud": 40.373482,
        "longitud": -3.601678,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/La-Gavia",
        peliculas: [9]
    },
    {
        id: 13,
        "nombre": "Cinesa Méndez Álvaro",
        "direccion": "Calle Acanto, 2, 28045 Madrid",
        "latitud": 40.394345,
        "longitud": -3.683583,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Mendez-Alvaro",
        peliculas: [9]
    },
    {
        id: 14,
        "nombre": "Cinesa Proyecciones",
        "direccion": "Calle de Fuencarral, 136, 28010 Madrid",
        "latitud": 40.433123,
        "longitud": -3.700456,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Proyecciones",
        peliculas: [9]
    },
    {
        id: 15,
        "nombre": "Cinesa Manoteras",
        "direccion": "Avenida de Manoteras, 40, 28050 Madrid",
        "latitud": 40.487654,
        "longitud": -3.669876,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Manoteras",
        peliculas: [9]
    },
    {
        id: 16,
        "nombre": "Yelmo Cines Plenilunio",
        "direccion": "Calle Aracne, s/n, 28022 Madrid",
        "latitud": 40.437123,
        "longitud": -3.582456,
        "telefono": "914 801 000",
        "web": "https://yelmocines.es/cartelera/madrid/plenilunio",
        peliculas: [9]
    },
    {
        id: 17,
        "nombre": "Yelmo Cines Ideal",
        "direccion": "Calle del Doctor Cortezo, 6, 28012 Madrid",
        "latitud": 40.413759,
        "longitud": -3.703923,
        "telefono": "914 203 079",
        "web": "https://yelmocines.es/cartelera/madrid/ideal",
        peliculas: [9]
    },
    {
        id: 18,
        "nombre": "Yelmo Cines Islazul",
        "direccion": "Calle de la Calderilla, 1, 28054 Madrid",
        "latitud": 40.369482,
        "longitud": -3.745678,
        "telefono": "914 801 000",
        "web": "https://yelmocines.es/cartelera/madrid/islazul",
        peliculas: [9]
    },
    {
        id: 19,
        "nombre": "Cines Callao",
        "direccion": "Plaza del Callao, 3, 28013 Madrid",
        "latitud": 40.419593,
        "longitud": -3.705722,
        "telefono": "915 472 606",
        "web": "https://www.cinescallao.es/",
        peliculas: [9]
    },
    {
        id: 20,
        "nombre": "Cinesa Príncipe Pío",
        "direccion": "Paseo de la Florida, s/n, 28008 Madrid",
        "latitud": 40.421265,
        "longitud": -3.718312,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Principe-Pio",
        peliculas: [9]
    },
    {
        id: 21,
        "nombre": "Cines Princesa",
        "direccion": "Calle de la Princesa, 3, 28008 Madrid",
        "latitud": 40.4263,
        "longitud": -3.7111,
        "telefono": "915 420 846",
        "web": "https://www.cinesrenoir.com/princesa/",
        peliculas: [9]
    },
    {
        id: 22,
        "nombre": "Cines Golem Madrid",
        "direccion": "Calle Martín de los Heros, 14, 28008 Madrid",
        "latitud": 40.4245,
        "longitud": -3.7123,
        "telefono": "915 428 756",
        "web": "https://www.golem.es/madrid/",
        peliculas: [9]
    },
    {
        id: 23,
        "nombre": "Cines Verdi Madrid",
        "direccion": "Calle de Bravo Murillo, 28, 28015 Madrid",
        "latitud": 40.4381,
        "longitud": -3.7035,
        "telefono": "914 458 246",
        "web": "https://www.cines-verdi.com/madrid/",
        peliculas: [9]
    },
    {
        id: 24,
        "nombre": "Cine Doré (Filmoteca Española)",
        "direccion": "Calle de Santa Isabel, 3, 28012 Madrid",
        "latitud": 40.4115,
        "longitud": -3.7009,
        "telefono": "913 690 681",
        "web": "http://www.culturaydeporte.gob.es/cultura/areas/cine/mc/fe/cine-dore.html",
        peliculas: [9]
    },
    {
        id: 25,
        "nombre": "Cines Renoir Retiro",
        "direccion": "Calle de Narváez, 42, 28009 Madrid",
        "latitud": 40.4212,
        "longitud": -3.6765,
        "telefono": "914 009 080",
        "web": "https://www.cinesrenoir.com/retiro/",
        peliculas: [9]
    },
    {
        id: 26,
        "nombre": "Cinesa Capitol",
        "direccion": "Calle Gran Vía, 41, 28013 Madrid",
        "latitud": 40.4196,
        "longitud": -3.7057,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Capitol",
        peliculas: [9]
    },
    {
        id: 27,
        "nombre": "Cinesa Manoteras",
        "direccion": "Avenida de Manoteras, 40, 28050 Madrid",
        "latitud": 40.4877,
        "longitud": -3.6699,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Manoteras",
        peliculas: [9]
    },
    {
        id: 28,
        "nombre": "Cinesa Méndez Álvaro",
        "direccion": "Calle Acanto, 2, 28045 Madrid",
        "latitud": 40.3943,
        "longitud": -3.6836,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Mendez-Alvaro",
        peliculas: [9]
    },
    {
        id: 29,
        "nombre": "Cinesa Proyecciones",
        "direccion": "Calle de Fuencarral, 136, 28010 Madrid",
        "latitud": 40.4331,
        "longitud": -3.7005,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Proyecciones",
        peliculas: [9]
    },
    {
        id: 30,
        "nombre": "Cinesa Príncipe Pío",
        "direccion": "Paseo de la Florida, s/n, 28008 Madrid",
        "latitud": 40.4213,
        "longitud": -3.7183,
        "telefono": "902 333 231",
        "web": "https://www.cinesa.es/Cines/Principe-Pio",
        peliculas: [9]
    }
];


//las he cogido de esta página que pone en filmaffinity cartelera en españa: https://www.filmaffinity.com/es/cat_new_th_es.html
const peliculas = [
    {
        id: 1,
        titulo: "Kraven the Hunter",
        horarios: ["12:00", "15:00", "18:00", "21:00"],
        imagen: "/movie-images-api/kraven.jpg",
        cines: [1, 2, 3],
        trailer: 'Xy8-OQbl-oM',
        sala: 'sala-xxl'

    },
    {
        id: 2,
        titulo: "La maldición del Queen Mary",
        horarios: ["13:00", "16:00", "19:00", "22:00"],
        imagen: "/movie-images-api/queen-mary.jpg",
        cines: [2, 3, 4, 5],
        trailer: 'NB8S5773yEY',
        sala: 'sala-xl'
    },
    {
        id: 3,
        titulo: "Niko: Más allá de la aurora boreal",
        horarios: ["14:00", "17:00", "20:00"],
        imagen: "/movie-images-api/niko.jpg",
        cines: [1, 3, 6, 7],
        trailer: 'lJjaCjVADwU',
        sala: 'sala-xl'
    },
    {
        id: 4,
        titulo: "El maestro del crimen",
        horarios: ["12:30", "15:30", "18:30", "21:30"],
        imagen: "/movie-images-api/maestro-del-crimen.png",
        cines: [2, 4, 6, 8],
        sala: 'sala-xl'
    },
    {
        id: 5,
        titulo: "Mariposas negras",
        horarios: ["13:30", "16:30", "19:30", "22:30"],
        imagen: "/movie-images-api/mariposas-negras.jpg",
        cines: [3, 5, 6, 9],
        trailer: 'NqWoXQFO-iQ',
        sala: 'sala-xl'
    },
    {
        id: 6,
        titulo: "Chaplin: Espíritu gitano",
        horarios: ["12:00", "14:30", "18:00", "21:00"],
        imagen: "/movie-images-api/chaplin.jpg",
        cines: [1, 4, 5, 10],
        trailer: 'PNXi828XYk0',
        sala: 'sala-xl'
    },
    {
        id: 7,
        titulo: "Moana 2",
        horarios: ["10:00", "13:00", "16:00", "19:00"],
        imagen: "/movie-images-api/moana-2.jpg",
        cines: [2, 4, 6, 7],
        trailer: 'O5lPAcMEKvE',
        sala: 'sala-xl'
    },
    {
        id: 8,
        titulo: "Pídeme lo que quieras",
        horarios: ["14:00", "17:00", "20:00", "22:00"],
        imagen: "/movie-images-api/pideme-lo-que-quieras.jpg",
        cines: [3, 5, 8, 9],
        trailer: 'vG89ig5P4g0',
        sala: 'sala-xl'
    },
    {
        id: 9,
        titulo: "Wicked",
        horarios: ["11:00", "15:00", "18:00", "20:30"],
        imagen: "/movie-images-api/wicked.jpg",
        cines: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        trailer: '6COmYeLsz4c',
        sala: 'sala-xl'
    },
    {
        id: 10,
        titulo: "Gladiator II",
        horarios: ["12:30", "16:30", "19:30", "22:30"],
        imagen: "/movie-images-api/gladiator-ii.jpg",
        cines: [2, 4, 7, 10],
        trailer: 'b8jnlQFzCxs',
        sala: 'sala-xl'
    },
    {
        id: 11,
        titulo: "Del Revés 2",
        horarios: ["10:30", "13:30", "16:30", "19:30"],
        imagen: "/movie-images-api/inside-out.jpeg",
        cines: [1, 5, 7, 8],
        trailer: 'ahogVfXzqs4',
        sala: 'sala-xl'
    },
    {
        id: 12,
        titulo: "Dune: Parte 2",
        horarios: ["12:00", "15:30", "19:00", "21:45"],
        imagen: "/movie-images-api/dune2.jpg",
        cines: [3, 4, 6, 10],
        trailer: 'Qv7I3wDfFzI',
        sala: 'sala-xl'
    },
    {
        id: 13,
        titulo: "Oppenheimer",
        horarios: ["13:00", "17:00", "20:00", "23:00"],
        imagen: "/movie-images-api/oppenheimer.jpg",
        cines: [1, 2, 6, 9],
        trailer: 'JpUd4BS7yI0',
        sala: 'sala-xl'
    },
    {
        id: 14,
        titulo: "Los Juegos del Hambre: Balada de Pájaros y Serpientes",
        horarios: ["11:30", "14:30", "17:30", "20:30"],
        imagen: "/movie-images-api/juegos-del-hambre.jpg",
        cines: [2, 3, 5, 8],
        trailer: 'IsBOCkBkom8',
        sala: 'sala-xl'
    },
    {
        id: 15,
        titulo: "Spider-Man: Cruzando el Multiverso",
        horarios: ["12:00", "15:00", "18:00", "21:00"],
        imagen: "/movie-images-api/spiderverse.jpg",
        cines: [4, 5, 7, 10],
        trailer: 'b_yMOiRgMmQ',
        sala: 'sala-xl'
    }
];

// Rutas de la API
// todos los cines
app.get('/api/cines', (req, res) => {
    res.json(cines);
});

//DETALLES CINE CON DETALLE DE PELÍCULAS
app.get('/api/cines/:id', (req, res) => {
    const cineId = parseInt(req.params.id);
    const cine = cines.find(c => c.id === cineId);

    if (cine) {
        const peliculasDelCine = peliculas.filter(p => cine.peliculas.includes(p.id));
        res.json({ ...cine, peliculas: peliculasDelCine });
    } else {
        res.status(404).json({ message: "Cine no encontrado" });
    }
});

// todas las pelis
app.get('/api/peliculas', (req, res) => {
    res.json(peliculas);
});

//DETALLES DE PELÍCULA CON DETALLE DE CINES
app.get('/api/peliculas/:id', (req, res) => {
    const peliculaId = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === peliculaId);

    if (pelicula) {
        //para la sala
        const salaDetalles = salas.find(s=> s.nombre === pelicula.sala)

        const cinesDeLaPelicula = cines.filter(c => pelicula.cines.includes(c.id));
        res.json({ ...pelicula, cines: cinesDeLaPelicula, sala: salaDetalles || {message: 'Sala no encontrada'} });
    } else {
        res.status(404).json({ message: "Película no encontrada" });
    }
});


// Configuración del puerto
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
