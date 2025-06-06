import { updateUserModel } from '../../models/users/index.js';
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Controller function to update the username and password
const updateUserController = async (req, res, next) => {
    try {
        // Get new username from request body
        const { newUsername } = req.body;
        if (!newUsername) {
            generateErrorUtil('Missing fields', 400);
        }

        // Update the user
        const affectedRows = await updateUserModel(req.user.id, newUsername);
        if (affectedRows < 1)
            generateErrorUtil('There was an error updating the user data', 500);

        // Send response to the client
        res.send({
            status: 'ok',
            message: 'User updated successfully',
            data: { newUsername },
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserController;
