'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const paymentMethods = [
    { label: 'Tarjeta Bancaria', path: '/pages/Payments/components/Card' },
    { label: 'Bizum', path: '/pages/Payments/components/Bizum' },
    { label: 'Transferencia Bancaria', path: '/pages/Payments/components/BankTransfer' },
    { label: 'Paypal', path: '/pages/Payments/components/Paypal' },
];

export default function Payment() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Obtener el valor del precio de la URL
    const price = searchParams.get('price') || 0; // Si no está definido, usa 0 como predeterminado

    const handleNavigation = (path) => {
        // Pasar el precio como parámetro a la nueva ruta
        router.push(`${path}?price=${price}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] text-white p-6 flex flex-col items-center" >
            <div className='animate-fade-in-up'>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-righteous mt-20 mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Método de Pago
            </h1>
    
            <div className="mt-10 w-full max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {paymentMethods.map((method, index) => (
                        <button
                            key={index}
                            className="bg-[#1b1b28] hover:bg-[#2c2e3e] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 border border-[#3d3f50] shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onClick={() => handleNavigation(method.path)}
                        >
                            {method.label}
                        </button>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
    
}
