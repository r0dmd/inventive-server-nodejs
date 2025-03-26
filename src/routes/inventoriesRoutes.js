// @@@ TODO traducir comentarios
// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    addInventoryController,
    updateInventoryController,
    getAllInventoriesController,
    getInventoryController,
    deleteInventoryController,
} from '../controllers/inventories/index.js';

// Importamos las funciones controladoras intermedias.
import { authUserController } from '../middlewares/index.js';

// ------------------------------------------
// Creamos un router.
const router = express.Router();

// Middleware que permite registrar un INVENTARIO.
router.post('/inventories/new', authUserController, addInventoryController);

// Middleware que permite editar el nombre y/o precio de un producto.
router.put(
    '/inventories/:inventoryId/update',
    authUserController,
    updateInventoryController,
);

// Middleware que retorna el listado de productos.
router.get('/inventories', getAllInventoriesController);

// Middleware que retorna un producto concreto por ID.
router.get('/inventories/:inventoryId', getInventoryController);

// Middleware que elimina un producto concreto por ID.
router.delete(
    '/inventories/:inventoryId/delete',
    authUserController,
    deleteInventoryController,
);

export default router;
