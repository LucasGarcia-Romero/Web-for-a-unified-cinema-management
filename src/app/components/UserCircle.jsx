import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '@/app/components/Loading';

export default function UserCircle() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);

    const toggleUserMenu = (e) => {
        e.stopPropagation();
        setUserMenuOpen(!userMenuOpen);
    };

    const closeUserMenu = () => {
        setUserMenuOpen(false);
    };

    const handleLogout = async () => {
        localStorage.removeItem('userData');
        setUser(null);
        window.location.href = '/';
    };

    useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem('userData'));

        if(userLocal){
            setUser(userLocal);
            console.log(userLocal);
        }
    },[]);


    return (
        !user ? (
            <div className="flex justify-center items-center h-1">
                <div className="loader border-t-4 border-blue-500 rounded-full w-5 h-5 animate-spin"></div>
            </div>) : (
            <div className='flex gap-4 mt-3'>
                <div className="relative">
                    <button
                        onClick={(e) => toggleUserMenu(e)}
                        className="relative z-auto w-10 h-10 rounded-full overflow-hidden focus:outline-none ring-2 ring-blue-500 transform transition-transform duration-200 hover:scale-105"
                        aria-label="User menu"
                    >
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/10542/10542486.png"}
                            alt="Avatar"
                            className="object-cover w-full h-full"
                        />
                    </button>
                    {/* <p className='text-black'>{user.mail}</p> */}

                    <div
                        className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 transform transition-all duration-300 origin-top-right ${userMenuOpen
                            ? 'scale-100 opacity-100 translate-y-0'
                            : 'scale-95 opacity-0 -translate-y-2 pointer-events-none'
                            }`}
                    >
                        <Link
                            href="/pages/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                        >
                            Perfil
                        </Link>
                        <Link
                            href="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                            onClick={() => handleLogout()}
                        >
                            Cerrar Sesión
                        </Link>
                    </div>
                </div>
            </div>

        )


    );
}
