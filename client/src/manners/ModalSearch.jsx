import { useState } from "react";
import Modal from "react-modal";
import { FiSearch } from "react-icons/fi";

const ModalSearch = ({ isOpen, onClose, onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchClick = () => {
    onSearch(searchInput); // Pasar el valor al padre
    onClose(); // Cerrar el modal después de buscar
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="flex justify-center items-center min-h-screen"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      style={{
        overlay: { backgroundColor: "rgb(255, 255, 255, 0.5)" },
      }}
    >
      <div className="p-6 rounded-lg text-white w-150 ">
        <div className="flex items-center border border-gray-300 rounded-full p-3 bg-white">
          <input
            type="text"
            placeholder="Buscar Usuario..."
            className="w-full p-2 text-black outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button onClick={handleSearchClick} className="text-gray-700 px-2">
            <FiSearch size={24} />
          </button>
        </div>

      </div>
    </Modal>
  );
};

export default ModalSearch;
