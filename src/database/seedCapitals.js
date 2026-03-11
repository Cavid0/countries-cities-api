require('dotenv').config();
const { Country, City } = require('../models');

const run = async () => {
  try {
    console.log('Adding capital cities for all countries...\n');

    const countries = await Country.findAll({ raw: true });
    let inserted = 0;

    for (const country of countries) {
      if (!country.capital) continue;

      try {
        const [city, created] = await City.findOrCreate({
          where: { name: country.capital, country_id: country.id },
          defaults: {
            name: country.capital,
            country_id: country.id,
            population: Math.floor(country.population * 0.1) || 50000,
            latitude: country.latitude,
            longitude: country.longitude,
            is_capital: true
          }
        });
        if (created) inserted++;
      } catch (err) {}
    }

    console.log(`Capital cities inserted: ${inserted}`);

    const totalCountries = await Country.count();
    const totalCities = await City.count();
    console.log(`\nTOTAL: ${totalCountries} countries + ${totalCities} cities = ${totalCountries + totalCities} records`);
    process.exit(0);
  } catch (error) {
    console.error('Failed:', error);
    process.exit(1);
  }
};

run();
