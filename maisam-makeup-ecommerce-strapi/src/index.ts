import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Ensure database tables exist
    // This runs after Strapi loads, so if we get here, tables should exist
    // But we can verify and log status
    try {
      const db = strapi.db;
      if (db && db.connection) {
        // Check if categories table exists
        const result = await db.connection.raw(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'categories'
          );
        `);
        
        const tableExists = result.rows?.[0]?.exists;
        if (!tableExists) {
          strapi.log.warn('⚠️  Categories table does not exist. Schema may need to be synced.');
          strapi.log.warn('⚠️  Try running: npm run develop (once) to create tables');
        } else {
          strapi.log.info('✅ Database tables verified');
        }
      }
    } catch (error) {
      // Ignore errors during bootstrap check
      strapi.log.warn('⚠️  Could not verify database tables:', error.message);
    }
  },
};
