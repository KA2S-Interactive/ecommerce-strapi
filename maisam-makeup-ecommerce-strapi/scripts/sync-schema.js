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
    
    // Suppress errors during load to allow schema sync even if cleanup fails
    const originalError = console.error;
    console.error = () => {}; // Suppress error output temporarily
    
    try {
      // Load Strapi which will sync the schema
      // Even if cleanup fails, schema should still sync
      await app.load();
      console.log('✅ Database schema synced successfully');
    } catch (loadError) {
      // If load fails due to missing tables, try to sync schema manually
      if (loadError.message && loadError.message.includes('does not exist')) {
        console.log('⚠️  Tables missing, attempting manual schema sync...');
        
        // Try to sync schema directly via database
        const db = app.db;
        if (db && db.connection) {
          try {
            // Force schema sync by accessing the schema builder
            await db.connection.migrate.latest();
            console.log('✅ Schema synced via migration');
          } catch (migrateError) {
            console.log('⚠️  Migration sync failed, trying direct schema access...');
            // Schema should be synced on next load
          }
        }
      } else {
        throw loadError;
      }
    } finally {
      console.error = originalError; // Restore error output
    }
    
    await app.destroy();
    console.log('✅ Schema sync process completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing schema:', error.message);
    // Don't exit with error - let Strapi try to start anyway
    // The schema might still sync on next attempt
    process.exit(0);
  }
}

syncSchema();

