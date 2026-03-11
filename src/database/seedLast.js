require('dotenv').config();
const { Country, City } = require('../models');

const lastBatch = [
  { code: 'AR', cities: [
    { name: 'Salta', population: 618000, latitude: -24.7829, longitude: -65.4117, is_capital: false },
    { name: 'Neuquen', population: 291000, latitude: -38.9516, longitude: -68.0591, is_capital: false },
    { name: 'Bahia Blanca', population: 301531, latitude: -38.7183, longitude: -62.2663, is_capital: false },
    { name: 'Corrientes', population: 352374, latitude: -27.4806, longitude: -58.8341, is_capital: false },
    { name: 'Resistencia', population: 290723, latitude: -27.4513, longitude: -58.9867, is_capital: false },
  ]},
  { code: 'PE', cities: [
    { name: 'Cusco', population: 428450, latitude: -13.5320, longitude: -71.9675, is_capital: false },
    { name: 'Chiclayo', population: 600440, latitude: -6.7714, longitude: -79.8409, is_capital: false },
    { name: 'Piura', population: 473025, latitude: -5.1945, longitude: -80.6328, is_capital: false },
    { name: 'Iquitos', population: 437376, latitude: -3.7491, longitude: -73.2538, is_capital: false },
    { name: 'Huancayo', population: 380000, latitude: -12.0651, longitude: -75.2049, is_capital: false },
  ]},
  { code: 'VE', cities: [
    { name: 'Barquisimeto', population: 1120000, latitude: 10.0678, longitude: -69.3581, is_capital: false },
    { name: 'Ciudad Guayana', population: 901000, latitude: 8.3536, longitude: -62.6496, is_capital: false },
    { name: 'Ciudad Bolivar', population: 338000, latitude: 8.1291, longitude: -63.5409, is_capital: false },
    { name: 'Merida', population: 300000, latitude: 8.5897, longitude: -71.1561, is_capital: false },
  ]},
  { code: 'CL', cities: [
    { name: 'Antofagasta', population: 361873, latitude: -23.6509, longitude: -70.3975, is_capital: false },
    { name: 'Temuco', population: 302931, latitude: -38.7359, longitude: -72.5904, is_capital: false },
    { name: 'Rancagua', population: 241774, latitude: -34.1709, longitude: -70.7406, is_capital: false },
    { name: 'Talca', population: 201797, latitude: -35.4269, longitude: -71.6556, is_capital: false },
  ]},
  { code: 'AU', cities: [
    { name: 'Darwin', population: 147255, latitude: -12.4634, longitude: 130.8456, is_capital: false },
    { name: 'Hobart', population: 240342, latitude: -42.8821, longitude: 147.3272, is_capital: false },
    { name: 'Cairns', population: 153075, latitude: -16.9186, longitude: 145.7781, is_capital: false },
    { name: 'Townsville', population: 196219, latitude: -19.2590, longitude: 146.8169, is_capital: false },
    { name: 'Geelong', population: 272681, latitude: -38.1499, longitude: 144.3617, is_capital: false },
  ]},
  { code: 'CA', cities: [
    { name: 'London', population: 383822, latitude: 42.9849, longitude: -81.2453, is_capital: false },
    { name: 'Victoria', population: 367770, latitude: 48.4284, longitude: -123.3656, is_capital: false },
    { name: 'Kitchener', population: 256885, latitude: 43.4516, longitude: -80.4925, is_capital: false },
    { name: 'St. John\'s', population: 213000, latitude: 47.5615, longitude: -52.7126, is_capital: false },
    { name: 'Saskatoon', population: 317480, latitude: 52.1579, longitude: -106.6702, is_capital: false },
  ]},
  { code: 'UA', cities: [
    { name: 'Dnipro', population: 993094, latitude: 48.4647, longitude: 35.0462, is_capital: false },
    { name: 'Donetsk', population: 929063, latitude: 48.0159, longitude: 37.8029, is_capital: false },
    { name: 'Zaporizhzhia', population: 722713, latitude: 47.8388, longitude: 35.1396, is_capital: false },
    { name: 'Lviv', population: 721301, latitude: 49.8397, longitude: 24.0297, is_capital: false },
  ]},
  { code: 'TH', cities: [
    { name: 'Hat Yai', population: 159130, latitude: 7.0037, longitude: 100.4747, is_capital: false },
    { name: 'Nakhon Si Thammarat', population: 126535, latitude: 8.4308, longitude: 99.9637, is_capital: false },
    { name: 'Ubon Ratchathani', population: 113908, latitude: 15.2287, longitude: 104.8567, is_capital: false },
    { name: 'Chiang Rai', population: 79000, latitude: 19.9105, longitude: 99.8325, is_capital: false },
  ]},
  { code: 'VN', cities: [
    { name: 'Buon Ma Thuot', population: 340000, latitude: 12.6680, longitude: 108.0514, is_capital: false },
    { name: 'Thai Nguyen', population: 330000, latitude: 21.5928, longitude: 105.8442, is_capital: false },
    { name: 'Nam Dinh', population: 255000, latitude: 20.4198, longitude: 106.1621, is_capital: false },
    { name: 'Quy Nhon', population: 284000, latitude: 13.7830, longitude: 109.2197, is_capital: false },
  ]},
  { code: 'MY', cities: [
    { name: 'Ipoh', population: 827318, latitude: 4.5975, longitude: 101.0901, is_capital: false },
    { name: 'Shah Alam', population: 650000, latitude: 3.0733, longitude: 101.5185, is_capital: false },
    { name: 'Petaling Jaya', population: 638516, latitude: 3.1073, longitude: 101.6067, is_capital: false },
    { name: 'Kuching', population: 570407, latitude: 1.5497, longitude: 110.3592, is_capital: false },
  ]},
  { code: 'PH', cities: [
    { name: 'Zamboanga City', population: 861799, latitude: 6.9214, longitude: 122.0790, is_capital: false },
    { name: 'Taguig', population: 804915, latitude: 14.5176, longitude: 121.0509, is_capital: false },
    { name: 'Antipolo', population: 776386, latitude: 14.5862, longitude: 121.1761, is_capital: false },
    { name: 'Pasig', population: 755300, latitude: 14.5764, longitude: 121.0851, is_capital: false },
  ]},
  { code: 'SA', cities: [
    { name: 'Khamis Mushait', population: 387553, latitude: 18.3007, longitude: 42.7296, is_capital: false },
    { name: 'Hail', population: 310897, latitude: 27.5114, longitude: 41.7208, is_capital: false },
    { name: 'Jubail', population: 237274, latitude: 27.0046, longitude: 49.6586, is_capital: false },
  ]},
  { code: 'AE', cities: [
    { name: 'Abu Dhabi Downtown', population: 300000, latitude: 24.4667, longitude: 54.3667, is_capital: false },
    { name: 'Khalifa City', population: 250000, latitude: 24.4239, longitude: 54.5773, is_capital: false },
    { name: 'Al Dhafra', population: 200000, latitude: 24.2500, longitude: 53.5833, is_capital: false },
  ]},
];

const run = async () => {
  try {
    console.log('Adding last batch of cities...\n');

    const allCountries = await Country.findAll({ raw: true });
    const countryMap = {};
    for (const c of allCountries) countryMap[c.code] = c.id;

    let totalInserted = 0;

    for (const entry of lastBatch) {
      const countryId = countryMap[entry.code];
      if (!countryId) continue;

      for (const cityData of entry.cities) {
        try {
          const [city, created] = await City.findOrCreate({
            where: { name: cityData.name, country_id: countryId },
            defaults: { ...cityData, country_id: countryId }
          });
          if (created) totalInserted++;
        } catch (err) {}
      }
    }

    console.log(`Cities inserted: ${totalInserted}`);

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
