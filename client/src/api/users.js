import axios from "./axios";

export const getUsersRequest = () => axios.get(`/users`);
export const getUserRequest = (id_usuario) => axios.get(`/user/${id_usuario}`);
export const createUserRequest = (user) => axios.post(`/user`, user);
export const updateUserRequest = (id_usuario, user) => axios.put(`/user/${id_usuario}`, user);
export const deleteUserRequest = (id_usuario) => axios.delete(`/user/${id_usuario}`);
