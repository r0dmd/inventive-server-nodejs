import getPool from '../../db/getPool.js';

// ------------------------------------------
const updateProductModel = async (productId, fieldsToUpdate) => {
    const pool = await getPool();
    const fields = [];
    const values = [];

    for (const key in fieldsToUpdate) {
        fields.push(`${key} = ?`);
        values.push(fieldsToUpdate[key]);
    }

    fields.push(`modifiedAt = CURRENT_TIMESTAMP`);
    values.push(productId);

    const [res] = await pool.query(
        `
        UPDATE products
        SET ${fields.join(', ')}
        WHERE id = ?
        `,
        values,
    );

    return res.affectedRows;
};

export default updateProductModel;
