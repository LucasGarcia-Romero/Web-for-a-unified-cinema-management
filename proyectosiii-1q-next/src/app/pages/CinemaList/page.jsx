"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const puertoApi = 3001;

export default function ListadoCines() {
    const router = useRouter();
    const [cines, setCines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:${puertoApi}/api/cines`)
            .then((response) => response.json())
            .then((data) => {
                setCines(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al cargar cines:", error);
                setLoading(false);
            });
    }, []);

    const seleccionarCine = (cine) => {
        router.push(`/pages/CinemaList/${cine.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] text-white p-6 flex flex-col items-center">
            <h2 className="animate-fade-in-up purple-title text-[150px]">
                CINES
            </h2>

            {loading ? (
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl animate-fade-in-up">
                    {cines.map((cine) => (
                        <div
                            key={cine.id}
                            onClick={() => seleccionarCine(cine)}
                            className="group flex flex-col items-center justify-center bg-[#1b1b28]/80 backdrop-blur-sm border border-[#3d3f50] rounded-2xl p-8 cursor-pointer hover:bg-[#2c2e3e] hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            <h3 className="text-xl font-semibold text-purple-300 text-center group-hover:text-white transition-colors duration-300">
                                {cine.nombre}
                            </h3>
                            <div className="mt-4 w-12 h-1 bg-purple-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        </div>
                    ))}
                </div>
            )}

            {cines.length === 0 && !loading && (
                <p className="text-xl text-gray-400 mt-8 animate-fade-in-up">
                    No se encontraron cines disponibles.
                </p>
            )}
        </div>
    );
}

