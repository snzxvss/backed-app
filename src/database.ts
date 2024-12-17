import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'resta',
};

export const createConnection = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Database connection established');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

export const query = async (sql: string, params: any[] = []) => {
    const connection = await createConnection();
    try {
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        await connection.end();
    }
};