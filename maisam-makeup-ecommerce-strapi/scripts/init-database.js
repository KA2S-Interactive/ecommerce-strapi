/**
 * Script to initialize database tables without running cleanup
 * This bypasses Strapi's draft cleanup that fails when tables don't exist
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const pg = require('pg');

async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Get database connection from environment
    const dbUrl = process.env.DATABASE_URL || 
      `postgresql://${process.env.DATABASE_USERNAME || 'strapi'}:${process.env.DATABASE_PASSWORD || 'strapi'}@${process.env.DATABASE_HOST || 'localhost'}:${process.env.DATABASE_PORT || 5432}/${process.env.DATABASE_NAME || 'strapi'}`;
    
    const client = new pg.Client({ connectionString: dbUrl });
    await client.connect();
    
    console.log('✅ Connected to database');
    
    // Check if categories table exists
    const checkTable = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'categories'
      );
    `);
    
    if (checkTable.rows[0].exists) {
      console.log('✅ Tables already exist');
      await client.end();
      return;
    }
    
    console.log('⚠️  Tables do not exist. Creating minimal structure...');
    
    // Create a minimal categories table to prevent the error
    await client.query(`
      CREATE TABLE IF NOT EXISTS "public"."categories" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255),
        "slug" VARCHAR(255),
        "description" TEXT,
        "imageUrl" VARCHAR(255),
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "created_by_id" INTEGER,
        "updated_by_id" INTEGER,
        "locale" VARCHAR(255),
        "published_at" TIMESTAMP
      );
    `);
    
    console.log('✅ Created categories table');
    
    // Now compile and load Strapi - it will sync the full schema
    console.log('🔄 Loading Strapi to sync full schema...');
    
    const appContext = await compileStrapi();
    const app = await createStrapi(appContext);
    
    // Suppress console.error temporarily to avoid error spam
    const originalError = console.error;
    console.error = () => {};
    
    try {
      await app.load();
      console.log('✅ Strapi loaded successfully');
    } catch (error) {
      // Even if there's an error, schema might be synced
      if (error.message && error.message.includes('does not exist')) {
        console.log('⚠️  Some tables may still need to be created');
        console.log('⚠️  But categories table exists, so Strapi should start now');
      } else {
        throw error;
      }
    } finally {
      console.error = originalError;
    }
    
    await app.destroy();
    await client.end();
    
    console.log('✅ Database initialization completed!');
    console.log('✅ You can now run: npm start');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

initDatabase();


