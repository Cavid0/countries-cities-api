require('dotenv').config();
const { Country, City } = require('../models');

const additionalCountries = [
  { name: 'India', code: 'IN', capital: 'New Delhi', population: 1380004385, area: 3287263, region: 'Asia', subregion: 'Southern Asia', latitude: 20.5937, longitude: 78.9629, flag_url: 'https://flagcdn.com/in.svg' },
  { name: 'China', code: 'CN', capital: 'Beijing', population: 1439323776, area: 9596961, region: 'Asia', subregion: 'Eastern Asia', latitude: 35.8617, longitude: 104.1954, flag_url: 'https://flagcdn.com/cn.svg' },
  { name: 'Russia', code: 'RU', capital: 'Moscow', population: 145934462, area: 17098242, region: 'Europe', subregion: 'Eastern Europe', latitude: 61.5240, longitude: 105.3188, flag_url: 'https://flagcdn.com/ru.svg' },
  { name: 'South Korea', code: 'KR', capital: 'Seoul', population: 51269185, area: 100210, region: 'Asia', subregion: 'Eastern Asia', latitude: 35.9078, longitude: 127.7669, flag_url: 'https://flagcdn.com/kr.svg' },
  { name: 'Italy', code: 'IT', capital: 'Rome', population: 60461826, area: 301336, region: 'Europe', subregion: 'Southern Europe', latitude: 41.8719, longitude: 12.5674, flag_url: 'https://flagcdn.com/it.svg' },
  { name: 'Spain', code: 'ES', capital: 'Madrid', population: 46754778, area: 505992, region: 'Europe', subregion: 'Southern Europe', latitude: 40.4637, longitude: -3.7492, flag_url: 'https://flagcdn.com/es.svg' },
  { name: 'Mexico', code: 'MX', capital: 'Mexico City', population: 128932753, area: 1964375, region: 'Americas', subregion: 'Central America', latitude: 23.6345, longitude: -102.5528, flag_url: 'https://flagcdn.com/mx.svg' },
  { name: 'Indonesia', code: 'ID', capital: 'Jakarta', population: 273523615, area: 1904569, region: 'Asia', subregion: 'South-Eastern Asia', latitude: -0.7893, longitude: 113.9213, flag_url: 'https://flagcdn.com/id.svg' },
  { name: 'Netherlands', code: 'NL', capital: 'Amsterdam', population: 17134872, area: 41850, region: 'Europe', subregion: 'Western Europe', latitude: 52.1326, longitude: 5.2913, flag_url: 'https://flagcdn.com/nl.svg' },
  { name: 'Switzerland', code: 'CH', capital: 'Bern', population: 8654622, area: 41284, region: 'Europe', subregion: 'Western Europe', latitude: 46.8182, longitude: 8.2275, flag_url: 'https://flagcdn.com/ch.svg' },
  { name: 'Sweden', code: 'SE', capital: 'Stockholm', population: 10099265, area: 450295, region: 'Europe', subregion: 'Northern Europe', latitude: 60.1282, longitude: 18.6435, flag_url: 'https://flagcdn.com/se.svg' },
  { name: 'Norway', code: 'NO', capital: 'Oslo', population: 5421241, area: 323802, region: 'Europe', subregion: 'Northern Europe', latitude: 60.4720, longitude: 8.4689, flag_url: 'https://flagcdn.com/no.svg' },
  { name: 'Poland', code: 'PL', capital: 'Warsaw', population: 37846611, area: 312679, region: 'Europe', subregion: 'Central Europe', latitude: 51.9194, longitude: 19.1451, flag_url: 'https://flagcdn.com/pl.svg' },
  { name: 'Argentina', code: 'AR', capital: 'Buenos Aires', population: 45195774, area: 2780400, region: 'Americas', subregion: 'South America', latitude: -38.4161, longitude: -63.6167, flag_url: 'https://flagcdn.com/ar.svg' },
  { name: 'Egypt', code: 'EG', capital: 'Cairo', population: 102334404, area: 1002450, region: 'Africa', subregion: 'Northern Africa', latitude: 26.8206, longitude: 30.8025, flag_url: 'https://flagcdn.com/eg.svg' },
  { name: 'South Africa', code: 'ZA', capital: 'Pretoria', population: 59308690, area: 1221037, region: 'Africa', subregion: 'Southern Africa', latitude: -30.5595, longitude: 22.9375, flag_url: 'https://flagcdn.com/za.svg' },
  { name: 'Nigeria', code: 'NG', capital: 'Abuja', population: 206139589, area: 923768, region: 'Africa', subregion: 'Western Africa', latitude: 9.0820, longitude: 8.6753, flag_url: 'https://flagcdn.com/ng.svg' },
  { name: 'Saudi Arabia', code: 'SA', capital: 'Riyadh', population: 34813871, area: 2149690, region: 'Asia', subregion: 'Western Asia', latitude: 23.8859, longitude: 45.0792, flag_url: 'https://flagcdn.com/sa.svg' },
  { name: 'United Arab Emirates', code: 'AE', capital: 'Abu Dhabi', population: 9890402, area: 83600, region: 'Asia', subregion: 'Western Asia', latitude: 23.4241, longitude: 53.8478, flag_url: 'https://flagcdn.com/ae.svg' },
  { name: 'Thailand', code: 'TH', capital: 'Bangkok', population: 69799978, area: 513120, region: 'Asia', subregion: 'South-Eastern Asia', latitude: 15.8700, longitude: 100.9925, flag_url: 'https://flagcdn.com/th.svg' },
  { name: 'Vietnam', code: 'VN', capital: 'Hanoi', population: 97338579, area: 331212, region: 'Asia', subregion: 'South-Eastern Asia', latitude: 14.0583, longitude: 108.2772, flag_url: 'https://flagcdn.com/vn.svg' },
  { name: 'Pakistan', code: 'PK', capital: 'Islamabad', population: 220892340, area: 881912, region: 'Asia', subregion: 'Southern Asia', latitude: 30.3753, longitude: 69.3451, flag_url: 'https://flagcdn.com/pk.svg' },
  { name: 'Bangladesh', code: 'BD', capital: 'Dhaka', population: 164689383, area: 147570, region: 'Asia', subregion: 'Southern Asia', latitude: 23.6850, longitude: 90.3563, flag_url: 'https://flagcdn.com/bd.svg' },
  { name: 'Iran', code: 'IR', capital: 'Tehran', population: 83992949, area: 1648195, region: 'Asia', subregion: 'Southern Asia', latitude: 32.4279, longitude: 53.6880, flag_url: 'https://flagcdn.com/ir.svg' },
  { name: 'Colombia', code: 'CO', capital: 'Bogota', population: 50882891, area: 1141748, region: 'Americas', subregion: 'South America', latitude: 4.5709, longitude: -74.2973, flag_url: 'https://flagcdn.com/co.svg' },
  { name: 'Chile', code: 'CL', capital: 'Santiago', population: 19116201, area: 756102, region: 'Americas', subregion: 'South America', latitude: -35.6751, longitude: -71.5430, flag_url: 'https://flagcdn.com/cl.svg' },
  { name: 'Peru', code: 'PE', capital: 'Lima', population: 32971854, area: 1285216, region: 'Americas', subregion: 'South America', latitude: -9.1900, longitude: -75.0152, flag_url: 'https://flagcdn.com/pe.svg' },
  { name: 'Ukraine', code: 'UA', capital: 'Kyiv', population: 43733762, area: 603500, region: 'Europe', subregion: 'Eastern Europe', latitude: 48.3794, longitude: 31.1656, flag_url: 'https://flagcdn.com/ua.svg' },
  { name: 'Czech Republic', code: 'CZ', capital: 'Prague', population: 10708981, area: 78865, region: 'Europe', subregion: 'Central Europe', latitude: 49.8175, longitude: 15.4730, flag_url: 'https://flagcdn.com/cz.svg' },
  { name: 'Austria', code: 'AT', capital: 'Vienna', population: 9006398, area: 83871, region: 'Europe', subregion: 'Western Europe', latitude: 47.5162, longitude: 14.5501, flag_url: 'https://flagcdn.com/at.svg' },
  { name: 'Portugal', code: 'PT', capital: 'Lisbon', population: 10196709, area: 92090, region: 'Europe', subregion: 'Southern Europe', latitude: 39.3999, longitude: -8.2245, flag_url: 'https://flagcdn.com/pt.svg' },
  { name: 'Greece', code: 'GR', capital: 'Athens', population: 10423054, area: 131957, region: 'Europe', subregion: 'Southern Europe', latitude: 39.0742, longitude: 21.8243, flag_url: 'https://flagcdn.com/gr.svg' },
  { name: 'Denmark', code: 'DK', capital: 'Copenhagen', population: 5792202, area: 43094, region: 'Europe', subregion: 'Northern Europe', latitude: 56.2639, longitude: 9.5018, flag_url: 'https://flagcdn.com/dk.svg' },
  { name: 'Finland', code: 'FI', capital: 'Helsinki', population: 5540720, area: 338424, region: 'Europe', subregion: 'Northern Europe', latitude: 61.9241, longitude: 25.7482, flag_url: 'https://flagcdn.com/fi.svg' },
  { name: 'Ireland', code: 'IE', capital: 'Dublin', population: 4937786, area: 70273, region: 'Europe', subregion: 'Northern Europe', latitude: 53.1424, longitude: -7.6921, flag_url: 'https://flagcdn.com/ie.svg' },
  { name: 'New Zealand', code: 'NZ', capital: 'Wellington', population: 4822233, area: 270467, region: 'Oceania', subregion: 'Australia and New Zealand', latitude: -40.9006, longitude: 174.8860, flag_url: 'https://flagcdn.com/nz.svg' },
  { name: 'Singapore', code: 'SG', capital: 'Singapore', population: 5850342, area: 710, region: 'Asia', subregion: 'South-Eastern Asia', latitude: 1.3521, longitude: 103.8198, flag_url: 'https://flagcdn.com/sg.svg' },
  { name: 'Malaysia', code: 'MY', capital: 'Kuala Lumpur', population: 32365999, area: 330803, region: 'Asia', subregion: 'South-Eastern Asia', latitude: 4.2105, longitude: 101.9758, flag_url: 'https://flagcdn.com/my.svg' },
  { name: 'Philippines', code: 'PH', capital: 'Manila', population: 109581078, area: 342353, region: 'Asia', subregion: 'South-Eastern Asia', latitude: 12.8797, longitude: 121.7740, flag_url: 'https://flagcdn.com/ph.svg' },
  { name: 'Kenya', code: 'KE', capital: 'Nairobi', population: 53771296, area: 580367, region: 'Africa', subregion: 'Eastern Africa', latitude: -0.0236, longitude: 37.9062, flag_url: 'https://flagcdn.com/ke.svg' },
  { name: 'Morocco', code: 'MA', capital: 'Rabat', population: 36910560, area: 446550, region: 'Africa', subregion: 'Northern Africa', latitude: 31.7917, longitude: -7.0926, flag_url: 'https://flagcdn.com/ma.svg' },
  { name: 'Georgia', code: 'GE', capital: 'Tbilisi', population: 3989167, area: 69700, region: 'Asia', subregion: 'Western Asia', latitude: 42.3154, longitude: 43.3569, flag_url: 'https://flagcdn.com/ge.svg' },
  { name: 'Israel', code: 'IL', capital: 'Jerusalem', population: 8655535, area: 20770, region: 'Asia', subregion: 'Western Asia', latitude: 31.0461, longitude: 34.8516, flag_url: 'https://flagcdn.com/il.svg' },
  { name: 'Cuba', code: 'CU', capital: 'Havana', population: 11326616, area: 109884, region: 'Americas', subregion: 'Caribbean', latitude: 21.5218, longitude: -77.7812, flag_url: 'https://flagcdn.com/cu.svg' },
  { name: 'Iceland', code: 'IS', capital: 'Reykjavik', population: 341243, area: 103000, region: 'Europe', subregion: 'Northern Europe', latitude: 64.9631, longitude: -19.0208, flag_url: 'https://flagcdn.com/is.svg' },
];

