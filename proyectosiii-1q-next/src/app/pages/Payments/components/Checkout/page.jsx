'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Receipt() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('paymentmethod') || 'N/A';
  const paymentData = JSON.parse(localStorage.getItem('paymentData')) || {};
  const [snacksCart, setSnacksCart] = useState([]);

  const discountType = paymentData.discountType || ''; // Tipo de descuento: '2x1', '20%', etc.

  useEffect(() => {
    // Recupera los snacks del carrito desde localStorage
    const cartData = JSON.parse(localStorage.getItem('snacksCart')) || [];

    // Agrupar los snacks por nombre y contar la cantidad
    const groupedSnacks = cartData.reduce((acc, snack) => {
      const existingSnack = acc.find(s => s.name === snack.name);
      if (existingSnack) {
        existingSnack.quantity += 1;
      } else {
        acc.push({ ...snack, quantity: 1 });
      }
      return acc;
    }, []);

    setSnacksCart(groupedSnacks);
  }, []);

  // Función para calcular el descuento
  const calculateDiscountedPrice = (price, quantity, discountType) => {
    let discountedPrice = price * quantity;

    if (discountType === '2x1' && quantity >= 2) {
      if (quantity % 2 === 0) {
        discountedPrice = (price * quantity) / 2;
      } else {
        discountedPrice = price * (Math.ceil(quantity / 2) + 1);
      }
    } else if (discountType === '20%') {
      discountedPrice *= 0.8;
    } else if (discountType === '10%') {
      discountedPrice *= 0.9;
    }

    return discountedPrice;
  };

  const generateOrderCode = () => {
    return Math.random().toString().substring(2, 6);
  };

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).toUpperCase()}`;
  };

  const calculateSnacksTotal = () => {
    return snacksCart.reduce((total, snack) => {
      const price = parseFloat(snack.price.replace('€', '').replace('$', '')) || 0;
      return total + price;
    }, 0);
  };
  
  const quantity = paymentData.selectedSeats?.length || 1; // Número de entradas
  const originalPrice = paymentData.price || 0; // Precio de una entrada
  const discountedPrice = calculateDiscountedPrice(originalPrice, quantity, discountType); // Precio con descuento

  return (
    <div className="min-h-screen bg-[#343b59] flex items-center justify-center p-6">
      <div
        className="p-6 w-full max-w-[400px] font-mono text-sm leading-relaxed text-black"
        style={{
          backgroundImage: 'url("/imagenes/ticket.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center mb-6">
          <div className="text-2xl font-extrabold text-black">CINEFACIL</div>
        </div>

        {/* Información de entradas */}
        <div className="mb-6 text-black space-y-1">
          <div className="text-xl font-semibold">ORDER #{generateOrderCode()} FOR {paymentData.cardHolder || 'CUSTOMER'}</div>
          <div className="text-lg">{getCurrentDate()}</div>
        </div>

        <div className="border-t border-b border-black py-4 mb-6">
          <div className="flex mb-3 text-black text-lg">
            <div className="w-16">QTY</div>
            <div className="flex-grow">ITEM</div>
            <div className="w-20">HOUR</div>
            <div className="w-24 text-right">AMT</div>
          </div>

          {/* Película */}
          <div className="flex text-black text-lg">
            <div className="w-16">{quantity}</div>
            <div className="flex-grow">{paymentData.movie || 'MOVIE'}</div>
            <div className="w-20">{paymentData.time || '00:00'}</div>
            <div className="w-24 text-right">${originalPrice.toFixed(2) || '0.00'}</div>
          </div>

          {/* Snacks */}
          {snacksCart.length > 0 && snacksCart.map((snack, index) => (
            <div key={index} className="flex text-black text-lg">
              <div className="w-16">{snack.quantity}</div> {/* Muestra la cantidad de cada snack */}
              <div className="flex-grow">{snack.name}</div>
              <div className="w-20">-</div> {/* No hay hora para los snacks */}
              <div className="w-24 text-right">{snack.price}</div>
            </div>
          ))}
        </div>

        {/* Descuentos en entradas */}
        {discountType === '10%' && quantity >= 2 && (
          <div className="mb-6">
            <div className="flex justify-between text-black text-lg">
              <div>BIG FAMILY DISCOUNT(10%):</div>
              <div>-${(originalPrice * quantity * 0.1).toFixed(2)}</div>
            </div>
          </div>
        )}
        {discountType === '2x1' && quantity >= 2 && (
          <div className="mb-6">
            <div className="flex justify-between text-black text-lg">
              <div>2X1 DISCOUNT:</div>
              <div>-${(originalPrice * Math.floor(quantity / 2)).toFixed(2)}</div>
            </div>
          </div>
        )}
        {discountType === '20%' && (
          <div className="mb-6">
            <div className="flex justify-between text-black text-lg">
              <div>KIDS DISCOUNT(20%):</div>
              <div>-${(originalPrice * quantity * 0.2).toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* Total Final */}
        <div className="mb-6">
          <div className="flex justify-between font-bold text-black text-xl">
            <div>FINAL TOTAL:</div>
            <div>${(discountedPrice + calculateSnacksTotal()).toFixed(2)}</div>
          </div>
        </div>

        <div className="mb-6 text-black space-y-1">
          <div className="text-lg">PAYMENT METHOD:</div>
          <div className="text-lg">{paymentMethod}</div>
          <div className="text-lg">AUTH CODE: {generateOrderCode()}</div>
        </div>

        <div className="text-center mt-6 space-y-2">
          <div className="text-black text-lg">THANK YOU FOR VISITING!</div>
          <div className="text-xs text-black mt-2">buy.cinefacil.com</div>
        </div>
      </div>
    </div>
  );
}
