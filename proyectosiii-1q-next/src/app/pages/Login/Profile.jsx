import React from "react";

const Profile = ({ user, onLogout }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-xl font-bold mb-4">
          Bienvenido, <span className="text-blue-500">{user.email}</span>!
        </h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
