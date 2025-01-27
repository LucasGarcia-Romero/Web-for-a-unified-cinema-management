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

// Leer el archivo salas.json
const salas = JSON.parse(fs.readFileSync('salas.json', 'utf-8'));

// Cines sin duplicados (se ha mantenido el primero de cada cine duplicado)
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
        peliculas: [1, 2, 3, 5, 8, 9, 12, 14]
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
    }
];

// Películas con IDs de cine ajustados para eliminar duplicados
const peliculas = [
    {
        id: 1,
        titulo: "Kraven the Hunter",
        horarios: ["12:00", "15:00", "18:00", "21:00"],
        imagen: "/movie-images-api/kraven.jpg",
        cines: [1, 2, 3],
        trailer: 'Xy8-OQbl-oM',
        sala: 'sala-xxl',
        duracion: 120,
        descripcion: "Es la historia sobre cómo y por qué uno de los más icónicos villanos de Marvel llegó a serlo. Kraven (Aaron Taylor-Johnson) es un hombre cuya compleja relación con su despiadado padre, Nikolai Kravinoff (Russell Crowe), le hace emprender un camino de venganza con brutales consecuencias, motivándole a convertirse no sólo en el mejor cazador del mundo, sino también en uno de los más temidos"
    },
    {
        id: 2,
        titulo: "La maldición del Queen Mary",
        horarios: ["13:00", "16:00", "19:00", "22:00"],
        imagen: "/movie-images-api/queen-mary.jpg",
        cines: [2, 3, 4, 5],
        trailer: 'NB8S5773yEY',
        sala: 'sala-xl',
        duracion: 130,
        descripcion: "Una familia se embarca en el transatlántico Queen Mary, conocido por su reputación de estar embrujado, donde enfrentan sucesos aterradores relacionados con el oscuro pasado del barco"

    },
    {
        id: 3,
        titulo: "Niko: Más allá de la aurora boreal",
        horarios: ["14:00", "17:00", "20:00"],
        imagen: "/movie-images-api/niko.jpg",
        cines: [1, 3, 6, 7],
        trailer: 'lJjaCjVADwU',
        sala: 'sala-xl',
        duracion: 126,
        descripcion: "Niko, un joven reno volador, sueña con unirse al equipo del trineo de Santa Claus. Cuando accidentalmente pierde el trineo, su persecución para recuperarlo le enseña sobre la amistad y ser fiel a sí mismo"
    },
    {
        id: 4,
        titulo: "El maestro del crimen",
        horarios: ["12:30", "15:30", "18:30", "21:30"],
        imagen: "/movie-images-api/maestro-del-crimen.png",
        cines: [2, 4, 6, 8],
        sala: 'sala-xl',
        duracion: 90,
        descripcion: "Danny Dolinski (Christoph Waltz) es un veterano sicario que, pese a estar a punto de retirarse, está convencido de que sigue siendo el mejor en su trabajo. La compañía para la que trabajaba vuelve a llamarlo con una nueva misión: entrenar a Wihlborg (Cooper Hoffman), un joven prodigio recién llegado. Aunque al principio no lograrán entenderse, tendrán que unir sus habilidades para descubrir la verdad que se esconde tras la organización para la que trabajan"
    },
    {
        id: 5,
        titulo: "Mariposas negras",
        horarios: ["13:30", "16:30", "19:30", "22:30"],
        imagen: "/movie-images-api/mariposas-negras.jpg",
        cines: [3, 5, 6, 9],
        trailer: 'NqWoXQFO-iQ',
        sala: 'sala-xl',
        duracion: 120,
        descripcion: "Inspirada por mujeres reales, propone un viaje desde África, el Caribe y Asia hacia un incierto futuro para la humanidad. El cambio climático impacta en las vidas de Tanit, Valeria y Shaila, tres mujeres de puntos muy distintos del planeta pero con algo en común: las tres lo pierden todo por el efecto del calentamiento global y se ven forzadas a migrar"

    },
    {
        id: 6,
        titulo: "Chaplin: Espíritu gitano",
        horarios: ["12:00", "14:30", "18:00", "21:00"],
        imagen: "/movie-images-api/chaplin.jpg",
        cines: [1, 4, 5, 10],
        trailer: 'PNXi828XYk0',
        sala: 'sala-xl',
        duracion: 150,
        descripcion: "Con entrevistas exclusivas y un acceso sin precedentes al legado de Chaplin, la película es una exploración reveladora de su herencia romaní, construida a partir de entrevistas íntimas, extractos de filmes, películas caseras y contribuciones de renombrados artistas romaníes contemporáneos"
    },
    {
        id: 7,
        titulo: "Moana 2",
        horarios: ["10:00", "13:00", "16:00", "19:00"],
        imagen: "/movie-images-api/moana-2.jpg",
        cines: [2, 4, 6, 7],
        trailer: 'O5lPAcMEKvE',
        sala: 'sala-xl',
        duracion: 110,
        descripcion: "Tras recibir una inesperada llamada de sus antepasados, Vaiana debe viajar a los lejanos mares de Oceanía y adentrarse en peligrosas aguas perdidas para vivir una aventura sin precedentes. Secuela de Vaiana"
    },
    {
        id: 8,
        titulo: "Pídeme lo que quieras",
        horarios: ["14:00", "17:00", "20:00", "22:00"],
        imagen: "/movie-images-api/pideme-lo-que-quieras.jpg",
        cines: [3, 5, 8, 9],
        trailer: 'vG89ig5P4g0',
        sala: 'sala-xl',
        duracion: 100,
        descripcion: "Tras la muerte de su padre, Eric Zimmerman viaja a España, donde conoce a Judith, una joven con la que comienza una relación basada en juegos sexuales y fantasías, explorando las dinámicas de poder entre dominantes y sumisos"
    },
    {
        id: 9,
        titulo: "Wicked",
        horarios: ["11:00", "15:00", "18:00", "20:30"],
        imagen: "/movie-images-api/wicked.jpg",
        // Lista de cines sin duplicados
        cines: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 21, 22, 24, 25, 26],
        trailer: '6COmYeLsz4c',
        sala: 'sala-xl',
        duracion: 90,
        descripcion: "Wicked cuenta la historia de Elphaba, una joven de piel verde con un gran poder, y Glinda, una joven privilegiada y ambiciosa. En la Universidad Shiz, en la Tierra de Oz, forman una inesperada amistad que redefine sus vidas, explorando los eventos previos a la llegada de Dorothy Gale"
    },
    {
        id: 10,
        titulo: "Gladiator II",
        horarios: ["12:30", "16:30", "19:30", "22:30"],
        imagen: "/movie-images-api/gladiator-ii.jpg",
        cines: [2, 4, 7, 10],
        trailer: 'b8jnlQFzCxs',
        sala: 'sala-xl',
        duracion: 95,
        descripcion: "Dieciséis años después de la muerte de Marco Aurelio, Roma está gobernada por los emperadores gemelos Geta y Caracalla. Lucio Vero, nieto de Aurelio, vive oculto como Hanno en Numidia con su esposa Arishat. Tras la invasión romana liderada por el general Acacio, Lucio es esclavizado y llevado a Ostia, donde un maestro de cuadra le promete venganza si gana suficientes combates en el Coliseo"
    },
    {
        id: 11,
        titulo: "Del Revés 2",
        horarios: ["10:30", "13:30", "16:30", "19:30"],
        imagen: "/movie-images-api/inside-out.jpeg",
        cines: [1, 5, 7, 8],
        trailer: 'ahogVfXzqs4',
        sala: 'sala-xl',
        duracion: 150,
        descripcion: "En la secuela de Inside Out, Riley enfrenta la adolescencia, lo que provoca una reforma en el Cuartel General de su mente. Las emociones clásicas (Alegría, Tristeza, Ira, Miedo y Asco) deben adaptarse a la llegada de nuevas emociones propias de la pubertad: Ansiedad, Envidia, Vergüenza y Aburrimiento"
    },
    {
        id: 12,
        titulo: "Dune: Parte 2",
        horarios: ["12:00", "15:30", "19:00", "21:45"],
        imagen: "/movie-images-api/dune2.jpg",
        cines: [3, 4, 6, 10],
        trailer: 'Qv7I3wDfFzI',
        sala: 'sala-xl',
        duracion: 110,
        descripcion: "Tras los sucesos de la primera parte acontecidos en el planeta Arrakis, el joven Paul Atreides se une a la tribu de los Fremen y comienza un viaje espiritual y marcial para convertirse en mesías, mientras intenta evitar el horrible pero inevitable futuro que ha presenciado: una Guerra Santa en su nombre, que se extiende por todo el universo conocido... Secuela de 'Dune' (2021)"
    },
    {
        id: 13,
        titulo: "Oppenheimer",
        horarios: ["13:00", "17:00", "20:00", "23:00"],
        imagen: "/movie-images-api/oppenheimer.jpg",
        cines: [1, 2, 6, 9],
        trailer: 'JpUd4BS7yI0',
        sala: 'sala-xl',
        duracion: 130,
        descripcion: "En tiempos de guerra, el brillante físico estadounidense Julius Robert Oppenheimer, al frente del 'Proyecto Manhattan', lidera los ensayos nucleares para construir la bomba atómica para su país. Impactado por su poder destructivo, Oppenheimer se cuestiona las consecuencias morales de su creación. Desde entonces y el resto de su vida, se opondría firmemente al uso de armas nucleares"
    },
    {
        id: 14,
        titulo: "Balada de Pájaros y Serpientes",
        horarios: ["11:30", "14:30", "17:30", "20:30"],
        imagen: "/movie-images-api/juegos-del-hambre.jpg",
        cines: [2, 3, 5, 8],
        trailer: 'IsBOCkBkom8',
        sala: 'sala-xl',
        duracion: 100,
        descripcion: "En un Panem postapocalíptico, el joven Coriolanus Snow es mentor de Lucy Gray Baird, del empobrecido Distrito 12, durante los Décimos Juegos del Hambre. Ella sorprende cantando en la ceremonia, mientras Snow intenta usar su talento para sobrevivir"
    },
    {
        id: 15,
        titulo: "Spider-Man: Cruzando el Multiverso",
        horarios: ["12:00", "15:00", "18:00", "21:00"],
        imagen: "/movie-images-api/spiderverse.jpg",
        cines: [4, 5, 7, 10],
        trailer: 'b_yMOiRgMmQ',
        sala: 'sala-xl',
        duracion: 85,
        descripcion: "Miles Morales, tras reencontrarse con Gwen Stacy, es catapultado al Multiverso, donde se une a un equipo de Spider-Men para proteger su existencia. Al enfrentarse a una nueva amenaza, Miles debe redefinir lo que significa ser un héroe para salvar a sus seres queridos"
    }
];

// Rutas de la API
// todos los cines
app.get('/api/cines', (req, res) => {
    res.json(cines);
});

// DETALLES CINE CON DETALLE DE PELÍCULAS
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

// DETALLES DE PELÍCULA CON DETALLE DE CINES
app.get('/api/peliculas/:id', (req, res) => {
    const peliculaId = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === peliculaId);

    if (pelicula) {
        const salaDetalles = salas.find(s => s.nombre === pelicula.sala);
        const cinesDeLaPelicula = cines.filter(c => pelicula.cines.includes(c.id));
        res.json({ ...pelicula, cines: cinesDeLaPelicula, sala: salaDetalles || { message: 'Sala no encontrada' } });
    } else {
        res.status(404).json({ message: "Película no encontrada" });
    }
});

// Configuración del puerto
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
