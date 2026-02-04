"use client";
import { useState, useEffect, useRef } from 'react';

export default function CinemaSnacks() {
    return (
        <div className='bg-[#343b59] h-screen'>
            <div className='animate-fade-in-up'>
                <section className="bg-[#1e2335] text-center py-5 font-parkinsans text-white">
                    <h2 className="purple-title text-[150px] ">Snacks de Cine</h2>
                    <h2 className="text-4xl font-bold mb-4">¡Deliciosos snacks para acompañar tu película!</h2>
                    <p className="text-lg">Disfruta de nuestras ofertas exclusivas en combos y aperitivos.</p>
                </section>

                <section id="promos" className="container mx-auto py-12 px-4">
                    <h3 className="text-3xl font-bold text-center mb-8 font-parkinsans text-white">
                        Ofertas en Snacks
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card
                            image="https://pbs.twimg.com/media/FKcljAsXsAAhvU4.jpg"
                            title="Nachos con Queso"
                            description="Un combo perfecto por 3,99€."
                            details="Unos crujientes nachos acompañados del queso más delicioso. ¡Perfectos para cualquier película!"
                            price="3.99€"
                        />
                        <Card
                            image="https://www.mashed.com/img/gallery/the-reason-you-should-skip-buying-hot-dogs-at-the-movie-theater/intro-1672875625.jpg"
                            title="Hot Dog Especial"
                            description="Prueba nuestro delicioso hot dog por 2,99€."
                            details="Sabroso pan con una jugosa salchicha acompañada de salsas al gusto. ¡Ideal para disfrutar en el cine!"
                            price="2.99€"
                        />
                        <Card
                            image="https://img.freepik.com/premium-photo/cinema-snack-bar-with-popcorn-soft-drinks-ai-generated_201606-6931.jpg"
                            title="Combo Dulce: Chocolate + Gaseosa"
                            description="Un toque dulce por solo 3,50€."
                            details="Un delicioso chocolate acompañado de tu gaseosa favorita. ¡La combinación perfecta para endulzar tu película!"
                            price="3.50€"
                        />
                        <Card
                            image="https://www.cinesa.es/media/4madr43q/los-mejores-menus-de-palomitas-cinesa.jpg"
                            title="Combo Familiar"
                            description="Palomitas grandes, dos refrescos y nachos por 9,99€."
                            details="El combo perfecto para disfrutar en familia. ¡Incluye palomitas grandes, dos refrescos y nachos con queso!"
                            price="9.99€"
                        />
                        <Card
                            image="https://www.cinesa.es/media/mwsnpahq/menu-de-cine-infantil-cinesa.jpg"
                            title="Combo Infantil"
                            description="Ideal para los peques por solo 2,50€."
                            details="Un combo hecho para los más pequeños: palomitas, un refresco pequeño y una sorpresa especial."
                            price="2.50€"
                        />
                        <Card
                            image="https://media.istockphoto.com/id/1152083418/es/foto/el-concepto-de-comida-para-el-cine-para-ver-una-pel%C3%ADcula-refresco-de-cola-fr%C3%ADa-con-hielo-en-un.jpg?s=612x612&w=0&k=20&c=tntcqVaz0N25otbJMwtHHhmSlNYZ-ZWIfxhu7TjVOyE="
                            title="Combo Palomitas + Refresco"
                            description="Disfruta del clásico combo por solo 4,99€."
                            details="Las clásicas palomitas de cine junto a tu refresco favorito. ¡Un clásico que nunca falla!"
                            price="4.99€"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

function Card({ image, title, description, details, price }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdded, setIsAdded] = useState(false); // Estado para controlar si se añadió al carrito
    const modalRef = useRef(null);

    const toggleInfo = () => setIsOpen(!isOpen);

    useEffect(() => {
        const isFirstLoad = localStorage.getItem('isFirstLoad');

        // Si es la primera vez que carga la página
        if (!isFirstLoad) {
            localStorage.removeItem('snacksCart'); // Elimina el 'snacksCart' del localStorage
            localStorage.setItem('isFirstLoad', 'false'); // Marca que la página ya se cargó
        }
        
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('snacksCart')) || [];

        const updatedCart = [
            ...existingCart,
            { name: title, price: price },
        ];

        localStorage.setItem('snacksCart', JSON.stringify(updatedCart));
        setIsAdded(true);
    };

    return (
        <>
            <div className="bg-[#1e2335] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
                <h4 className="text-xl font-semibold text-white mt-4">{title}</h4>
                <p className="text-lg text-white">{description}</p>

                <button
                    onClick={toggleInfo}
                    className="mt-4 bg-[#4F7D9F] text-white px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-[#3e6f8a]"
                >
                    {isOpen ? 'Cerrar' : 'Ver más'}
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div
                        ref={modalRef}
                        className="bg-[#1e2335] p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6 transition-transform transform hover:scale-105"
                    >
                        <h4 className="text-2xl font-bold text-white">{title}</h4>
                        <p className="text-white text-lg">{details}</p>
                        <p className="text-white text-lg font-semibold">Precio: {price}</p>

                        <div className="flex justify-center">
                            {isAdded ? (
                                <span className="mt-4 text-green-400 text-lg font-semibold">
                                    ¡Añadido al carrito!
                                </span>
                            ) : (
                                <button
                                    onClick={addToCart}
                                    className="mt-4 bg-[#4F7D9F] text-white px-8 py-3 rounded transition-transform transform hover:scale-105 hover:bg-[#3e6f8a]"
                                >
                                    Añadir al Carrito
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
