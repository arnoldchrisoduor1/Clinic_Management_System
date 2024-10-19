const { Pool } = require('pg');
const fs = require('fs').promises;
const path = require('path');

const pool = new Pool({
  host: 'db',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function runMigrations() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const migrationFiles = await fs.readdir('/migrations');
    for (const file of migrationFiles.sort()) {
      if (path.extname(file) === '.sql') {
        const filePath = path.join('/migrations', file);
        const sql = await fs.readFile(filePath, 'utf-8');
        console.log(`Running migration: ${file}`);
        await client.query(sql);
      }
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

runMigrations().then(() => {
  console.log('Migrations completed successfully');
  process.exit(0);
}).catch((error) => {
  console.error('Error running migrations:', error);
  process.exit(1);
});