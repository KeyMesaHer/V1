import axios from "./axios";

export const getTrainingsByUserRequest = (id_usuario) => axios.get(`/user/trainings/${id_usuario}`);
export const getAllTrainingsRequest = () => axios.get(`/trainings`);
export const createTrainingRequest = (training) => axios.post(`/newTraining`, training);
export const updateTrainingRequest = (id_entrenamiento, training) => axios.put(`/training/${id_entrenamiento}`, training);
export const deleteTrainingRequest = (id_entrenamiento) => axios.delete(`/training/${id_entrenamiento}`);
