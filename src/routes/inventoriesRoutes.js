// @@@ TODO traducir y modificar comentarios
// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    addInventoryController,
    updateInventoryController,
    getUserInventoriesController,
    deleteInventoryController,
} from '../controllers/inventories/index.js';

// Importamos las funciones controladoras intermedias.
import { authUserMiddleware } from '../middlewares/index.js';

// ------------------------------------------
// Creamos un router.
const router = express.Router();

// Middleware que permite registrar un INVENTARIO.
router.post('/inventories/new', authUserMiddleware, addInventoryController);

// Middleware que retorna el listado de productos.
router.get('/inventories', authUserMiddleware, getUserInventoriesController);

// Middleware que permite editar el nombre y/o precio de un producto.
router.put(
    '/inventories/:inventoryId/update',
    authUserMiddleware,
    updateInventoryController,
);

// Middleware que elimina un producto concreto por ID.
router.delete(
    '/inventories/:inventoryId/delete',
    authUserMiddleware,
    deleteInventoryController,
);

export default router;
