"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa"; // Ícono de eliminar

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [snacksCart, setSnacksCart] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0); // Establecer un valor inicial

  const [mail, setMail] = useState([]);

  useEffect(() => {
    // Recuperar las películas almacenadas en el localStorage
    const storedPaymentData = JSON.parse(localStorage.getItem("paymentData")) || [];
    const storedSnacksData = JSON.parse(localStorage.getItem("snacksCart")) || [];
    // Si hay una película almacenada, establecerla directamente
    if (storedPaymentData.length !== 0) {
      const pelicula = storedPaymentData; // Solo hay una película
      setCartItems([
        {
          id: pelicula.id,
          nombre: pelicula.titulo,
          precio: pelicula.price,
          tipo: "pelicula",
        },
      ]);
      // Actualizar el ticketPrice dentro de useEffect
      setTicketPrice(pelicula.price);
    }

    // Agrupar los snacks por nombre y contar la cantidad
    const groupedSnacks = storedSnacksData.reduce((acc, snack) => {
      const existingSnack = acc.find(s => s.name === snack.name);
      if (existingSnack) {
        existingSnack.quantity += 1;
      } else {
        acc.push({ ...snack, quantity: 1 });
      }
      return acc;
    }, []);

    setSnacksCart(groupedSnacks);
  }, []); // El useEffect se ejecuta una sola vez cuando el componente se monta

  // Función para eliminar un producto del carrito
  const removeFromCart = (id, type) => {
    if (type === "pelicula") {
      setCartItems([]); // Limpiar las películas
      localStorage.setItem("paymentData", JSON.stringify([]));
    } else {
      const updatedSnacks = snacksCart.filter(snack => snack.name !== id);
      setSnacksCart(updatedSnacks);
      localStorage.setItem("snacksCart", JSON.stringify(updatedSnacks));
    }
  };

  // Calcular el total de snacks (Asegurarse de que cada snack tenga un precio)
  const calculateSnacksTotal = () => {
    return snacksCart.reduce((total, snack) => {
      const price = parseFloat(snack.price.replace('€', '').replace('$', '')) || 0;
      return total + price * snack.quantity;
    }, 0);
  };

  // Total general
  const total = (ticketPrice + calculateSnacksTotal()).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1c2c] to-[#2c2e3e] text-white p-6 flex flex-col items-center">
      <h2 className="pink-title text-[100px] animate-fade-in-up">
        TU CARRITO
      </h2>

      <div className="bg-[#1b1b28]/80 backdrop-blur-sm border border-[#3d3f50] rounded-2xl p-8 w-full max-w-7xl animate-fade-in-up">
        {cartItems.length === 0 && snacksCart.length === 0 ? (
          <p className="text-xl text-gray-400 mt-8">No tienes productos en tu carrito.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Películas</h3>
                {cartItems.map((item, key) => (
                  <div
                    key={`${item.id}-${key}`}
                    className="flex items-center justify-between p-4 bg-[#2c2e3e] rounded-xl hover:bg-[#3d3f50] transition-all duration-300"
                  >
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold">{item.nombre}</p>
                      <p className="text-sm">Precio: ${item.precio}</p>
                    </div>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => removeFromCart(item.id, "pelicula")}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {snacksCart.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Comidas</h3>
                {snacksCart.map((snack, index) => (
                  <div
                    key={`${snack.name}-${snack.quantity}-${index}`}
                    className="flex items-center justify-between p-4 bg-[#2c2e3e] rounded-xl hover:bg-[#3d3f50] transition-all duration-300"
                  >
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold">{snack.name}</p>
                      <p className="text-sm">Cantidad: {snack.quantity}</p>
                    </div>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => removeFromCart(snack.name, "snack")}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-between items-center">
              <p className="text-2xl font-semibold">Total: ${total}</p>
              <button
                onClick={() => router.push("/pages/Payments")}
                className="bg-pink-400 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition-all duration-300"
              >
                Proceder al pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
