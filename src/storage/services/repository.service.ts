import { Pool } from 'pg';
import { SQLStatement } from 'sql-template-strings';

const pool = new Pool();

export async function query(stmt: SQLStatement): Promise<any> {
    const client = await pool.connect();

    try {
        return await client.query(stmt.text, stmt.values);
    } catch (error) {
        console.error(`Error while executing query: '${stmt.text}' with values: '${stmt.values}' ::`, error);
        throw error;
    } finally {
        client.release();
    }
}
