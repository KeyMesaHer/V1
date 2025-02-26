import app from "./app.js";
import { connectDB } from './db.js';


const startServer = async () => {
    await connectDB(); 
    app.listen(5505, () => console.log(`Server on PORT 5505`));
};

startServer().catch(error => {
    console.error("Error iniciando el servidor", error);
});