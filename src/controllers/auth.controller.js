import { createUser, getUserById, getUserByCedula, getAllUsers, updateUser, deleteUser } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createTokenAccess } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

// Registrar usuario
export const register = async (req, res) => {
    const { nombre, cedula, email, password, cargo, rol } = req.body;

    try {
        const userFound = await getUserByCedula(cedula);
        if (userFound) return res.status(400).json(["La cédula ya está registrada"]);

        const passwordHash = await bcrypt.hash(password, 10);
        const newUserId = await createUser({
            nombre,
            cedula,
            email,
            password: passwordHash,
            cargo,
            rol
        });

        const token = await createTokenAccess({ id_usuario: newUserId });
        res.cookie('token', token);
        res.status(201).json({
            id_usuario: newUserId,
            nombre,
            cedula
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Iniciar sesión
export const login = async (req, res) => {
    const { cedula, password } = req.body;

    if (!cedula || !password) {
        return res.status(400).json({ message: "Cédula y contraseña son requeridas" });
    }

    try {
        const userFound = await getUserByCedula(cedula);
        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }

        const token = await createTokenAccess({ id_usuario: userFound.id_usuario });

        // Configuración de la cookie
        res.cookie("token", token, {
            httpOnly: true, // Protege contra ataques XSS
            secure: false, 
            sameSite: "Strict", 
            maxAge: 3600000 // Expira en 1 hora
        });

        return res.status(200).json({
            id_usuario: userFound.id_usuario,
            nombre: userFound.nombre,
            cedula: userFound.cedula
        });

    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
// Cerrar sesión
export const logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    return res.sendStatus(200);
};

// Obtener perfil del usuario autenticado
export const profile = async (req, res) => {
    try {
        const userFound = await getUserById(req.user.id_usuario);
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

        res.status(200).json({
            id_usuario: userFound.id_usuario,
            nombre: userFound.nombre,
            cedula: userFound.cedula
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verificar token del usuario
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.status(401).json({ message: "No autorizado" });

        const userFound = await getUserById(user.id_usuario);
        if (!userFound) return res.status(401).json({ message: "No autorizado" });

        return res.json({
            id_usuario: userFound.id_usuario,
            nombre: userFound.nombre,
            cedula: userFound.cedula
        });
    });
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } 
    catch (error) {
        console.error("Error details:", error);  
        res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
    
};

// Actualizar usuario por ID 
export const updateUserById = async (req, res) => {
    const { id_usuario } = req.params;
    const { email, password, cargo, rol } = req.body;

    try {
        const userFound = await getUserById(id_usuario);
        if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });

        let passwordHash = userFound.password;
        if (password) {
            passwordHash = await bcrypt.hash(password, 10);
        }

        const updated = await updateUser(id_usuario, {
            email,
            password: passwordHash,
            cargo,
            rol
        });

        if (!updated) return res.status(400).json({ message: "No se pudo actualizar el usuario" });

        res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
    }
};

// Eliminar usuario por ID 
export const deleteUserById = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const deleted = await deleteUser(id_usuario);
        if (!deleted) return res.status(400).json({ message: "No se pudo eliminar el usuario" });

        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
    }
};
