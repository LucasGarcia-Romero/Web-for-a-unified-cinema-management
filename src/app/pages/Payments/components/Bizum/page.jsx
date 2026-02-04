'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CardPaymentForm() {
    const searchParams = useSearchParams();

    // Obtener el valor del precio de la URL
    const price = searchParams.get('price') || 0; // Si no está definido, usa 0 como predeterminado

    const router = useRouter();
    const [formData, setFormData] = useState({
        numTel: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError(''); // Limpiar el error cuando el usuario modifica el campo
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación del número de teléfono
        const phoneRegex = /^[+]?[0-9]{9,15}$/; // Permite números con o sin el símbolo "+" y entre 9 y 15 dígitos
        if (!phoneRegex.test(formData.numTel)) {
            setError('Por favor, introduce un número de teléfono válido');
            return;
        }

        console.log('Form submitted:', formData);
        // router.push(`/pages/Payments/components/Checkout?paymentmethod=Bizum: ${formData.numTel}`);
        router.push('/pages/Payments/confirmation');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] text-white p-6 flex flex-col items-center">
            <h2 className="animate-fade-in-up text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-righteous mt-20 mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Bizum
            </h2>
            <form
                className="animate-fade-in-up w-full max-w-lg bg-[#1b1b28] p-8 rounded-2xl shadow-xl border border-[#3d3f50] space-y-6"
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="numTel" className="block text-lg font-medium mb-2 text-purple-300">
                        Número de Teléfono
                    </label>
                    <input
                        type="tel"
                        id="numTel"
                        name="numTel"
                        value={formData.numTel}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-[#3d3f50] bg-[#2c2e3e] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="+34 555 555 555"
                        required
                    />
                    {error && (
                        <div className="mt-2 text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    Confirmación de Pago
                </button>
            </form>
        </div>
    );
    
}
