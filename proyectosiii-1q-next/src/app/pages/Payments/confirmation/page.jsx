"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ThankYouPage() {
    const paymentData = JSON.parse(localStorage.getItem("paymentData")) || {};
    const snacksCart = JSON.parse(localStorage.getItem("snacksCart")) || [];
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [reservationDetails, setReservationDetails] = useState({
        movie: "",
        date: "",
        time: "",
        seats: "",
        snacks: [],
        price: 0,
    });

    useEffect(() => {

        const storedDetails = {
            movie: paymentData.titulo || "Título de la Película",
            date: paymentData.date,
            time: paymentData.time || "HH:MM",
            discountType: paymentData.discountType,
            seats: paymentData.selectedSeats
                ? paymentData.selectedSeats.join(", ")
                : "Sin asientos seleccionados",
            snacks: snacksCart,
            price: paymentData.price || 0,
        };


        const storedMail = JSON.parse(localStorage.getItem("userData")) || [];

        if (storedMail) {
            setEmail(storedMail.email);
        }

        setReservationDetails(storedDetails);
    }, []);


    const handleDownload = async () => {
        const ticketHTML = `
    <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #ddd;
        background-color: white;
        color: black;
        line-height: 1.8;
        font-size: 25px;
    ">
        <!-- Encabezado -->
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #c00;">CINEFACIL</h2>
            <p style="margin: 0;">Calle Gran Vía, 123</p>
            <p style="margin: 0;">Madrid</p>
            <p style="margin: 0;">CIF: B12345678</p>
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">

        <!-- Información del ticket -->
        <div style="margin-bottom: 20px;">
            <p style="margin: 0;"><strong>TICKET:</strong> ${new Date().getFullYear()}/T/1</p>
            <p style="margin: 0;"><strong>Fecha:</strong> ${reservationDetails.date}</p>
            <p style="margin: 0;"><strong>Hora:</strong> ${reservationDetails.time}</p>
        </div>

        <hr style="Fborder: none; border-top: 1px solid #ddd; margin: 10px 0;">

        <!-- Detalles del concepto -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
            <thead>
                <tr>
                    <th style="text-align: left; border-bottom: 1px solid #ddd;">CONCEPTO</th>
                    <th style="text-align: right; border-bottom: 1px solid #ddd;">PVP</th>
                    <th style="text-align: right; border-bottom: 1px solid #ddd;">CANT.</th>
                    <th style="text-align: right; border-bottom: 1px solid #ddd;">TOTAL</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${reservationDetails.movie}</td>
                    <td style="text-align: right;">€${reservationDetails.price.toFixed(2)}</td>
                    <td style="text-align: right;">1</td>
                    <td style="text-align: right;">€${reservationDetails.price.toFixed(2)}</td>
                </tr>
                ${reservationDetails.snacks.length > 0
                ? reservationDetails.snacks
                    .map(
                        (snack) => `
                    <tr>
                        <td>${snack.name}</td>
                        <td style="text-align: right;">${snack.price}</td>
                        <td style="text-align: right;">1</td>
                        <td style="text-align: right;">${snack.price}</td>
                    </tr>`
                    )
                    .join("")
                : ""
            }
            </tbody>
        </table>

        <!-- Total -->
        <div style="text-align: right; font-size: 16px; margin-top: 10px;">
            <strong>TOTAL:</strong> €${reservationDetails.price.toFixed(2)}
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">

        <!-- Información adicional -->
        <div style="font-size: 20px; text-align: center;">
            <p style="margin: 0;">IVA incluido.</p>
            <p style="margin: 0;">Gracias por tu compra.</p>
        </div>
    </div>
    `;
        try {
            //contenedor temporal para el ticket
            const tempContainer = document.createElement("div");
            tempContainer.innerHTML = ticketHTML;
            document.body.appendChild(tempContainer);

            //html2canvas para convertir el ticket en una imagen
            const canvas = await html2canvas(tempContainer, {
                backgroundColor: null, // fondo transparente
                scale: 2, // aumenta calidad pdf
            });

            //conviertes la imagen en un pdf
            const pdf = new jsPDF("p", "mm", "a4");
            const imgData = canvas.toDataURL("image/png");

            //ajustar tamaño de la imagen al pdf
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("ticket.pdf");

            //elimino contenedor temporal
            document.body.removeChild(tempContainer);

            console.log("El ticket ha sido descargado como PDF");
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log("Sending email to:", email);
        setIsEmailSent(true);
    };

    const handleReturnHome = () => {
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] text-white p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl bg-[#1b1b28]/80 backdrop-blur-sm border border-[#3d3f50] rounded-2xl p-8 shadow-2xl animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-righteous text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    ¡Gracias por tu compra!
                </h1>

                <div className="space-y-6">
                    <p className="text-xl text-center text-purple-300">
                        Tu reserva ha sido confirmada. ¡Disfruta de la película!
                    </p>

                    <div className="reservation-details-content text-center p-6 bg-[#1b1b28]/80 backdrop-blur-sm border border-[#3d3f50] text-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-center text-purple-300 mb-6">
                            Detalles de la Reserva
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-[#3d3f50] pb-2">
                                <span className="font-medium text-purple-300">Película:</span>
                                <span className="text-white font-semibold">{reservationDetails.movie}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-[#3d3f50] pb-2">
                                <span className="font-medium text-purple-300">Fecha:</span>
                                <span className="text-white font-semibold">{reservationDetails.date}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-[#3d3f50] pb-2">
                                <span className="font-medium text-purple-300">Hora:</span>
                                <span className="text-white font-semibold">{reservationDetails.time}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-[#3d3f50] pb-2">
                                <span className="font-medium text-purple-300">Asientos:</span>
                                <span className="text-white font-semibold">{reservationDetails.seats}</span>
                            </div>
                            <div className="border-b border-[#3d3f50] pb-2">
                                <span className="font-medium text-purple-300 block mb-2">🍿 Snacks Comprados:</span>
                                {reservationDetails.snacks.length > 0 ? (
                                    <ul className="ml-4 list-disc space-y-1 text-white">
                                        {reservationDetails.snacks.map((snack, index) => (
                                            <li key={index} className="font-semibold">
                                                {snack.quantity || 1} x {snack.name} - {snack.price}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="text-white font-semibold">Ninguno</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center border-b border-[#3d3f50] pb-2">
                                <span className="font-medium text-purple-300">🏷️ Descuento:</span>
                                <span className="text-white font-semibold">
                                    {reservationDetails.discountType || "Ninguno"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-purple-300">Total:</span>
                                <span className="text-white font-semibold">
                                    €{reservationDetails.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleDownload}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        >
                            Descargar Ticket
                        </button>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingresa tu correo electrónico"
                                className="flex-grow bg-[#2c2e3e] text-white placeholder-gray-400 border border-[#3d3f50] rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                                readOnly={!!email} // Hace que sea de solo lectura si ya hay un correo
                            />
                                <button
                                    type="submit"
                                    className="bg-[#343b59] hover:bg-[#4a4a6a] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                                >
                                    Enviar Ticket por Correo
                                </button>
                        </div>
                    </form>

                    {isEmailSent && (
                        <p className="text-green-400 text-center animate-fade-in">
                            ¡El ticket ha sido enviado a tu correo electrónico!
                        </p>
                    )}

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleReturnHome}
                            className="bg-[#343b59] hover:bg-[#4a4a6a] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        >
                            Volver al Inicio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
