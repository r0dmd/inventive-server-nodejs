// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    newInventorieController,
    updateInventorieController,
    listInventoriesController,
    getInventorieByIdController,
    deleteInventorieController,
} from '../controllers/inventories/index.js';

// Importamos las funciones controladoras intermedias.
import authUserController from '../middlewares/authUserController.js';

// Creamos un router.
const router = express.Router();

// Middleware que permite registrar un producto.
router.post('/newinventories', authUserController, newInventorieController);

// Middleware que permite editar el nombre y/o precio de un producto.
router.put(
    '/inventories/:inventoriesId',
    authUserController,
    updateInventorieController,
);

// Middleware que retorna el listado de productos.
router.get('/inventories', listInventoriesController);

// Middleware que retorna un producto concreto por ID.
router.get('/inventories/:inventoriesId', getInventorieByIdController);

// Middleware que elimina un producto concreto por ID.
router.delete(
    '/inventories/:inventorieId',
    authUserController,
    deleteInventorieController,
);

export default router;
