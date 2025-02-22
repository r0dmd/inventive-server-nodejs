import mysql from 'mysql2/promise';
import { generateErrorUtil } from '../utils/index.js';

// Variables de entorno
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// ------------------------------------------
// Variable que almacenará grupo de conexiones con la BD. Se declara fuera de la función para que solo se configure una vez y se reutilice en cada llamada a getPool, evitando que se reinicialice cada vez que se llama
let pool;

// Función que retorna el grupo de conexiones
const getPool = async () => {
    try {
        // 1. Establecer conexión temporal para verificar y generar la BD si no existe, sin especificar BD para evitar errores si no ha sido generada
        const connection = await mysql.createConnection({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASS,
        });

        // 2. Añadimos la BD si no existe, y cerramos la conexión temporal
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB}\``);
        await connection.end();

        // 3. Configuramos el pool con la BD ya generada. Esto evita errores de "desconexión" de la BD en las consultas, ya que todas apuntarán a la BD correcta
        pool = mysql.createPool({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASS,
            database: MYSQL_DB,
            timezone: 'Z',
            // Configuraciones extra para evitar saturación en situaciones de alta demanda
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        // 4. Retornamos pool directamente
        return pool;
    } catch (err) {
        console.error(err);
        generateErrorUtil(
            'No se ha podido establecer conexión con la base de datos',
            503,
        );
    }
};

export default getPool;
