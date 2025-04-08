import { updateUserModel } from '../../models/users/index.js';
import { generateErrorUtil } from '../../utils/index.js';
import bcrypt from 'bcrypt';

// Controller function to update the username and password
const updateUserController = async (req, res, next) => {
    try {
        const { userId } = req.user.id;

        // Get new username and password from request body
        const { username, password } = req.body;

        // If both fields are missing, throw an error
        if (!username && !password) {
            generateErrorUtil('Missing fields', 400);
        }

        // Prepare update data
        const updatedData = {};
        if (username) updatedData.username = username;
        if (password) updatedData.password = await bcrypt.hash(password, 10);

        // Update the user
        await updateUserModel(userId, updatedData);

        // Send response to the client
        res.send({
            status: 'ok',
            message: 'User updated successfully',
            data: { username },
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserController;
