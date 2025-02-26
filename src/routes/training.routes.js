import { Router } from 'express';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { trainingSchema, updateTrainingSchema } from '../schemas/training.schema.js';
import { createTrainingController, updateTrainingController, getTrainingsByUserIdController, getAllTrainingsController, deleteTrainingController, } from '../controllers/training.controllers.js';
import { requiredAuth } from "../middlewares/tokenValidation.js";


const router = Router();

router.get('/user/trainings/:id_usuario', requiredAuth, getTrainingsByUserIdController);
router.get('/trainings',requiredAuth, getAllTrainingsController);
router.post('/newTraining', requiredAuth, validateSchema(trainingSchema), createTrainingController);
router.put('/training/:id_entrenamiento',requiredAuth, validateSchema(updateTrainingSchema), updateTrainingController);
router.delete('/training/:id_entrenamiento',requiredAuth, deleteTrainingController);

export default router;
