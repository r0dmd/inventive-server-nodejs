import { generateErrorUtil } from '../../utils';
import bcrypt from 'bcrypt';
import { updateUserController } from '../../models/users/index.js';


// Controller function to update the username and password
const updateUserController = async (req, res, next) => {
    try {
        // Get the user ID from request parameters
        const { userId } = req.params;

        // Get new username and password from request body
        const { username, password } = req.body;

        // If both fields are missing, throw an error
        if (!username && !password) {
            throw generateErrorUtil('Missing fields', 400);
        }

        // Fetch the user to ensure they exist
        const user = await userModel.getUserById(userId);
        if (!user) {
            throw generateErrorUtil('User not found', 404);
        }

        // Prepare update data
        const updatedData = {};
        if (username) updatedData.username = username;
        if (password) updatedData.password = await bcrypt.hash(password, 10);

        // Update the user
        await userModel.updateUser(userId, updatedData);

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
