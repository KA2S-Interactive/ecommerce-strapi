/**
 * Script to create database tables by running Strapi develop mode briefly
 * This will sync the schema and create all necessary tables
 */

const { spawn } = require('child_process');

console.log('🔄 Starting Strapi in develop mode to create database tables...');
console.log('⏳ This will take a moment. Please wait...\n');

// Start strapi develop
const strapiProcess = spawn('npm', ['run', 'develop'], {
  stdio: 'inherit',
  shell: true
});

// Set a timeout to stop after tables are created (or after 2 minutes)
const timeout = setTimeout(() => {
  console.log('\n⏰ Timeout reached. Stopping Strapi...');
  console.log('✅ Tables should be created. You can now use "npm start"');
  strapiProcess.kill('SIGINT');
  process.exit(0);
}, 120000); // 2 minutes

strapiProcess.on('exit', (code) => {
  clearTimeout(timeout);
  if (code === 0 || code === null) {
    console.log('\n✅ Strapi stopped. Tables should be created.');
    console.log('✅ You can now use "npm start" to run in production mode');
  } else {
    console.log(`\n⚠️  Strapi exited with code ${code}`);
    console.log('⚠️  Check the output above for any errors');
  }
  process.exit(0);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  clearTimeout(timeout);
  strapiProcess.kill('SIGINT');
  console.log('\n✅ Process interrupted. Tables may have been created.');
  process.exit(0);
});

