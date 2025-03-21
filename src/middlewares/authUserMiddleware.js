// Import dependencies.
import jwt from 'jsonwebtoken';

// Import the function that generates an error.
import { generateErrorUtil } from '../utils/index.js';

// Intermediate controller function that decrypts the token and adds the user's
// information to the request object.
const authUserMiddleware = async (req, res, next) => {
    try {
        // Get the token from the request header.
        const { authorization } = req.headers;

        // If the token is missing, throw an error.
        if (!authorization) {
            generateErrorUtil('Authorization header is missing', 401);
        }

        try {
            // Decrypt the token.
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);

            // Add a custom property to the request object to store the user's information.
            req.user = tokenInfo;

            // Pass control to the next middleware. This will allow the next middleware
            // to access "req.user.id" and "req.user.role".
            next();
        } catch (err) {
            console.error(err);

            generateErrorUtil('Invalid token', 401);
        }
    } catch (err) {
        next(err);
    }
};

export default authUserMiddleware;
