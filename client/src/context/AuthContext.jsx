import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth.js";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const signup = async (user) => {
        try {
            setErrors([]);
            const res = await registerRequest(user);
            console.log("Usuario registrado correctamente:", res);
        } catch (error) {
            console.log("Error en el registro:", error.response?.data);
            let errorMessages = ["Error desconocido"];
            if (error.response?.data?.errors) {
                errorMessages = error.response.data.errors;
            } else if (error.response?.data?.message) {
                errorMessages = [error.response.data.message];
            }
            setErrors(errorMessages);
        }
    };
    
    

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log("Respuesta del servidor:", res);
            setIsAuthenticated(true);
            setUser(res.data);
            Cookies.set("token", res.data.token); // Guarda el token en cookies si el backend lo envía
            return true; // Indica que el login fue exitoso
        } catch (error) {
            console.log("Error en el login:", error.response?.data);
            setErrors([error.response?.data?.message || "Error desconocido"]);
            return false; // Indica que el login falló
        }
    };
    
      

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => setErrors([]), 5505);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if (!res.data || !res.data.id) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            user,
            isAuthenticated,
            errors,
            loading,
            setUser,
            setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
}
