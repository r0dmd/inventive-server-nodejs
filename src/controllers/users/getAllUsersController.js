import { selectAllUsersModel } from '../../models/users/index.js';

// ------------------------------------------
const getAllUsersController = async (req, res, next) => {
    try {
        const users = await selectAllUsersModel();

        // If we reach this point, that means there's at least 1 user, even if it's the admin, so it would be useless to specify a "there are no users" error here

        // We return the users
        res.send({
            status: 'ok',
            data: { users },
        });
    } catch (err) {
        next(err);
    }
};

export default getAllUsersController;
