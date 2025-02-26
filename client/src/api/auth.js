import axios from './axios.js';

export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => {
  const token = localStorage.getItem("token"); // Obtener token almacenado
  if (!token) return Promise.reject("No token found");

  return axios.get(`/verify`, {
    headers: {
      Authorization: `Bearer ${token}`, // Agregar el token en la cabecera
    },
  });
};
