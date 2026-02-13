require('dotenv').config();
const axios = require('axios');
const { Country, City } = require('../models');
const sequelize = require('../config/database');

const importCountriesFromAPI = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('🔄 Fetching data from REST Countries API...');
    
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;
    
    console.log(`📥 Received ${countries.length} countries`);
    console.log('💾 Importing into database...');
    
    let imported = 0;
    let skipped = 0;
    let errors = 0;
    
    for (const country of countries) {
      try {
        const existing = await Country.findOne({
          where: { code: country.cca2 }
        });
        
        if (existing) {
          skipped++;
          continue;
        }

        await Country.create({
          name: country.name.common,
          code: country.cca2,
          capital: country.capital?.[0] || null,
          population: country.population || 0,
          area: country.area || null,
          region: country.region || null,
          subregion: country.subregion || null,
          latitude: country.latlng?.[0] || null,
          longitude: country.latlng?.[1] || null,
          flag_url: country.flags?.svg || country.flags?.png || null
        });
        
        imported++;
        
        if (imported % 10 === 0) {
          process.stdout.write(`\rProgress: ${imported + skipped}/${countries.length} (Imported: ${imported}, Skipped: ${skipped})`);
        }
      } catch (error) {
        errors++;
        console.error(`\n❌ Error importing ${country.name.common}:`, error.message);
      }
    }
    
    console.log(`\n\n✅ Import completed!`);
    console.log(`   Total countries: ${countries.length}`);
    console.log(`   ✅ Imported: ${imported}`);
    console.log(`   ⏭️  Skipped (already exists): ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log('\n💡 Tip: Run "npm run db:seed" to add sample cities');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    process.exit(1);
  }
};

console.log(`
╔════════════════════════════════════════╗
║   Countries Data Import Utility        ║
║   Source: REST Countries API           ║
╚════════════════════════════════════════╝
`);

importCountriesFromAPI();
