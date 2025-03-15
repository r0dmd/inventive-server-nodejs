// IMPORTS
// Environment variables from the .env file
import 'dotenv/config';
const { PORT, UPLOADS_DIR } = process.env;

// Dependencies
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import {
    // inventoriesRoutes,
    // productsRoutes,
    usersRoutes,
} from './src/routes/index.js';

// ------------------------------------------
// Generating the server
const app = express();

app.use(cors()); // Prevents connection problems between client and server
app.use(morgan('dev')); // Query info on the console
app.use(express.json()); // Parses JSON body
app.use(fileUpload()); // Parses "form-data" body (for files)
app.use(express.static(UPLOADS_DIR)); // Tells express what the static file directory is

// Middlewares which tell express where the routes are located
app.use('/api/users', usersRoutes);
// app.use('/api/inventories', inventoriesRoutes);
// app.use('/api/products', productsRoutes);

// Error-handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    // NOTE: hhtpStatus is a custom property that we generate and give a value to (by default, errors don't have it). If we pass to it an error code, it will show; if not, it will return 500, which is an unespecific error
    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

// 404 Route Not Found middleware
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Route not found',
    });
});

// We open the server to listen to petitions from a given port
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
