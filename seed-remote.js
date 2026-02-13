require('dotenv').config();
const { execSync } = require('child_process');

console.log('🌱 Seeding remote database on Render...');
console.log('📊 This will add 120+ countries and 1200+ cities');
console.log('');

try {
  const DATABASE_URL = process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env file');
    console.log('');
    console.log('Add this to your .env file:');
    console.log('DATABASE_URL=<your_render_postgres_url>');
    process.exit(1);
  }

  console.log('🔗 Connecting to remote database...');
  console.log(`📍 Host: ${DATABASE_URL.split('@')[1]?.split('/')[0]}`);
  console.log('');
  
  execSync('node src/database/seedLarge.js', {
    stdio: 'inherit',
    env: { ...process.env }
  });

  console.log('');
  console.log('✅ Remote database seeded successfully!');
  console.log('🎉 Your API is ready with 1200+ records!');
  
} catch (error) {
  console.error('❌ Seeding failed:', error.message);
  process.exit(1);
}
