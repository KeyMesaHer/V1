import React, { useEffect, useState } from "react";
import { useTrainings } from "../context/TrainingsContext";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import ModalDeleteInfo from "../manners/ModalDeleteInfo";
import Navbar from "../components/Navbar";

const TrainingsPage = () => {
  const { trainings, getAllTrainings, deleteTraining } = useTrainings();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllTrainings();
  }, []);

  const openModal = (training) => {
    setSelectedTraining(training);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTraining(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedTraining) {
      deleteTraining(selectedTraining.id_entrenamiento);
      closeModal();
    }
  };

  // Filtrar entrenamientos según la búsqueda
  const filteredTrainings = trainings.filter((training) =>
    training.nombre_usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    training.area_laboral?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    training.agregar_informacion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-[#0170b8]">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Barra de búsqueda */}
        <div className="relative mb-6">
          <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-4 w-6 h-6 text-white" />
          <input
            type="text"
            className="w-full bg-transparent text-white pl-12 pr-4 py-2 border border-white rounded-full"
            placeholder="Buscar Información"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          {filteredTrainings.length === 0 ? (
            <p className="text-gray-300 text-center">No hay entrenamientos disponibles.</p>
          ) : (
            <table className="w-full border-separate border-spacing-0 text-left text-white overflow-hidden border border-white rounded-lg">
              <thead>
                <tr className="text-center">
                  <th className="px-3 py-2 border border-white">Usuario</th>
                  <th className="px-3 py-2 border border-white">Área Laboral</th>
                  <th className="px-3 py-2 border border-white">Información</th>
                  <th className="px-3 py-2 border border-white"></th>
                  <th className="px-3 py-2 border border-white"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainings.map((training) => (
                  <tr key={training.id_entrenamiento} className="hover:bg-gray-800 text-left">
                    <td className="px-3 py-2 border border-white">{training.nombre_usuario}</td>
                    <td className="px-3 py-2 border border-white">{training.area_laboral}</td>
                    <td className="px-3 py-2 border border-white">{training.agregar_informacion}</td>
                    <td className="px-2 py-2 border border-white text-center">
                      <button className="text-blue-400 hover:text-blue-600 focus:outline-none">
                        <FaEdit size={18} />
                      </button>
                    </td>
                    <td className="px-2 py-2 border border-white text-center">
                      <button
                        onClick={() => openModal(training)}
                        className="text-red-400 hover:text-red-600 focus:outline-none"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <ModalDeleteInfo isOpen={modalOpen} onClose={closeModal} onConfirm={handleDeleteConfirm} />
        </div>
      </div>
    </div>
  );
};

export default TrainingsPage;
