import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logoblanco.png";




const Navbar = () => {
      const { user } = useAuth();
      const [isOpen, setIsOpen] = useState(false);
      const { logout } = useAuth();
  return (
    <div>
              {/* HEADER */}
              <header className="bg-black text-white py-1 px-8">
                <div className="container mx-auto flex justify-between items-center">
                  {/* Logo */}
                  <img
                    className="w-[10vw] h-auto min-w-[50px] max-w-[100px] object-contain"
                    src={logo}
                    alt="Logo"
                  />
        
                  <div className="hidden md:flex space-x-4 items-center">
                    <Link to="/admin" className="hover:text-gray-300">Inicio</Link>
                    <Link to="/users" className="hover:text-gray-300">Gestión de usuarios</Link>
                    <Link to={`/user/trainings/${user.id_usuario}`} className="hover:text-gray-300">Información</Link>
                    <Link to="/trainings" className="hover:text-gray-300">Conocimientos</Link>
                  </div>
        
                  {/* Menú móvil + Usuario */}
                  <div className="flex items-center gap-3">
                    {/* Botón Menú (Siempre visible) */}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="p-2 text-white rounded-lg hover:bg-gray-600"
                    >
                      <IoMenu className="text-2xl" />
                    </button>
        
                    {/* Icono Usuario */}
                    <FaUserCircle className="text-5xl text-white" />
                  </div>
                </div>
        
                {/* Menú desplegable */}
                {isOpen && (
                  <div className="absolute w-full left-0 bg-black shadow-lg mt-2 md:hidden">
                    <ul className="flex flex-col text-center py-2">
                      <li className="hover:bg-gray-600 py-2">
                        <Link to="/admin">Inicio</Link>
                      </li>
                      <li className="hover:bg-blue-600 py-2">
                        <Link to="/users">Gestión de usuarios</Link>
                      </li>
                      <li className="hover:bg-gray-600 py-2">
                      <Link to={`/user/trainings/${user.id_usuario}`}>Información</Link>
                      </li>
                      <li className="hover:bg-gray-600 py-2">
                        <Link to="/trainings">Conocimientos</Link>
                      </li>
                      <li className="hover:bg-gray-600 py-2">
                        <a href="#">Instrucciones de uso</a>
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          className="block w-full text-center px-4 py-2 text-red-600 hover:bg-gray-600"
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
        
                {isOpen && (
                  <div className="absolute right-8 bg-black shadow-lg mt--2   hidden md:block">
                    <ul className="text-center py-2">
                      <li className="hover:bg-gray-600 py-1 px-4">
                        <a href="#">Instrucciones de uso</a>
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          className="block w-full text-center px-4 py-2 text-red-600 hover:bg-gray-600"
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </header>
              </div>

  )
}

export default Navbar
