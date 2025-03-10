// We import our custom variables from our file .env
import 'dotenv/config';

// Import the dependencies.
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';

// Import the routes.
// Line 12 is just an example, need to replace with our routes"
// import userRoutes from './src/routes/userRoutes.js';

// Import the variable from the enviroment that we need
const { PORT, UPLOADS_DIR } = process.env;

//Create Server.
const app = express();

// Middleware that avoids conexion prolems between client and server.
app.use(cors());

// Middleware that shows Express where the static files are stored.
app.use(express.static(UPLOADS_DIR));

// Middleware that shows on the console the information from the entries we ask for.
app.use(morgan('dev'));

// Middleware that allows to read the body in the JSON format.
app.use(express.json());

// Middleware that allows to read the body in the form-data format( allows reading files ).
app.use(fileUpload());

// Middleware that shows Express where the routes are located .

//  this is an example, need to replace with the correct routes
// app.use('/api', userRoutes);
// app.use('/api', productRoutes);

// Middleware that allows error handleling.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

// Middleware for route not found.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

// We allow the server to listlen to petitions from a given port.
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
