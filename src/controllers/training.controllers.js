import { getTrainingsByUserId, createTraining, getAllTrainings, updateTraining, deleteTraining } from '../models/training.model.js';

export const getTrainingsByUserIdController = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const trainings = await getTrainingsByUserId(id_usuario);
        if (!trainings) {
            return res.status(404).json({ message: 'No se encontraron entrenamientos para este usuario' });
        }
        res.json(trainings);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los entrenamientos', error });
    }
};

export const getAllTrainingsController = async (req, res) => {
    try {
        const trainings = await getAllTrainings();
        res.json(trainings);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todos los entrenamientos', error });
    }
};

export const createTrainingController = async (req, res) => {
    try {
        // Obtener el usuario autenticado
        const id_usuario = req.user?.id_usuario; 

        if (!id_usuario) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        // Extraer los otros datos
        const { area_laboral, agregar_informacion } = req.body;

        if (!area_laboral || !agregar_informacion) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Crear el entrenamiento
        const trainingId = await createTraining({ id_usuario, area_laboral, agregar_informacion });

        res.status(201).json({ message: 'Entrenamiento creado con éxito', trainingId });
    } catch (error) {
        console.error("Error en createTrainingController:", error);
        res.status(500).json({ message: 'Error al crear el entrenamiento', error });
    }
};

export const updateTrainingController = async (req, res) => {
    try {
        const { id_entrenamiento } = req.params;
        const updated = await updateTraining(id_entrenamiento, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Entrenamiento no encontrado o no actualizado' });
        }
        res.json({ message: 'Entrenamiento actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el entrenamiento', error });
    }
};

export const deleteTrainingController = async (req, res) => {
    try {
        const { id_entrenamiento } = req.params;
        const deleted = await deleteTraining(id_entrenamiento);
        if (!deleted) {
            return res.status(404).json({ message: 'Entrenamiento no encontrado o no eliminado' });
        }
        res.json({ message: 'Entrenamiento eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el entrenamiento', error });
    }
};
