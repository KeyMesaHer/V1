import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import logo from '../assets/logoblanco.png';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors } = useAuth();
  const navigate = useNavigate(); // Hook para redireccionar

  const onSubmited = handleSubmit(async (data) => {
    console.log("Datos enviados:", data);
    const success = await signin(data);
    if (success) {
        navigate("/admin"); // Solo redirige si el login fue exitoso
    }
});

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-[#0170b8]">
      <form onSubmit={onSubmited} className="px-4 max-w-md w-[400px] bg-black shadow-md rounded-lg p-8">
        <div className="mb-6 flex justify-center">
          <img className="w-[200px] h-[200px] object-cover" src={logo} alt="Logo" />
        </div>
        <div className="block justify-center">
          <h2 className="text-2xl font-bold mb-3 text-left text-white">INICIAR SESIÓN</h2>
          {signinErrors.map((error, i) => (
            <div className="bg-red-500 text-white p-2 my-2 rounded-md" key={i}>
              {error}
            </div>
          ))}
          <div className="mb-3">
            <input
              type="text"
              {...register("cedula", { required: true })}
              id="cedula"
              className="bg-black border border-white rounded-none p-2 w-[350px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              placeholder="Cédula"
            />
            {errors.cedula && <p className="text-red-500 text-sm mt-1">Cédula es requerida</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="bg-black border border-white rounded-none p-2 w-[350px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contraseña"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">Contraseña es requerida</p>}
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button type="submit" className="w-[100px] justify-center py-2 bg-gradient-to-b from-black to-[#0170b8] text-white rounded-full border border-white">
            Iniciar
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
