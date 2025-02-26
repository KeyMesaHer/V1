import { createContext, useContext, useState } from 'react';
import { createUserRequest, getUsersRequest, updateUserRequest, deleteUserRequest } from '../api/users.js';

const UserContext = createContext();

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    const createUser = async (user) => {
        try {
            const res = await createUserRequest(user);
            setUsers([...users, res.data]);
        } catch (error) {
            console.error('Error al crear usuario:', error);
        }
    };

    const updateUser = async (id, updatedUser) => {
        try {
            await updateUserRequest(id, updatedUser);
            setUsers(users.map(user => user.id_usuario === id ? { ...user, ...updatedUser } : user));
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await deleteUserRequest(id);
            setUsers(users.filter(user => user.id_usuario !== id));
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    return (
        <UserContext.Provider value={{ users, getUsers, createUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
}
