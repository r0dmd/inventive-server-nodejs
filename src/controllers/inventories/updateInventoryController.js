import { generateErrorUtil } from '../../utils/index.js';
import { updateInventoryModel } from '../../models/inventories/index.js';

const updateInventoryController = async (req, res, next) => {
    try {
        // Get inventory ID from request parameters
        const { inventoryId } = req.params;

        // Get the new inventory name from request body
        const { inventory } = req.body;

        // Validate that at least one field is provided
        if (!inventory) {
            generateErrorUtil('Missing fields', 400);
        }

        // Check if the inventory exists and retrieve its owner
        const [inventoryData] = await pool.query(
            `SELECT userId FROM inventories WHERE id = ?`,
            [inventoryId],
        );

        // If the inventory does not exist, throw an error
        if (inventoryData.length < 1) {
            generateErrorUtil('Inventory not found', 404);
        }

        // Verify that the current user is the owner of the inventory
        if (req.user.id !== inventoryData[0].userId) {
            generateErrorUtil('Insufficient permissions', 403);
        }

        // Call the model function to update inventory
        const { affectedRows, updatedInventory } = await updateInventoryModel(
            inventoryId,
            inventory,
        );

        // If no rows were updated, return an error
        if (affectedRows === 0) {
            generateErrorUtil('Failed to update inventory', 500);
        }

        // Send the response to the client
        res.send({
            status: 'ok',
            message: 'Inventory updated successfully',
            data: {
                id: inventoryId,
                inventory: updatedInventory,
                modifiedAt: new Date(), // Should update automatically in the DB
            },
        });
    } catch (err) {
        next(err);
    }
};

export default updateInventoryController;
