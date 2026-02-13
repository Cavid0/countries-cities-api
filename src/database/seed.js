require('dotenv').config();
const { Country, City } = require('../models');

const sampleCountries = [
  {
    name: 'United States',
    code: 'US',
    capital: 'Washington, D.C.',
    population: 331002651,
    area: 9833520,
    region: 'Americas',
    subregion: 'Northern America',
    latitude: 37.0902,
    longitude: -95.7129,
    flag_url: 'https://flagcdn.com/us.svg'
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    capital: 'London',
    population: 67886011,
    area: 242900,
    region: 'Europe',
    subregion: 'Northern Europe',
    latitude: 55.3781,
    longitude: -3.4360,
    flag_url: 'https://flagcdn.com/gb.svg'
  },
  {
    name: 'Azerbaijan',
    code: 'AZ',
    capital: 'Baku',
    population: 10139177,
    area: 86600,
    region: 'Asia',
    subregion: 'Western Asia',
    latitude: 40.1431,
    longitude: 47.5769,
    flag_url: 'https://flagcdn.com/az.svg'
  },
  {
    name: 'Germany',
    code: 'DE',
    capital: 'Berlin',
    population: 83783942,
    area: 357114,
    region: 'Europe',
    subregion: 'Western Europe',
    latitude: 51.1657,
    longitude: 10.4515,
    flag_url: 'https://flagcdn.com/de.svg'
  },
  {
    name: 'France',
    code: 'FR',
    capital: 'Paris',
    population: 65273511,
    area: 551695,
    region: 'Europe',
    subregion: 'Western Europe',
    latitude: 46.2276,
    longitude: 2.2137,
    flag_url: 'https://flagcdn.com/fr.svg'
  },
  {
    name: 'Japan',
    code: 'JP',
    capital: 'Tokyo',
    population: 126476461,
    area: 377930,
    region: 'Asia',
    subregion: 'Eastern Asia',
    latitude: 36.2048,
    longitude: 138.2529,
    flag_url: 'https://flagcdn.com/jp.svg'
  },
  {
    name: 'Brazil',
    code: 'BR',
    capital: 'Brasília',
    population: 212559417,
    area: 8515767,
    region: 'Americas',
    subregion: 'South America',
    latitude: -14.2350,
    longitude: -51.9253,
    flag_url: 'https://flagcdn.com/br.svg'
  },
  {
    name: 'Australia',
    code: 'AU',
    capital: 'Canberra',
    population: 25499884,
    area: 7692024,
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    latitude: -25.2744,
    longitude: 133.7751,
    flag_url: 'https://flagcdn.com/au.svg'
  },
  {
    name: 'Canada',
    code: 'CA',
    capital: 'Ottawa',
    population: 37742154,
    area: 9984670,
    region: 'Americas',
    subregion: 'Northern America',
    latitude: 56.1304,
    longitude: -106.3468,
    flag_url: 'https://flagcdn.com/ca.svg'
  },
  {
    name: 'Turkey',
    code: 'TR',
    capital: 'Ankara',
    population: 84339067,
    area: 783562,
    region: 'Asia',
    subregion: 'Western Asia',
    latitude: 38.9637,
    longitude: 35.2433,
    flag_url: 'https://flagcdn.com/tr.svg'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    const existingCountries = await Country.count();
    
    if (existingCountries > 0) {
      console.log(`ℹ️  Database already contains ${existingCountries} countries.`);
      console.log('   Skipping seeding to prevent duplicates.');
      console.log('   If you want to re-seed, please clear the database first.');
      process.exit(0);
    }

    console.log('📝 Inserting countries...');
    const insertedCountries = await Country.bulkCreate(sampleCountries);
    console.log(`✅ Inserted ${insertedCountries.length} countries.`);

    console.log('📝 Inserting cities...');
    const sampleCities = [
      { name: 'New York', country_id: insertedCountries[0].id, population: 8336817, latitude: 40.7128, longitude: -74.0060, is_capital: false },
      { name: 'Los Angeles', country_id: insertedCountries[0].id, population: 3979576, latitude: 34.0522, longitude: -118.2437, is_capital: false },
      { name: 'Chicago', country_id: insertedCountries[0].id, population: 2693976, latitude: 41.8781, longitude: -87.6298, is_capital: false },
      { name: 'Washington, D.C.', country_id: insertedCountries[0].id, population: 705749, latitude: 38.9072, longitude: -77.0369, is_capital: true },
      
      { name: 'London', country_id: insertedCountries[1].id, population: 8982000, latitude: 51.5074, longitude: -0.1278, is_capital: true },
      { name: 'Manchester', country_id: insertedCountries[1].id, population: 547627, latitude: 53.4808, longitude: -2.2426, is_capital: false },
      { name: 'Birmingham', country_id: insertedCountries[1].id, population: 1141816, latitude: 52.4862, longitude: -1.8904, is_capital: false },
      
      { name: 'Baku', country_id: insertedCountries[2].id, population: 2293200, latitude: 40.4093, longitude: 49.8671, is_capital: true },
      { name: 'Ganja', country_id: insertedCountries[2].id, population: 332600, latitude: 40.6828, longitude: 46.3606, is_capital: false },
      { name: 'Sumqayit', country_id: insertedCountries[2].id, population: 341200, latitude: 40.5892, longitude: 49.6686, is_capital: false },
      
      { name: 'Berlin', country_id: insertedCountries[3].id, population: 3769495, latitude: 52.5200, longitude: 13.4050, is_capital: true },
      { name: 'Munich', country_id: insertedCountries[3].id, population: 1471508, latitude: 48.1351, longitude: 11.5820, is_capital: false },
      { name: 'Hamburg', country_id: insertedCountries[3].id, population: 1841179, latitude: 53.5511, longitude: 9.9937, is_capital: false },
      
      { name: 'Paris', country_id: insertedCountries[4].id, population: 2165423, latitude: 48.8566, longitude: 2.3522, is_capital: true },
      { name: 'Marseille', country_id: insertedCountries[4].id, population: 869815, latitude: 43.2965, longitude: 5.3698, is_capital: false },
      { name: 'Lyon', country_id: insertedCountries[4].id, population: 513275, latitude: 45.7640, longitude: 4.8357, is_capital: false },
      
      { name: 'Tokyo', country_id: insertedCountries[5].id, population: 13960000, latitude: 35.6762, longitude: 139.6503, is_capital: true },
      { name: 'Osaka', country_id: insertedCountries[5].id, population: 2725006, latitude: 34.6937, longitude: 135.5023, is_capital: false },
      { name: 'Kyoto', country_id: insertedCountries[5].id, population: 1475183, latitude: 35.0116, longitude: 135.7681, is_capital: false }
    ];

    const insertedCities = await City.bulkCreate(sampleCities);
    console.log(`✅ Inserted ${insertedCities.length} cities.`);

    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Total: ${insertedCountries.length} countries and ${insertedCities.length} cities`);
    console.log('');
    console.log('⚠️  NOTE: This is sample data. For production, you should:');
    console.log('   1. Download a complete dataset (1000+ records)');
    console.log('   2. Update this seed script to import the full dataset');
    console.log('   3. See README.md for recommended data sources');

    process.exit(0);

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
