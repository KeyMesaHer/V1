import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


export const requiredAuth = (req, res, next) => {
    try {
        console.log("Cookies en la solicitud:", req.cookies); //Verifica si las cookies llegan

        const { token } = req.cookies;

        console.log("Token recibido:", token); //Verifica si el token está presente

        if (!token) {
            return res.status(401).json({ message: "No token, Authorization Denied" });
        }

        jwt.verify(token, TOKEN_SECRET, (error, user) => {
            if (error) {
                console.error("Token verification error:", error);
                return res.status(403).json({ message: "Invalid Token" });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error("Error en requiredAuth:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
