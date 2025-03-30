import { selectUserInventoriesModel } from '../../models/inventories/index.js';
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
const getUserInventoriesController = async (req, res, next) => {
    try {
        const inventories = await selectUserInventoriesModel(req.user.id);
        if (inventories.length < 1)
            generateErrorUtil('Inventories not found for this user', 404);

        res.send({
            status: 'ok',
            data: { inventories },
        });
    } catch (err) {
        next(err);
    }
};

export default getUserInventoriesController;
