import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import uploadIcon from '../assets/upload.png';
import defaultImage from '../assets/default.png';
import Navbar from '../components/Navbar.jsx';



const RegisterUserPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors = [] } = useAuth(); 
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

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

  const onSubmit = handleSubmit(async (values) => {
    console.log("Enviando datos:", values);
    await signup(values);
    console.log("Errores de registro:", registerErrors);
    
    if (registerErrors.length === 0) {
      navigate('/users'); 
    }
  });
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-[#0170b8]">
      <Navbar></Navbar>

<main className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start max-w-6xl mx-auto mt-9">

      <div className="  col-span-2 border-b border-gray-400 flex justify-between items-center w-full pl-10 mt-9">

          <h2 className="text-lg font-bold text-white">Registrar usuario</h2>
          <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200">
      
          </button>
        </div>
 <div className="flex flex-col items-center space-y-4 w-full self-start  mr-10">
          <div className="w-90 h-90 rounded-md flex items-center justify-center overflow-hidden bg-gray-800">
            <img src={selectedImage || defaultImage} alt="Imagen de perfil" className="w-full h-full object-cover" />
          </div>
          <label className="flex items-center space-x-1 bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200">
            <img src={uploadIcon} alt="Subir" className="w-4 h-4" />
            <span className="text-sm font-semibold">Cargar foto</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>


        <form onSubmit={onSubmit} className="w-full max-w-lg mx-auto">
          {Array.isArray(registerErrors) && registerErrors.map((error, i) => (
    <div className="bg-red-500 text-white p-2 my-2 rounded-md" key={i}>{error}</div>
))}


          <div className="mb-2">
            <label className="text-white font-bold block mb-2">Nombre</label>
            <input type="text" {...register("nombre", { required: true })} className="w-full bg-white text-black px-4 py-2 rounded-full" placeholder="Ingrese su nombre" />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">Nombre es requerido</p>}
          </div>

          <div className="mb-2">
            <label className="text-white font-bold block mb-2">Cédula</label>
            <input type="text" {...register("cedula", { required: true })} className="w-full bg-white text-black px-4 py-2 rounded-full" placeholder="Ingrese su cédula" />
            {errors.cedula && <p className="text-red-500 text-sm mt-1">Cédula es requerida</p>}
          </div>

          <div className="mb-2">
            <label className="text-white font-bold block mb-2">Email</label>
            <input type="email" {...register("email", { required: true })} className="w-full bg-white text-black px-4 py-2 rounded-full" placeholder="Ingrese su email" />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email es requerido</p>}
          </div>

          <div className="mb-">
            <label className="text-white font-bold block mb-2">Contraseña</label>
            <input type="password" {...register("password", { required: true })} className="w-full bg-white text-black px-4 py-2 rounded-full" placeholder="Ingrese su contraseña" />
            {errors.password && <p className="text-red-500 text-sm mt-1">Contraseña es requerida</p>}
          </div>

          <div className="mb-2">
            <label className="text-white font-bold block mb-2">Cargo</label>
            <input type="text" {...register("cargo", { required: true })} className="w-full bg-white text-black px-4 py-2 rounded-full" placeholder="Ingrese su cargo" />
            {errors.cargo && <p className="text-red-500 text-sm mt-1">Cargo es requerido</p>}
          </div>

          <div className="mb-2">
            <label className="text-white font-bold block mb-2">Rol</label>
            <input type="text" {...register("rol", { required: true })} className="w-full bg-white text-black px-4 py-2 rounded-full" placeholder="Ingrese su cargo" />
            {errors.rol && <p className="text-red-500 text-sm mt-1">Rol es requerido</p>}
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-sky-950 to-sky-600 text-white font-semibold py-2 rounded-full hover:bg-white transform transition duration-500 hover:scale-105">
              Registrar
          </button>
        </form>
      </main>
      </div>
    
  );
};

export default RegisterUserPage;
