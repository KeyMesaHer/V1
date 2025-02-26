import connection from '../db.js';

// Crear un nuevo usuario
export const createUser = async (userData) => {
    try {
        const { nombre, cedula, email, password, cargo, rol } = userData;
        const [result] = await connection.execute(
            'INSERT INTO usuarios (nombre, cedula, email, password, cargo, rol) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, cedula, email, password, cargo, rol]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};

// Obtener un usuario por cédula
export const getUserByCedula = async (cedula) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE cedula = ?', [cedula]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error al obtener usuario por cédula:', error);
        throw error;
    }
};

// Obtener un usuario por ID (id_usuario)
export const getUserById = async (id_usuario) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error al obtener usuario por id_usuario:', error);
        throw error;
    }
};

// Actualizar un usuario
export const updateUser = async (id_usuario, userData) => {
    try {
        const { email, password, cargo, rol } = userData;
        const [result] = await connection.execute(
            'UPDATE usuarios SET email = ?, password = ?, cargo = ?, rol = ? WHERE id_usuario = ?',
            [email, password, cargo, rol, id_usuario]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
};

// Eliminar un usuario por ID (id_usuario)
export const deleteUser = async (id_usuario) => {
    try {
        const [result] = await connection.execute('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
};

// Obtener todos los usuarios
export const getAllUsers = async () => {
    try {
        const [rows] = await connection.execute('SELECT * FROM usuarios');
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        throw error;
    }
};
