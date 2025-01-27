
import Link from 'next/link';

export default function PromoCard ({ image, title, description }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 hover-grow font-parkinsans">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h4 className="text-xl font-bold mb-2">{title}</h4>
                <p className="text-gray-300 mb-4">{description}</p>
                <Link
                    href="#"
                    className="bg-[#494fa3] text-black px-4 py-2 rounded-md font-semibold transform transition duration-300 hover:bg-yellow-600"
                >
                    Ver más
                </Link>
            </div>
        </div>
    );
};