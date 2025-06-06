import getPool from '../../db/getPool.js';

// ------------------------------------------
const selectProductByIdModel = async (productId) => {
    const pool = await getPool();

    const [product] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
        productId,
    ]);

    return product;
};

export default selectProductByIdModel;
