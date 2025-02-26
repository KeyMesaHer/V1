import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import { useAuth } from '../context/AuthContext.jsx';
import uploadIcon from '../assets/upload.png';
import defaultImage from '../assets/default.png';
import editIcon from '../assets/edit.png';
import Navbar from "../components/Navbar.jsx";



const EditUserPage = () => {
    const { id } = useParams();
    const { users, updateUser } = useUsers();
    const navigate = useNavigate();
    const userId = parseInt(id, 10);
    const [selectedImage, setSelectedImage] = useState(null);


    
    const [userData, setUserData] = useState({
        nombre: "",
        cedula: "",
        email: "",
        password: "",
        cargo: "",
        rol: "",
    });

    useEffect(() => {
        if (!id) {
            console.error("ID no encontrado en los parámetros.");
            return;
        }

        const userToEdit = users.find((user) => user.id_usuario === userId);

        if (userToEdit) {
            setUserData(userToEdit);
        } else {
            console.error("Usuario no encontrado.");
        }
    }, [id, users, userId]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || isNaN(userId)) {
            console.error("No se puede actualizar sin un ID válido");
            return;
        }

        try {
            console.log("Enviando actualización de usuario:", userId, userData);
            await updateUser(userId, userData);
            navigate("/users"); 
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-[#0170b8]">
            <Navbar></Navbar>

      <main className="grid grid-cols-2 grid-cols-2 gap-16 items-start max-w-4xl w-full mx-auto">
        <div className="col-span-2 border-b border-gray-300 flex justify-between items-center w-full pl-30">
          <h2 className="text-lg font-bold text-white">Editar Información de Usuario</h2>
          <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200">
            <img src={editIcon} alt="Editar" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4 w-full self-start">
          <div className="w-full aspect-[4/5] rounded-md flex items-center justify-center overflow-hidden bg-gray-800">
            <img src={selectedImage || defaultImage} alt="Imagen de perfil" className="w-full h-full object-cover" />
          </div>
          <label className="flex items-center space-x-1 bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200">
            <img src={uploadIcon} alt="Subir" className="w-5 h-5" />
            <span className="text-sm font-semibold">Cargar foto del usuario</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

                <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
                    <div className="mb-6">
                        <label className="text-white font-bold block mb-2">Nombre</label>
                        <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} className="w-full bg-white text-black px-4 py-3 rounded-full" />
                    </div>

                    <div className="mb-6">
                        <label className="text-white font-bold block mb-2">Cédula</label>
                        <input type="text" name="cedula" value={userData.cedula} onChange={handleChange} className="w-full bg-white text-black px-4 py-3 rounded-full" />
                    </div>

                    <div className="mb-6">
                        <label className="text-white font-bold block mb-2">Email</label>
                        <input type="email" name="email" value={userData.email} onChange={handleChange} className="w-full bg-white text-black px-4 py-3 rounded-full" />
                    </div>

                    <div className="mb-6">
                        <label className="text-white font-bold block mb-2">Contraseña</label>
                        <input type="password" name="password" value={userData.password} onChange={handleChange} className="w-full bg-white text-black px-4 py-3 rounded-full" />
                    </div>

                    <div className="mb-6">
                        <label className="text-white font-bold block mb-2">Cargo</label>
                        <input type="text" name="cargo" value={userData.cargo} onChange={handleChange} className="w-full bg-white text-black px-4 py-3 rounded-full" />
                    </div>

                    <div className="mb-6">
                        <label className="text-white font-bold block mb-2">Rol</label>
                        <input type="text" name="rol" value={userData.rol} onChange={handleChange} className="w-full bg-white text-black px-4 py-3 rounded-full" />
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-sky-950 to-sky-600 text-white font-semibold py-3 rounded-full hover:bg-white transform transition duration-500 hover:scale-105">
                        Guardar
                    </button>
                </form>
            </main>
        </div>
    );
};

export default EditUserPage;
