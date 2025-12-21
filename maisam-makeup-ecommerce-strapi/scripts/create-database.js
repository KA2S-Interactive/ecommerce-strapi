/**
 * Script to create a new PostgreSQL database for this Strapi instance
 * This ensures it doesn't conflict with other Strapi instances on the same VM
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Load .env file manually if it exists
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
          process.env[key.trim()] = value;
        }
      }
    });
  }
}

loadEnv();

async function createDatabase() {
  try {
    console.log('🔄 Creating database for Maisam Makeup Ecommerce Strapi...');

    // Get database configuration from environment
    const dbConfig = {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      user: process.env.DATABASE_USERNAME || 'strapi',
      password: process.env.DATABASE_PASSWORD || 'strapi',
      database: 'postgres', // Connect to postgres database first
    };

    const dbName = process.env.DATABASE_NAME || 'maisam_makeup_ecommerce_strapi';

    console.log('📋 Database Configuration:');
    console.log(`   Name: ${dbName}`);
    console.log(`   User: ${dbConfig.user}`);
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   Port: ${dbConfig.port}`);

    // Connect to PostgreSQL
    const client = new Client(dbConfig);
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // Check if database exists
    const checkDb = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkDb.rows.length > 0) {
      console.log(`⚠️  Database '${dbName}' already exists`);
      await client.end();
      return;
    }

    // Create database
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`✅ Database '${dbName}' created successfully!`);

    // Grant privileges
    await client.query(`GRANT ALL PRIVILEGES ON DATABASE ${dbName} TO ${dbConfig.user}`);
    console.log(`✅ Privileges granted to user '${dbConfig.user}'`);

    await client.end();

    console.log('✅ Database setup completed!');
    console.log('✅ You can now run: npm run develop or npm start');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    if (error.code === '42P04') {
      console.log(`⚠️  Database already exists`);
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure PostgreSQL is running');
    } else if (error.code === '28P01') {
      console.log('💡 Check your database credentials');
    }
    process.exit(1);
  }
}

createDatabase();
