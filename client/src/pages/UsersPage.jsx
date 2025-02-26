import { useEffect, useState } from "react";
import { useUsers } from "../context/UsersContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaSearch, FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import usuario from "../assets/usuario.png";
import ModalDelete from "../manners/ModalDelete";
import ModalSearch from "../manners/ModalSearch";
import Navbar from "../components/Navbar";




const UsersPage = () => {
  const { getUsers, users, deleteUser } = useUsers();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState(null);




  // Eliminar
  const handleDeleteClick = (id) => {
    setUserIdToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    deleteUser(userIdToDelete);
    setModalOpen(false);
  };

  // Buscar
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };
  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm) ||
    user.cedula.includes(searchTerm) ||
    user.cargo.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm)
  );
  

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-[#0170b8]">
        <Navbar></Navbar>

      <div className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-left text-white overflow-hidden border border-white rounded-lg">
            <thead>
              <tr className="text-center">
                <th className="px-4 py-2 border border-white">Usuario</th>
                <th className="px-4 py-2 border border-white">Nombre</th>
                <th className="px-4 py-2 border border-white">Cédula</th>
                <th className="px-4 py-2 border border-white">Cargo</th>
                <th className="px-4 py-2 border border-white">Email</th>
                <th className="px-4 py-2 border border-white">Contraseña</th>
                <th className="px-4 py-2 border border-white">
                  <button className="text-white-400 hover:text-black">
                    <Link to="/register">
                      <FaUserPlus size={30} />
                    </Link>
                  </button>
                </th>
                <th className="px-4 py-2 border border-white">
                  <button
                    className="text-white-400 hover:text-black"
                    onClick={() => setSearchModalOpen(true)}
                  >
                    <FaSearch size={23} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-3 px-4 text-center">
                    No hay usuarios disponibles
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id_usuario} className="hover:bg-gray-800 text-center">
                    <td className="py-3 px-4 border-b">
                      <img src={usuario} alt="User" className="w-10 h-10 rounded-full mx-auto" />
                    </td>
                    <td className="px-4 py-2 border border-white">{user.nombre}</td>
                    <td className="px-4 py-2 border border-white">{user.cedula}</td>
                    <td className="px-4 py-2 border border-white">{user.cargo}</td>
                    <td className="px-4 py-2 border border-white">{user.email}</td>
                    <td className="px-4 py-2 border border-white">*****</td>
                    <td className="px-4 py-2 border border-white">
                      <button className="text-blue-400 hover:text-blue-600 mx-2">
                        <Link to={`/user/${user.id_usuario}`}>
                          <FaEdit size={20} />
                        </Link>
                      </button>
                    </td>
                    <td className="px-4 py-2 border border-white">
                      <button className="text-red-400 hover:text-red-600 transition"
                        onClick={() => handleDeleteClick(user.id_usuario)}>
                        <FaTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

          {/* Regresar a los usuarios */}
          {searchTerm && (
            <div className="text-left px-15 mt-2">
              <button 
                onClick={() => setSearchTerm("")} 
                className="text-white-400 hover:text-blue-600 transition underline">
                ← Ver todo
              </button>
            </div>
          )}

      {/* Modal para eliminar usuario */}
      <ModalDelete
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Modal de búsqueda */}
      <ModalSearch
  isOpen={searchModalOpen}
  onClose={() => setSearchModalOpen(false)}
  onSearch={handleSearch} 
/>
    </div>
  );
};

export default UsersPage;
