'use client';
import { useState, useEffect, useRef } from 'react';

export default function Promotions() {
    return (
        <div className='bg-[#343b59] h-screen'>
            <div className='animate-fade-in-up'>

                <section className="bg-[#1e2335] text-center py-5 font-parkinsans">
                     <h2 className="purple-title text-[150px]">Promociones</h2>
                    <h2 className="text-4xl font-bold mb-4">¡No te pierdas nuestras mejores ofertas!</h2>
                    <p className="text-lg">Compra tus boletos ahora y disfruta de los mejores precios.</p>
                </section>

                {/* Promociones */}
                <section id="promos" className="container mx-auto py-12 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <Card
                            image="https://www.cinesa.es/media/shxjprke/reservado-asset.jpg?width=365&height=235&v=1db197e36597e50&rxy=0.5%2C0.5"
                            title="Familia númerosa"
                            description="Presenta el carnet de familia numerosa en la entrada y recibe un 10% de descuento en cada boleto"
                            details="Cada integrante de la familia recibirá un 10% de descuento en su entrada, además de una fantástica tarde en familia. Es posible que se requiera presentar la documentación necesaria en taquilla."
                            discountType="10%"
                        />

                        {/* Card 2 */}
                        <Card
                            image="https://i.pinimg.com/736x/30/09/e1/3009e1378943cdeadede831fcdc858f6.jpg"
                            title="2x1 en Boletos"
                            description="Aprovecha el 2x1 todos los miércoles en funciones seleccionadas."
                            details="Todos los miércoles, compra 2 boletos por el precio de 1 en funciones seleccionadas. Oferta válida solo en horario vespertino."
                            discountType="2x1"
                        />

                        {/* Card 3 */}
                        <Card
                            image="https://www.littlebird.co.uk/blog/app/uploads/2016/01/kids-at-cinema.jpg"
                            title="Descuento Infantil"
                            description="Presenta una identificación de tu hijo o hija y obtén 20% de descuento en boletos y snacks."
                            details="Presentando una identificación infantil, obtendrás un 20% de descuento en boletos para menores de 12 años y en el combo infantil."
                            discountType="20%"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

function Card({ image, title, description, details, discountType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDiscountApplied, setIsDiscountApplied] = useState(false); // Estado para controlar el descuento
    const modalRef = useRef(null);

    const toggleInfo = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const applyDiscount = () => {
        const existingData = JSON.parse(localStorage.getItem('paymentData')) || {};

        // Actualizar con el tipo de descuento específico
        const updatedData = {
            ...existingData,
            discountType: discountType,
        };

        localStorage.setItem('paymentData', JSON.stringify(updatedData));

        // Actualizar estado para mostrar mensaje
        setIsDiscountApplied(true);
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

                        <div className="flex justify-center">
                            {isDiscountApplied ? (
                                <span className="mt-4 text-green-400 text-lg font-semibold">
                                    ¡Descuento aplicado!
                                </span>
                            ) : (
                                <button
                                    onClick={applyDiscount}
                                    className="mt-4 bg-[#4F7D9F] text-white px-8 py-3 rounded transition-transform transform hover:scale-105 hover:bg-[#3e6f8a]"
                                >
                                    Aplicar Descuento
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
