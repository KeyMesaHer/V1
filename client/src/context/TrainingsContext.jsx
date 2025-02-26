import { createContext, useContext, useState } from "react";
import { 
    getTrainingsByUserRequest, 
    getAllTrainingsRequest, 
    createTrainingRequest, 
    updateTrainingRequest, 
    deleteTrainingRequest 
} from '../api/trainings.js';

const TrainingContext = createContext();

export const useTrainings = () => {
    const context = useContext(TrainingContext);
    if (!context) {
        throw new Error('useTrainings must be used within a TrainingProvider');
    }
    return context;
};

export function TrainingProvider({ children }) {
    const [trainings, setTrainings] = useState([]);
    const [areaLaboral, setAreaLaboral] = useState('');
    const [informacion, setInformacion] = useState('');
    const [registros, setRegistros] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const getAllTrainings = async () => {
        try {
            const res = await getAllTrainingsRequest();
            setTrainings(res.data);
        } catch (error) {
            console.error('Error al obtener todos los entrenamientos:', error);
        }
    };

    const getTrainingsByUser = async (userId) => {
        try {
            const res = await getTrainingsByUserRequest(userId);
            setTrainings(res.data);
        } catch (error) {
            console.error('Error al obtener entrenamientos por usuario:', error);
        }
    };

    const createTraining = async (training) => {
        try {
            const res = await createTrainingRequest(training);
            setTrainings([...trainings, res.data]);
        } catch (error) {
            console.error('Error al crear entrenamiento:', error);
        }
    };

    const updateTraining = async (id, updatedTraining) => {
        try {
            await updateTrainingRequest(id, updatedTraining);
            setTrainings(trainings.map(training => training.id_entrenamiento === id ? { ...training, ...updatedTraining } : training));
        } catch (error) {
            console.error('Error al actualizar entrenamiento:', error);
        }
    };

    const deleteTraining = async (id) => {
        try {
            await deleteTrainingRequest(id);
            setTrainings(trainings.filter(training => training.id_entrenamiento !== id));
        } catch (error) {
            console.error('Error al eliminar entrenamiento:', error);
        }
    };

    const handleGuardar = () => {
        if (areaLaboral.trim() === '' || informacion.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (editIndex !== null) {
            const updatedRegistros = [...registros];
            updatedRegistros[editIndex] = { areaLaboral, informacion };
            setRegistros(updatedRegistros);
            setEditIndex(null);
        } else {
            setRegistros([...registros, { areaLaboral, informacion }]);
        }

        setAreaLaboral('');
        setInformacion('');
    };

    const handleEdit = (index) => {
        setAreaLaboral(registros[index].areaLaboral);
        setInformacion(registros[index].informacion);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        setRegistros(registros.filter((_, i) => i !== index));
    };

    return (
        <TrainingContext.Provider value={{ trainings, getAllTrainings, getTrainingsByUser, createTraining, updateTraining, deleteTraining, areaLaboral, setAreaLaboral, informacion, setInformacion, registros, setRegistros, editIndex, setEditIndex, handleGuardar, handleEdit, handleDelete }}>
            {children}
        </TrainingContext.Provider>
    );
}
