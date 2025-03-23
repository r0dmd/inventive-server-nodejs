import generateErrorUtil from '../../utils/generateErrorUtil.js';
import {
    deleteUserByIdModel,
    selectUserByIdModel,
} from '../../models/users/index.js';

const deleteUserController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Fetch the user to ensure it exists
        const user = await selectUserByIdModel(userId);
        if (!user) {
            throw generateErrorUtil('User not found', 404);
        }

        // Check if the requester has permission to delete this user
        if (req.user.id !== user.id && req.user.role !== 'admin') {
            throw generateErrorUtil('Insufficient permissions', 403);
        }

        // Delete the user from the database
        const userDeleted = await deleteUserByIdModel(userId);
        if (!userDeleted) {
            throw generateErrorUtil('User not found', 404);
        }

        res.send({
            status: 'ok',
            message: 'User deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteUserController;