const seedMoreData = async () => {
  try {
    console.log('Adding more countries and cities...\n');

    const countryMap = {};

    for (const countryData of additionalCountries) {
      try {
        const [country, created] = await Country.findOrCreate({
          where: { code: countryData.code },
          defaults: countryData
        });
        countryMap[countryData.code] = country.id;
        if (created) {
          console.log(`  + ${countryData.name}`);
        } else {
          console.log(`  ~ ${countryData.name} (already exists)`);
          countryMap[countryData.code] = country.id;
        }
      } catch (err) {
        console.log(`  ! ${countryData.name} - ${err.message}`);
      }
    }

    const existingCountries = await Country.findAll({ raw: true });
    for (const c of existingCountries) {
      countryMap[c.code] = c.id;
    }

    console.log(`\nTotal countries in map: ${Object.keys(countryMap).length}`);

    const additionalCities = [
      { name: 'New Delhi', country_code: 'IN', population: 21002000, latitude: 28.6139, longitude: 77.2090, is_capital: true },
      { name: 'Mumbai', country_code: 'IN', population: 20411000, latitude: 19.0760, longitude: 72.8777, is_capital: false },
      { name: 'Bangalore', country_code: 'IN', population: 12327000, latitude: 12.9716, longitude: 77.5946, is_capital: false },
      { name: 'Kolkata', country_code: 'IN', population: 14850000, latitude: 22.5726, longitude: 88.3639, is_capital: false },
      { name: 'Chennai', country_code: 'IN', population: 10971000, latitude: 13.0827, longitude: 80.2707, is_capital: false },

      { name: 'Beijing', country_code: 'CN', population: 21540000, latitude: 39.9042, longitude: 116.4074, is_capital: true },
      { name: 'Shanghai', country_code: 'CN', population: 27058000, latitude: 31.2304, longitude: 121.4737, is_capital: false },
      { name: 'Guangzhou', country_code: 'CN', population: 13500000, latitude: 23.1291, longitude: 113.2644, is_capital: false },
      { name: 'Shenzhen', country_code: 'CN', population: 12590000, latitude: 22.5431, longitude: 114.0579, is_capital: false },
      { name: 'Chengdu', country_code: 'CN', population: 10110000, latitude: 30.5728, longitude: 104.0668, is_capital: false },

      { name: 'Moscow', country_code: 'RU', population: 12506000, latitude: 55.7558, longitude: 37.6173, is_capital: true },
      { name: 'Saint Petersburg', country_code: 'RU', population: 5383000, latitude: 59.9311, longitude: 30.3609, is_capital: false },
      { name: 'Novosibirsk', country_code: 'RU', population: 1625000, latitude: 55.0084, longitude: 82.9357, is_capital: false },
      { name: 'Yekaterinburg', country_code: 'RU', population: 1495000, latitude: 56.8389, longitude: 60.6057, is_capital: false },

      { name: 'Seoul', country_code: 'KR', population: 9776000, latitude: 37.5665, longitude: 126.9780, is_capital: true },
      { name: 'Busan', country_code: 'KR', population: 3429000, latitude: 35.1796, longitude: 129.0756, is_capital: false },
      { name: 'Incheon', country_code: 'KR', population: 2957000, latitude: 37.4563, longitude: 126.7052, is_capital: false },

      { name: 'Rome', country_code: 'IT', population: 4342000, latitude: 41.9028, longitude: 12.4964, is_capital: true },
      { name: 'Milan', country_code: 'IT', population: 3140000, latitude: 45.4642, longitude: 9.1900, is_capital: false },
      { name: 'Naples', country_code: 'IT', population: 2187000, latitude: 40.8518, longitude: 14.2681, is_capital: false },
      { name: 'Florence', country_code: 'IT', population: 709000, latitude: 43.7696, longitude: 11.2558, is_capital: false },
      { name: 'Venice', country_code: 'IT', population: 631000, latitude: 45.4408, longitude: 12.3155, is_capital: false },

      { name: 'Madrid', country_code: 'ES', population: 6642000, latitude: 40.4168, longitude: -3.7038, is_capital: true },
      { name: 'Barcelona', country_code: 'ES', population: 5575000, latitude: 41.3874, longitude: 2.1686, is_capital: false },
      { name: 'Valencia', country_code: 'ES', population: 1564000, latitude: 39.4699, longitude: -0.3763, is_capital: false },
      { name: 'Seville', country_code: 'ES', population: 1107000, latitude: 37.3891, longitude: -5.9845, is_capital: false },

      { name: 'Mexico City', country_code: 'MX', population: 21782000, latitude: 19.4326, longitude: -99.1332, is_capital: true },
      { name: 'Guadalajara', country_code: 'MX', population: 5023000, latitude: 20.6597, longitude: -103.3496, is_capital: false },
      { name: 'Monterrey', country_code: 'MX', population: 4874000, latitude: 25.6866, longitude: -100.3161, is_capital: false },
      { name: 'Cancun', country_code: 'MX', population: 888000, latitude: 21.1619, longitude: -86.8515, is_capital: false },

      { name: 'Jakarta', country_code: 'ID', population: 10770000, latitude: -6.2088, longitude: 106.8456, is_capital: true },
      { name: 'Surabaya', country_code: 'ID', population: 2874000, latitude: -7.2575, longitude: 112.7521, is_capital: false },
      { name: 'Bandung', country_code: 'ID', population: 2575000, latitude: -6.9175, longitude: 107.6191, is_capital: false },
      { name: 'Bali', country_code: 'ID', population: 4320000, latitude: -8.3405, longitude: 115.0920, is_capital: false },

      { name: 'Amsterdam', country_code: 'NL', population: 872757, latitude: 52.3676, longitude: 4.9041, is_capital: true },
      { name: 'Rotterdam', country_code: 'NL', population: 651446, latitude: 51.9244, longitude: 4.4777, is_capital: false },
      { name: 'The Hague', country_code: 'NL', population: 545163, latitude: 52.0705, longitude: 4.3007, is_capital: false },

      { name: 'Bern', country_code: 'CH', population: 133883, latitude: 46.9480, longitude: 7.4474, is_capital: true },
      { name: 'Zurich', country_code: 'CH', population: 421878, latitude: 47.3769, longitude: 8.5417, is_capital: false },
      { name: 'Geneva', country_code: 'CH', population: 203856, latitude: 46.2044, longitude: 6.1432, is_capital: false },

      { name: 'Stockholm', country_code: 'SE', population: 975904, latitude: 59.3293, longitude: 18.0686, is_capital: true },
      { name: 'Gothenburg', country_code: 'SE', population: 583056, latitude: 57.7089, longitude: 11.9746, is_capital: false },
      { name: 'Malmo', country_code: 'SE', population: 347949, latitude: 55.6049, longitude: 13.0038, is_capital: false },

      { name: 'Oslo', country_code: 'NO', population: 693494, latitude: 59.9139, longitude: 10.7522, is_capital: true },
      { name: 'Bergen', country_code: 'NO', population: 283929, latitude: 60.3913, longitude: 5.3221, is_capital: false },

      { name: 'Warsaw', country_code: 'PL', population: 1793579, latitude: 52.2297, longitude: 21.0122, is_capital: true },
      { name: 'Krakow', country_code: 'PL', population: 779115, latitude: 50.0647, longitude: 19.9450, is_capital: false },
      { name: 'Wroclaw', country_code: 'PL', population: 642869, latitude: 51.1079, longitude: 17.0385, is_capital: false },

      { name: 'Buenos Aires', country_code: 'AR', population: 15024000, latitude: -34.6037, longitude: -58.3816, is_capital: true },
      { name: 'Cordoba', country_code: 'AR', population: 1535000, latitude: -31.4201, longitude: -64.1888, is_capital: false },
      { name: 'Rosario', country_code: 'AR', population: 1276000, latitude: -32.9468, longitude: -60.6393, is_capital: false },

      { name: 'Cairo', country_code: 'EG', population: 20901000, latitude: 30.0444, longitude: 31.2357, is_capital: true },
      { name: 'Alexandria', country_code: 'EG', population: 5200000, latitude: 31.2001, longitude: 29.9187, is_capital: false },
      { name: 'Giza', country_code: 'EG', population: 4146000, latitude: 30.0131, longitude: 31.2089, is_capital: false },

      { name: 'Pretoria', country_code: 'ZA', population: 2473000, latitude: -25.7479, longitude: 28.2293, is_capital: true },
      { name: 'Johannesburg', country_code: 'ZA', population: 5783000, latitude: -26.2041, longitude: 28.0473, is_capital: false },
      { name: 'Cape Town', country_code: 'ZA', population: 4618000, latitude: -33.9249, longitude: 18.4241, is_capital: false },
      { name: 'Durban', country_code: 'ZA', population: 3720000, latitude: -29.8587, longitude: 31.0218, is_capital: false },

      { name: 'Abuja', country_code: 'NG', population: 3278000, latitude: 9.0765, longitude: 7.3986, is_capital: true },
      { name: 'Lagos', country_code: 'NG', population: 15388000, latitude: 6.5244, longitude: 3.3792, is_capital: false },
      { name: 'Kano', country_code: 'NG', population: 4103000, latitude: 12.0022, longitude: 8.5920, is_capital: false },

      { name: 'Riyadh', country_code: 'SA', population: 7676654, latitude: 24.7136, longitude: 46.6753, is_capital: true },
      { name: 'Jeddah', country_code: 'SA', population: 4610000, latitude: 21.4858, longitude: 39.1925, is_capital: false },
      { name: 'Mecca', country_code: 'SA', population: 2042000, latitude: 21.3891, longitude: 39.8579, is_capital: false },

      { name: 'Abu Dhabi', country_code: 'AE', population: 1483000, latitude: 24.4539, longitude: 54.3773, is_capital: true },
      { name: 'Dubai', country_code: 'AE', population: 3331000, latitude: 25.2048, longitude: 55.2708, is_capital: false },
      { name: 'Sharjah', country_code: 'AE', population: 1684000, latitude: 25.3463, longitude: 55.4209, is_capital: false },

      { name: 'Bangkok', country_code: 'TH', population: 10539000, latitude: 13.7563, longitude: 100.5018, is_capital: true },
      { name: 'Chiang Mai', country_code: 'TH', population: 1203000, latitude: 18.7061, longitude: 98.9817, is_capital: false },
      { name: 'Phuket', country_code: 'TH', population: 416582, latitude: 7.8804, longitude: 98.3923, is_capital: false },

      { name: 'Hanoi', country_code: 'VN', population: 8054000, latitude: 21.0278, longitude: 105.8342, is_capital: true },
      { name: 'Ho Chi Minh City', country_code: 'VN', population: 8993000, latitude: 10.8231, longitude: 106.6297, is_capital: false },
      { name: 'Da Nang', country_code: 'VN', population: 1134000, latitude: 16.0544, longitude: 108.2022, is_capital: false },

      { name: 'Islamabad', country_code: 'PK', population: 1095000, latitude: 33.6844, longitude: 73.0479, is_capital: true },
      { name: 'Karachi', country_code: 'PK', population: 16094000, latitude: 24.8607, longitude: 67.0011, is_capital: false },
      { name: 'Lahore', country_code: 'PK', population: 12642000, latitude: 31.5204, longitude: 74.3587, is_capital: false },

      { name: 'Dhaka', country_code: 'BD', population: 21741000, latitude: 23.8103, longitude: 90.4125, is_capital: true },
      { name: 'Chittagong', country_code: 'BD', population: 5020000, latitude: 22.3569, longitude: 91.7832, is_capital: false },

      { name: 'Tehran', country_code: 'IR', population: 9040000, latitude: 35.6892, longitude: 51.3890, is_capital: true },
      { name: 'Isfahan', country_code: 'IR', population: 2074000, latitude: 32.6546, longitude: 51.6680, is_capital: false },
      { name: 'Shiraz', country_code: 'IR', population: 1565000, latitude: 29.5918, longitude: 52.5837, is_capital: false },

      { name: 'Bogota', country_code: 'CO', population: 10978000, latitude: 4.7110, longitude: -74.0721, is_capital: true },
      { name: 'Medellin', country_code: 'CO', population: 3934000, latitude: 6.2476, longitude: -75.5658, is_capital: false },
      { name: 'Cali', country_code: 'CO', population: 2880000, latitude: 3.4516, longitude: -76.5320, is_capital: false },

      { name: 'Santiago', country_code: 'CL', population: 6680000, latitude: -33.4489, longitude: -70.6693, is_capital: true },
      { name: 'Valparaiso', country_code: 'CL', population: 967000, latitude: -33.0472, longitude: -71.6127, is_capital: false },

      { name: 'Lima', country_code: 'PE', population: 10719000, latitude: -12.0464, longitude: -77.0428, is_capital: true },
      { name: 'Cusco', country_code: 'PE', population: 428000, latitude: -13.5320, longitude: -71.9675, is_capital: false },

      { name: 'Kyiv', country_code: 'UA', population: 2962000, latitude: 50.4501, longitude: 30.5234, is_capital: true },
      { name: 'Lviv', country_code: 'UA', population: 724000, latitude: 49.8397, longitude: 24.0297, is_capital: false },
      { name: 'Odesa', country_code: 'UA', population: 1015000, latitude: 46.4825, longitude: 30.7233, is_capital: false },

      { name: 'Prague', country_code: 'CZ', population: 1309000, latitude: 50.0755, longitude: 14.4378, is_capital: true },
      { name: 'Brno', country_code: 'CZ', population: 382000, latitude: 49.1951, longitude: 16.6068, is_capital: false },

      { name: 'Vienna', country_code: 'AT', population: 1911000, latitude: 48.2082, longitude: 16.3738, is_capital: true },
      { name: 'Salzburg', country_code: 'AT', population: 155000, latitude: 47.8095, longitude: 13.0550, is_capital: false },
      { name: 'Innsbruck', country_code: 'AT', population: 132000, latitude: 47.2692, longitude: 11.4041, is_capital: false },

      { name: 'Lisbon', country_code: 'PT', population: 2942000, latitude: 38.7223, longitude: -9.1393, is_capital: true },
      { name: 'Porto', country_code: 'PT', population: 1312000, latitude: 41.1579, longitude: -8.6291, is_capital: false },

      { name: 'Athens', country_code: 'GR', population: 3154000, latitude: 37.9838, longitude: 23.7275, is_capital: true },
      { name: 'Thessaloniki', country_code: 'GR', population: 1012000, latitude: 40.6401, longitude: 22.9444, is_capital: false },

      { name: 'Copenhagen', country_code: 'DK', population: 1346000, latitude: 55.6761, longitude: 12.5683, is_capital: true },
      { name: 'Aarhus', country_code: 'DK', population: 349000, latitude: 56.1629, longitude: 10.2039, is_capital: false },

      { name: 'Helsinki', country_code: 'FI', population: 1268000, latitude: 60.1699, longitude: 24.9384, is_capital: true },
      { name: 'Tampere', country_code: 'FI', population: 341000, latitude: 61.4978, longitude: 23.7610, is_capital: false },

      { name: 'Dublin', country_code: 'IE', population: 1228000, latitude: 53.3498, longitude: -6.2603, is_capital: true },
      { name: 'Cork', country_code: 'IE', population: 305000, latitude: 51.8985, longitude: -8.4756, is_capital: false },

      { name: 'Wellington', country_code: 'NZ', population: 411000, latitude: -41.2865, longitude: 174.7762, is_capital: true },
      { name: 'Auckland', country_code: 'NZ', population: 1657000, latitude: -36.8485, longitude: 174.7633, is_capital: false },

      { name: 'Singapore', country_code: 'SG', population: 5850000, latitude: 1.3521, longitude: 103.8198, is_capital: true },

      { name: 'Kuala Lumpur', country_code: 'MY', population: 7996000, latitude: 3.1390, longitude: 101.6869, is_capital: true },
      { name: 'George Town', country_code: 'MY', population: 2490000, latitude: 5.4141, longitude: 100.3288, is_capital: false },

      { name: 'Manila', country_code: 'PH', population: 13923000, latitude: 14.5995, longitude: 120.9842, is_capital: true },
      { name: 'Cebu City', country_code: 'PH', population: 964000, latitude: 10.3157, longitude: 123.8854, is_capital: false },
      { name: 'Davao City', country_code: 'PH', population: 1776000, latitude: 7.1907, longitude: 125.4553, is_capital: false },

      { name: 'Nairobi', country_code: 'KE', population: 4735000, latitude: -1.2921, longitude: 36.8219, is_capital: true },
      { name: 'Mombasa', country_code: 'KE', population: 1296000, latitude: -4.0435, longitude: 39.6682, is_capital: false },

      { name: 'Rabat', country_code: 'MA', population: 1932000, latitude: 34.0209, longitude: -6.8416, is_capital: true },
      { name: 'Casablanca', country_code: 'MA', population: 3752000, latitude: 33.5731, longitude: -7.5898, is_capital: false },
      { name: 'Marrakech', country_code: 'MA', population: 1030000, latitude: 31.6295, longitude: -7.9811, is_capital: false },

      { name: 'Tbilisi', country_code: 'GE', population: 1118000, latitude: 41.7151, longitude: 44.8271, is_capital: true },
      { name: 'Batumi', country_code: 'GE', population: 173000, latitude: 41.6168, longitude: 41.6367, is_capital: false },
      { name: 'Kutaisi', country_code: 'GE', population: 147000, latitude: 42.2679, longitude: 42.6946, is_capital: false },

      { name: 'Jerusalem', country_code: 'IL', population: 936000, latitude: 31.7683, longitude: 35.2137, is_capital: true },
      { name: 'Tel Aviv', country_code: 'IL', population: 4343000, latitude: 32.0853, longitude: 34.7818, is_capital: false },
      { name: 'Haifa', country_code: 'IL', population: 1100000, latitude: 32.7940, longitude: 34.9896, is_capital: false },

      { name: 'Havana', country_code: 'CU', population: 2130000, latitude: 23.1135, longitude: -82.3666, is_capital: true },
      { name: 'Santiago de Cuba', country_code: 'CU', population: 510000, latitude: 20.0247, longitude: -75.8219, is_capital: false },

      { name: 'Reykjavik', country_code: 'IS', population: 131000, latitude: 64.1466, longitude: -21.9426, is_capital: true },

      { name: 'Houston', country_code: 'US', population: 2304580, latitude: 29.7604, longitude: -95.3698, is_capital: false },
      { name: 'San Francisco', country_code: 'US', population: 873965, latitude: 37.7749, longitude: -122.4194, is_capital: false },
      { name: 'Miami', country_code: 'US', population: 467963, latitude: 25.7617, longitude: -80.1918, is_capital: false },
      { name: 'Seattle', country_code: 'US', population: 737015, latitude: 47.6062, longitude: -122.3321, is_capital: false },
      { name: 'Boston', country_code: 'US', population: 692600, latitude: 42.3601, longitude: -71.0589, is_capital: false },
      { name: 'Las Vegas', country_code: 'US', population: 641903, latitude: 36.1699, longitude: -115.1398, is_capital: false },

      { name: 'Edinburgh', country_code: 'GB', population: 524930, latitude: 55.9533, longitude: -3.1883, is_capital: false },
      { name: 'Liverpool', country_code: 'GB', population: 498042, latitude: 53.4084, longitude: -2.9916, is_capital: false },
      { name: 'Glasgow', country_code: 'GB', population: 633120, latitude: 55.8642, longitude: -4.2518, is_capital: false },

      { name: 'Frankfurt', country_code: 'DE', population: 753056, latitude: 50.1109, longitude: 8.6821, is_capital: false },
      { name: 'Cologne', country_code: 'DE', population: 1085664, latitude: 50.9375, longitude: 6.9603, is_capital: false },
      { name: 'Stuttgart', country_code: 'DE', population: 635911, latitude: 48.7758, longitude: 9.1829, is_capital: false },
      { name: 'Dusseldorf', country_code: 'DE', population: 619294, latitude: 51.2277, longitude: 6.7735, is_capital: false },

      { name: 'Toulouse', country_code: 'FR', population: 486828, latitude: 43.6047, longitude: 1.4442, is_capital: false },
      { name: 'Nice', country_code: 'FR', population: 342669, latitude: 43.7102, longitude: 7.2620, is_capital: false },
      { name: 'Bordeaux', country_code: 'FR', population: 257068, latitude: 44.8378, longitude: -0.5792, is_capital: false },
      { name: 'Strasbourg', country_code: 'FR', population: 280966, latitude: 48.5734, longitude: 7.7521, is_capital: false },

      { name: 'Yokohama', country_code: 'JP', population: 3748781, latitude: 35.4437, longitude: 139.6380, is_capital: false },
      { name: 'Nagoya', country_code: 'JP', population: 2320361, latitude: 35.1815, longitude: 136.9066, is_capital: false },
      { name: 'Sapporo', country_code: 'JP', population: 1973395, latitude: 43.0618, longitude: 141.3545, is_capital: false },
      { name: 'Fukuoka', country_code: 'JP', population: 1612392, latitude: 33.5904, longitude: 130.4017, is_capital: false },
      { name: 'Hiroshima', country_code: 'JP', population: 1199391, latitude: 34.3853, longitude: 132.4553, is_capital: false },

      { name: 'Sao Paulo', country_code: 'BR', population: 22043000, latitude: -23.5505, longitude: -46.6333, is_capital: false },
      { name: 'Rio de Janeiro', country_code: 'BR', population: 13458000, latitude: -22.9068, longitude: -43.1729, is_capital: false },
      { name: 'Salvador', country_code: 'BR', population: 2886000, latitude: -12.9714, longitude: -38.5124, is_capital: false },
      { name: 'Brasilia', country_code: 'BR', population: 4645843, latitude: -15.7975, longitude: -47.8919, is_capital: true },

      { name: 'Sydney', country_code: 'AU', population: 5312000, latitude: -33.8688, longitude: 151.2093, is_capital: false },
      { name: 'Melbourne', country_code: 'AU', population: 5078000, latitude: -37.8136, longitude: 144.9631, is_capital: false },
      { name: 'Brisbane', country_code: 'AU', population: 2514000, latitude: -27.4698, longitude: 153.0251, is_capital: false },
      { name: 'Perth', country_code: 'AU', population: 2085000, latitude: -31.9505, longitude: 115.8605, is_capital: false },

      { name: 'Toronto', country_code: 'CA', population: 6197000, latitude: 43.6532, longitude: -79.3832, is_capital: false },
      { name: 'Vancouver', country_code: 'CA', population: 2581000, latitude: 49.2827, longitude: -123.1207, is_capital: false },
      { name: 'Montreal', country_code: 'CA', population: 4221000, latitude: 45.5017, longitude: -73.5673, is_capital: false },
      { name: 'Calgary', country_code: 'CA', population: 1481806, latitude: 51.0447, longitude: -114.0719, is_capital: false },

      { name: 'Istanbul', country_code: 'TR', population: 15462000, latitude: 41.0082, longitude: 28.9784, is_capital: false },
      { name: 'Izmir', country_code: 'TR', population: 4367000, latitude: 38.4237, longitude: 27.1428, is_capital: false },
      { name: 'Antalya', country_code: 'TR', population: 2548000, latitude: 36.8969, longitude: 30.7133, is_capital: false },
      { name: 'Bursa', country_code: 'TR', population: 3101833, latitude: 40.1826, longitude: 29.0665, is_capital: false },

      { name: 'Lankaran', country_code: 'AZ', population: 83300, latitude: 38.7529, longitude: 48.8481, is_capital: false },
      { name: 'Sheki', country_code: 'AZ', population: 68400, latitude: 41.1921, longitude: 47.1706, is_capital: false },
      { name: 'Mingachevir', country_code: 'AZ', population: 106200, latitude: 40.7656, longitude: 47.0496, is_capital: false },
      { name: 'Nakhchivan', country_code: 'AZ', population: 90500, latitude: 39.2089, longitude: 45.4122, is_capital: false },
      { name: 'Shamkir', country_code: 'AZ', population: 42500, latitude: 40.9829, longitude: 46.0173, is_capital: false },
      { name: 'Quba', country_code: 'AZ', population: 38200, latitude: 41.3651, longitude: 48.5124, is_capital: false },
      { name: 'Gabala', country_code: 'AZ', population: 13200, latitude: 40.9814, longitude: 47.8460, is_capital: false },
    ];

    let insertedCount = 0;
    let skippedCount = 0;

    for (const cityData of additionalCities) {
      const countryId = countryMap[cityData.country_code];
      if (!countryId) {
        console.log(`  ! Skipping ${cityData.name} - country ${cityData.country_code} not found`);
        skippedCount++;
        continue;
      }

      try {
        const [city, created] = await City.findOrCreate({
          where: {
            name: cityData.name,
            country_id: countryId
          },
          defaults: {
            name: cityData.name,
            country_id: countryId,
            population: cityData.population,
            latitude: cityData.latitude,
            longitude: cityData.longitude,
            is_capital: cityData.is_capital
          }
        });

        if (created) {
          insertedCount++;
        } else {
          skippedCount++;
        }
      } catch (err) {
        console.log(`  ! Error inserting ${cityData.name}: ${err.message}`);
      }
    }

    const totalCountries = await Country.count();
    const totalCities = await City.count();

    console.log('\n========================================');
    console.log('  Seeding completed successfully!');
    console.log('========================================');
    console.log(`  New cities inserted: ${insertedCount}`);
    console.log(`  Cities skipped (already exist): ${skippedCount}`);
    console.log(`  Total countries in database: ${totalCountries}`);
    console.log(`  Total cities in database: ${totalCities}`);
    console.log('========================================\n');

    process.exit(0);

  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedMoreData();
