/**
 * Script to sync database schema before starting Strapi
 * This ensures all tables exist before Strapi tries to clean drafts
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');

async function syncSchema() {
  try {
    console.log('🔄 Syncing database schema...');
    
    const appContext = await compileStrapi();
    const app = await createStrapi(appContext);
    
    // Load Strapi which will sync the schema
    await app.load();
    
    console.log('✅ Database schema synced successfully');
    
    await app.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing schema:', error.message);
    process.exit(1);
  }
}

syncSchema();

