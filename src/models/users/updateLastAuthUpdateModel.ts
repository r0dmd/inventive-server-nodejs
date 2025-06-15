import getPool from "../../db/getPool";
import { generateErrorUtil } from "../../utils/index";

// ------------------------------------------
// Función para actualizar la fecha de última autenticación de un usuario en la BD, a usar en controladores donde se necesite actualizar la fecha de autentificación, como después de un inicio de sesión o un cambio de contraseña
const updateLastAuthUpdateModel = async (userId) => {
  const pool = await getPool();

  const [result] = await pool.query(
    "UPDATE users SET lastAuthUpdate = CURRENT_TIMESTAMP WHERE id = ?",
    [userId],
  );

  if (result.affectedRows === 0) {
    throw generateErrorUtil("Usuario no encontrado", 404);
  }

  // NOTA: No es necesario, pero retornar 'true' suele ser una convención para explicitar que no hubo fallos. Puede ser útil para confirmar que la operación fue exitosa o para facilitar pruebas unitarias donde interesa comprobar que el flujo completo se ejecutó sin problemas
  return true;
};

export default updateLastAuthUpdateModel;
