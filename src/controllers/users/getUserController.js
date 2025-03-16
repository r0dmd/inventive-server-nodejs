import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import { generateErrorUtil } from '../../utils/index.js';

const getUserController = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            throw generateErrorUtil('Unauthorized: Missing user data', 401);
        }

        const user = await selectUserByIdModel(req.user.id);

        if (!user) {
            throw generateErrorUtil('User not found', 404);
        }

        res.send({
            status: 'ok',
            data: { user },
        });
    } catch (err) {
        next(err);
    }
};

export default getUserController;
