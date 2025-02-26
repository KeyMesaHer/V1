import { Router } from "express";
import { register, login, logout, profile, verifyToken, getUsers, updateUserById, deleteUserById,  } from "../controllers/auth.controller.js";
import { requiredAuth } from "../middlewares/tokenValidation.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', requiredAuth, logout);  // Protegido con requiredAuth
router.get('/verify', requiredAuth, verifyToken);  // Protegido con requiredAuth
router.get('/profile', requiredAuth, profile);
router.get('/users', getUsers);
router.put('/user/:id_usuario', updateUserById);
router.delete('/user/:id_usuario', deleteUserById);




export default router;
