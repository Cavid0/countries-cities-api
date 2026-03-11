require('dotenv').config();
const { Country, City } = require('../models');

const generateCitiesForCountry = (countryName, countryCode) => {
  const cityTemplates = {
    'IN': [
      { name: 'Hyderabad', population: 10004000, latitude: 17.385, longitude: 78.4867, is_capital: false },
      { name: 'Ahmedabad', population: 8450000, latitude: 23.0225, longitude: 72.5714, is_capital: false },
      { name: 'Pune', population: 7764000, latitude: 18.5204, longitude: 73.8567, is_capital: false },
      { name: 'Jaipur', population: 3073350, latitude: 26.9124, longitude: 75.7873, is_capital: false },
      { name: 'Lucknow', population: 2902920, latitude: 26.8467, longitude: 80.9462, is_capital: false },
      { name: 'Kanpur', population: 2768057, latitude: 26.4499, longitude: 80.3319, is_capital: false },
      { name: 'Nagpur', population: 2405665, latitude: 21.1458, longitude: 79.0882, is_capital: false },
      { name: 'Indore', population: 1994397, latitude: 22.7196, longitude: 75.8577, is_capital: false },
      { name: 'Patna', population: 1684222, latitude: 25.5941, longitude: 85.1376, is_capital: false },
      { name: 'Bhopal', population: 1599914, latitude: 23.2599, longitude: 77.4126, is_capital: false },
      { name: 'Visakhapatnam', population: 1530000, latitude: 17.6868, longitude: 83.2185, is_capital: false },
      { name: 'Vadodara', population: 1491045, latitude: 22.3072, longitude: 73.1812, is_capital: false },
    ],
    'CN': [
      { name: 'Chongqing', population: 9500000, latitude: 29.4316, longitude: 106.9123, is_capital: false },
      { name: 'Tianjin', population: 13870000, latitude: 39.3434, longitude: 117.3616, is_capital: false },
      { name: 'Wuhan', population: 11089000, latitude: 30.5928, longitude: 114.3055, is_capital: false },
      { name: 'Dongguan', population: 8460000, latitude: 23.0489, longitude: 113.7447, is_capital: false },
      { name: 'Hangzhou', population: 7236000, latitude: 30.2741, longitude: 120.1551, is_capital: false },
      { name: 'Nanjing', population: 6856000, latitude: 32.0603, longitude: 118.7969, is_capital: false },
      { name: 'Shenyang', population: 6255000, latitude: 41.8057, longitude: 123.4315, is_capital: false },
      { name: 'Harbin', population: 5242000, latitude: 45.8038, longitude: 126.5340, is_capital: false },
      { name: 'Dalian', population: 4489000, latitude: 38.9140, longitude: 121.6147, is_capital: false },
      { name: 'Qingdao', population: 4085000, latitude: 36.0671, longitude: 120.3826, is_capital: false },
      { name: 'Xiamen', population: 3531000, latitude: 24.4798, longitude: 118.0894, is_capital: false },
      { name: 'Kunming', population: 3420000, latitude: 25.0389, longitude: 102.7183, is_capital: false },
    ],
    'US': [
      { name: 'Phoenix', population: 1680992, latitude: 33.4484, longitude: -112.074, is_capital: false },
      { name: 'Philadelphia', population: 1584064, latitude: 39.9526, longitude: -75.1652, is_capital: false },
      { name: 'San Antonio', population: 1547253, latitude: 29.4241, longitude: -98.4936, is_capital: false },
      { name: 'San Diego', population: 1423851, latitude: 32.7157, longitude: -117.1611, is_capital: false },
      { name: 'Dallas', population: 1343573, latitude: 32.7767, longitude: -96.797, is_capital: false },
      { name: 'Austin', population: 978908, latitude: 30.2672, longitude: -97.7431, is_capital: false },
      { name: 'Denver', population: 727211, latitude: 39.7392, longitude: -104.9903, is_capital: false },
      { name: 'Nashville', population: 689447, latitude: 36.1627, longitude: -86.7816, is_capital: false },
      { name: 'Portland', population: 654741, latitude: 45.5051, longitude: -122.675, is_capital: false },
      { name: 'Detroit', population: 639111, latitude: 42.3314, longitude: -83.0458, is_capital: false },
      { name: 'Memphis', population: 633104, latitude: 35.1495, longitude: -90.049, is_capital: false },
      { name: 'Atlanta', population: 498044, latitude: 33.749, longitude: -84.388, is_capital: false },
    ],
    'BR': [
      { name: 'Belo Horizonte', population: 6028000, latitude: -19.9167, longitude: -43.9345, is_capital: false },
      { name: 'Fortaleza', population: 4055000, latitude: -3.7172, longitude: -38.5433, is_capital: false },
      { name: 'Curitiba', population: 3572000, latitude: -25.4284, longitude: -49.2733, is_capital: false },
      { name: 'Manaus', population: 2255000, latitude: -3.119, longitude: -60.0217, is_capital: false },
      { name: 'Recife', population: 4054866, latitude: -8.0476, longitude: -34.877, is_capital: false },
      { name: 'Porto Alegre', population: 1484941, latitude: -30.0346, longitude: -51.2177, is_capital: false },
      { name: 'Goiania', population: 1516113, latitude: -16.6869, longitude: -49.2648, is_capital: false },
      { name: 'Belem', population: 1499641, latitude: -1.4558, longitude: -48.5044, is_capital: false },
    ],
    'RU': [
      { name: 'Kazan', population: 1257000, latitude: 55.8304, longitude: 49.0661, is_capital: false },
      { name: 'Nizhny Novgorod', population: 1252000, latitude: 56.2965, longitude: 43.9361, is_capital: false },
      { name: 'Chelyabinsk', population: 1196000, latitude: 55.1644, longitude: 61.4368, is_capital: false },
      { name: 'Samara', population: 1156659, latitude: 53.1959, longitude: 50.1002, is_capital: false },
      { name: 'Omsk', population: 1154116, latitude: 54.9914, longitude: 73.3645, is_capital: false },
      { name: 'Rostov-on-Don', population: 1137904, latitude: 47.2357, longitude: 39.7015, is_capital: false },
      { name: 'Ufa', population: 1128787, latitude: 54.7388, longitude: 55.9721, is_capital: false },
      { name: 'Krasnoyarsk', population: 1095286, latitude: 56.0097, longitude: 92.8525, is_capital: false },
      { name: 'Voronezh', population: 1058261, latitude: 51.6754, longitude: 39.2088, is_capital: false },
      { name: 'Perm', population: 1055397, latitude: 58.0105, longitude: 56.2502, is_capital: false },
    ],
    'JP': [
      { name: 'Kobe', population: 1544000, latitude: 34.6901, longitude: 135.1955, is_capital: false },
      { name: 'Kawasaki', population: 1516483, latitude: 35.5308, longitude: 139.7029, is_capital: false },
      { name: 'Sendai', population: 1096704, latitude: 38.2682, longitude: 140.8694, is_capital: false },
      { name: 'Kitakyushu', population: 940978, latitude: 33.8834, longitude: 130.8752, is_capital: false },
      { name: 'Chiba', population: 974951, latitude: 35.6073, longitude: 140.1063, is_capital: false },
      { name: 'Sakai', population: 826161, latitude: 34.5733, longitude: 135.4833, is_capital: false },
      { name: 'Niigata', population: 789275, latitude: 37.9162, longitude: 139.0364, is_capital: false },
      { name: 'Hamamatsu', population: 791707, latitude: 34.7108, longitude: 137.7262, is_capital: false },
    ],
    'DE': [
      { name: 'Leipzig', population: 593145, latitude: 51.3397, longitude: 12.3731, is_capital: false },
      { name: 'Dresden', population: 556780, latitude: 51.0504, longitude: 13.7373, is_capital: false },
      { name: 'Hannover', population: 538068, latitude: 52.3759, longitude: 9.732, is_capital: false },
      { name: 'Nuremberg', population: 518365, latitude: 49.4521, longitude: 11.0767, is_capital: false },
      { name: 'Bremen', population: 567559, latitude: 53.0793, longitude: 8.8017, is_capital: false },
      { name: 'Essen', population: 583109, latitude: 51.4556, longitude: 7.0116, is_capital: false },
      { name: 'Dortmund', population: 587010, latitude: 51.5136, longitude: 7.4653, is_capital: false },
    ],
    'FR': [
      { name: 'Nantes', population: 640000, latitude: 47.2184, longitude: -1.5536, is_capital: false },
      { name: 'Montpellier', population: 290053, latitude: 43.6108, longitude: 3.8767, is_capital: false },
      { name: 'Rennes', population: 220488, latitude: 48.1173, longitude: -1.6778, is_capital: false },
      { name: 'Lille', population: 232440, latitude: 50.6292, longitude: 3.0573, is_capital: false },
      { name: 'Grenoble', population: 160649, latitude: 45.1885, longitude: 5.7245, is_capital: false },
      { name: 'Dijon', population: 155090, latitude: 47.322, longitude: 5.0415, is_capital: false },
    ],
    'TR': [
      { name: 'Adana', population: 2263000, latitude: 37.0, longitude: 35.3213, is_capital: false },
      { name: 'Gaziantep', population: 2069000, latitude: 37.0662, longitude: 37.3833, is_capital: false },
      { name: 'Konya', population: 1391000, latitude: 37.8667, longitude: 32.4833, is_capital: false },
      { name: 'Mersin', population: 1145000, latitude: 36.8121, longitude: 34.6415, is_capital: false },
      { name: 'Diyarbakir', population: 1073000, latitude: 37.9144, longitude: 40.2306, is_capital: false },
      { name: 'Kayseri', population: 1004000, latitude: 38.7312, longitude: 35.4787, is_capital: false },
      { name: 'Trabzon', population: 807000, latitude: 41.0027, longitude: 39.7168, is_capital: false },
    ],
    'MX': [
      { name: 'Puebla', population: 3145000, latitude: 19.0414, longitude: -98.2063, is_capital: false },
      { name: 'Tijuana', population: 2157000, latitude: 32.5149, longitude: -117.0382, is_capital: false },
      { name: 'Leon', population: 1721000, latitude: 21.1221, longitude: -101.6827, is_capital: false },
      { name: 'Merida', population: 1060000, latitude: 20.9674, longitude: -89.5926, is_capital: false },
      { name: 'Queretaro', population: 1049000, latitude: 20.5888, longitude: -100.3899, is_capital: false },
      { name: 'Chihuahua', population: 925000, latitude: 28.6353, longitude: -106.0889, is_capital: false },
    ],
    'IT': [
      { name: 'Turin', population: 1733000, latitude: 45.0703, longitude: 7.6869, is_capital: false },
      { name: 'Palermo', population: 657000, latitude: 38.1157, longitude: 13.3615, is_capital: false },
      { name: 'Genoa', population: 851000, latitude: 44.4056, longitude: 8.9463, is_capital: false },
      { name: 'Bologna', population: 612000, latitude: 44.4949, longitude: 11.3426, is_capital: false },
      { name: 'Catania', population: 311584, latitude: 37.5079, longitude: 15.083, is_capital: false },
      { name: 'Bari', population: 325183, latitude: 41.1171, longitude: 16.8719, is_capital: false },
    ],
    'ES': [
      { name: 'Zaragoza', population: 674997, latitude: 41.6488, longitude: -0.8891, is_capital: false },
      { name: 'Malaga', population: 578000, latitude: 36.7213, longitude: -4.4214, is_capital: false },
      { name: 'Bilbao', population: 738000, latitude: 43.263, longitude: -2.935, is_capital: false },
      { name: 'Alicante', population: 334757, latitude: 38.3452, longitude: -0.481, is_capital: false },
      { name: 'Cordoba', population: 325916, latitude: 37.8847, longitude: -4.7794, is_capital: false },
      { name: 'Granada', population: 232208, latitude: 37.1773, longitude: -3.5986, is_capital: false },
    ],
    'PK': [
      { name: 'Faisalabad', population: 3567000, latitude: 31.4504, longitude: 73.135, is_capital: false },
      { name: 'Rawalpindi', population: 2283000, latitude: 33.6007, longitude: 73.0679, is_capital: false },
      { name: 'Multan', population: 1872000, latitude: 30.1575, longitude: 71.5249, is_capital: false },
      { name: 'Gujranwala', population: 2027000, latitude: 32.1877, longitude: 74.1945, is_capital: false },
      { name: 'Peshawar', population: 1970000, latitude: 34.0151, longitude: 71.5249, is_capital: false },
      { name: 'Quetta', population: 1001205, latitude: 30.1798, longitude: 66.975, is_capital: false },
    ],
    'EG': [
      { name: 'Shubra El Kheima', population: 2800000, latitude: 30.1286, longitude: 31.2422, is_capital: false },
      { name: 'Port Said', population: 749371, latitude: 31.2653, longitude: 32.3019, is_capital: false },
      { name: 'Suez', population: 728180, latitude: 29.9668, longitude: 32.5498, is_capital: false },
      { name: 'Luxor', population: 507000, latitude: 25.6872, longitude: 32.6396, is_capital: false },
      { name: 'Aswan', population: 290000, latitude: 24.0889, longitude: 32.8998, is_capital: false },
      { name: 'Mansoura', population: 480494, latitude: 31.0409, longitude: 31.3785, is_capital: false },
    ],
    'ID': [
      { name: 'Medan', population: 2229000, latitude: 3.5952, longitude: 98.6722, is_capital: false },
      { name: 'Semarang', population: 1729000, latitude: -6.9932, longitude: 110.4203, is_capital: false },
      { name: 'Makassar', population: 1526004, latitude: -5.1477, longitude: 119.4327, is_capital: false },
      { name: 'Palembang', population: 1708413, latitude: -2.9761, longitude: 104.7754, is_capital: false },
      { name: 'Tangerang', population: 2001925, latitude: -6.178, longitude: 106.63, is_capital: false },
      { name: 'Depok', population: 2056335, latitude: -6.4025, longitude: 106.8524, is_capital: false },
    ],
    'NG': [
      { name: 'Ibadan', population: 3650000, latitude: 7.3775, longitude: 3.947, is_capital: false },
      { name: 'Port Harcourt', population: 1865000, latitude: 4.8156, longitude: 7.0498, is_capital: false },
      { name: 'Benin City', population: 1495000, latitude: 6.335, longitude: 5.6274, is_capital: false },
      { name: 'Kaduna', population: 760084, latitude: 10.5204, longitude: 7.4341, is_capital: false },
      { name: 'Enugu', population: 722664, latitude: 6.4402, longitude: 7.4942, is_capital: false },
    ],
    'BD': [
      { name: 'Khulna', population: 1400000, latitude: 22.8456, longitude: 89.5403, is_capital: false },
      { name: 'Rajshahi', population: 842701, latitude: 24.3636, longitude: 88.6241, is_capital: false },
      { name: 'Sylhet', population: 700000, latitude: 24.8949, longitude: 91.8687, is_capital: false },
      { name: 'Rangpur', population: 655000, latitude: 25.7439, longitude: 89.2752, is_capital: false },
      { name: 'Comilla', population: 580000, latitude: 23.4607, longitude: 91.1809, is_capital: false },
    ],
    'TH': [
      { name: 'Pattaya', population: 328000, latitude: 12.9236, longitude: 100.8825, is_capital: false },
      { name: 'Nonthaburi', population: 270609, latitude: 13.8621, longitude: 100.5144, is_capital: false },
      { name: 'Nakhon Ratchasima', population: 174332, latitude: 14.9799, longitude: 102.0978, is_capital: false },
      { name: 'Udon Thani', population: 156062, latitude: 17.4156, longitude: 102.7872, is_capital: false },
      { name: 'Khon Kaen', population: 150000, latitude: 16.4322, longitude: 102.8236, is_capital: false },
    ],
    'VN': [
      { name: 'Can Tho', population: 1239000, latitude: 10.0452, longitude: 105.7469, is_capital: false },
      { name: 'Hai Phong', population: 2029000, latitude: 20.8449, longitude: 106.6881, is_capital: false },
      { name: 'Bien Hoa', population: 1105000, latitude: 10.9574, longitude: 106.8426, is_capital: false },
      { name: 'Hue', population: 455230, latitude: 16.4637, longitude: 107.5909, is_capital: false },
      { name: 'Nha Trang', population: 392279, latitude: 12.2388, longitude: 109.1967, is_capital: false },
    ],
    'KR': [
      { name: 'Daegu', population: 2446000, latitude: 35.8714, longitude: 128.6014, is_capital: false },
      { name: 'Daejeon', population: 1539000, latitude: 36.3504, longitude: 127.3845, is_capital: false },
      { name: 'Gwangju', population: 1469000, latitude: 35.1595, longitude: 126.8526, is_capital: false },
      { name: 'Ulsan', population: 1166000, latitude: 35.5384, longitude: 129.3114, is_capital: false },
      { name: 'Suwon', population: 1242724, latitude: 37.2636, longitude: 127.0286, is_capital: false },
      { name: 'Changwon', population: 1059241, latitude: 35.2279, longitude: 128.6811, is_capital: false },
    ],
    'CO': [
      { name: 'Barranquilla', population: 1386000, latitude: 10.9685, longitude: -74.7813, is_capital: false },
      { name: 'Cartagena', population: 1028736, latitude: 10.391, longitude: -75.5144, is_capital: false },
      { name: 'Cucuta', population: 711715, latitude: 7.8891, longitude: -72.4967, is_capital: false },
      { name: 'Bucaramanga', population: 581130, latitude: 7.1254, longitude: -73.1198, is_capital: false },
    ],
    'ZA': [
      { name: 'Port Elizabeth', population: 1153000, latitude: -33.918, longitude: 25.5701, is_capital: false },
      { name: 'Bloemfontein', population: 759693, latitude: -29.0852, longitude: 26.1596, is_capital: false },
      { name: 'East London', population: 755200, latitude: -33.0291, longitude: 27.8546, is_capital: false },
      { name: 'Pietermaritzburg', population: 750845, latitude: -29.6006, longitude: 30.3794, is_capital: false },
    ],
    'AR': [
      { name: 'Mendoza', population: 1145000, latitude: -32.8895, longitude: -68.8458, is_capital: false },
      { name: 'Tucuman', population: 903000, latitude: -26.8241, longitude: -65.2226, is_capital: false },
      { name: 'La Plata', population: 787294, latitude: -34.9205, longitude: -57.9536, is_capital: false },
      { name: 'Mar del Plata', population: 614350, latitude: -38.0023, longitude: -57.5575, is_capital: false },
      { name: 'Santa Fe', population: 525093, latitude: -31.6333, longitude: -60.7, is_capital: false },
    ],
    'PL': [
      { name: 'Lodz', population: 679000, latitude: 51.7592, longitude: 19.456, is_capital: false },
      { name: 'Poznan', population: 535000, latitude: 52.4064, longitude: 16.9252, is_capital: false },
      { name: 'Gdansk', population: 470907, latitude: 54.352, longitude: 18.6466, is_capital: false },
      { name: 'Szczecin', population: 402465, latitude: 53.4285, longitude: 14.5528, is_capital: false },
      { name: 'Lublin', population: 339784, latitude: 51.2465, longitude: 22.5684, is_capital: false },
    ],
    'AU': [
      { name: 'Adelaide', population: 1359000, latitude: -34.9285, longitude: 138.6007, is_capital: false },
      { name: 'Gold Coast', population: 706000, latitude: -28.0167, longitude: 153.4, is_capital: false },
      { name: 'Newcastle', population: 322278, latitude: -32.9283, longitude: 151.7817, is_capital: false },
      { name: 'Canberra', population: 431000, latitude: -35.2809, longitude: 149.13, is_capital: true },
      { name: 'Wollongong', population: 302739, latitude: -34.4278, longitude: 150.8931, is_capital: false },
    ],
    'CA': [
      { name: 'Edmonton', population: 1418000, latitude: 53.5461, longitude: -113.4938, is_capital: false },
      { name: 'Quebec City', population: 831000, latitude: 46.8139, longitude: -71.208, is_capital: false },
      { name: 'Winnipeg', population: 778500, latitude: 49.8951, longitude: -97.1384, is_capital: false },
      { name: 'Hamilton', population: 747545, latitude: 43.2557, longitude: -79.8711, is_capital: false },
      { name: 'Halifax', population: 431000, latitude: 44.6488, longitude: -63.5752, is_capital: false },
    ],
    'SA': [
      { name: 'Medina', population: 1488000, latitude: 24.5247, longitude: 39.5692, is_capital: false },
      { name: 'Dammam', population: 1024000, latitude: 26.4207, longitude: 50.0888, is_capital: false },
      { name: 'Taif', population: 688000, latitude: 21.2703, longitude: 40.4158, is_capital: false },
      { name: 'Tabuk', population: 544000, latitude: 28.3838, longitude: 36.5666, is_capital: false },
    ],
    'AE': [
      { name: 'Al Ain', population: 766936, latitude: 24.2075, longitude: 55.7447, is_capital: false },
      { name: 'Ajman', population: 504846, latitude: 25.4052, longitude: 55.5136, is_capital: false },
      { name: 'Ras Al Khaimah', population: 345000, latitude: 25.7895, longitude: 55.9432, is_capital: false },
      { name: 'Fujairah', population: 230000, latitude: 25.1288, longitude: 56.3264, is_capital: false },
    ],
    'IR': [
      { name: 'Mashhad', population: 3001000, latitude: 36.2972, longitude: 59.6067, is_capital: false },
      { name: 'Tabriz', population: 1733033, latitude: 38.0962, longitude: 46.2738, is_capital: false },
      { name: 'Karaj', population: 1614626, latitude: 35.8136, longitude: 50.9715, is_capital: false },
      { name: 'Ahvaz', population: 1185000, latitude: 31.3183, longitude: 48.6706, is_capital: false },
      { name: 'Kerman', population: 738000, latitude: 30.2839, longitude: 57.0834, is_capital: false },
    ],
    'GE': [
      { name: 'Rustavi', population: 125103, latitude: 41.5488, longitude: 44.9939, is_capital: false },
      { name: 'Zugdidi', population: 73000, latitude: 42.5088, longitude: 41.8709, is_capital: false },
      { name: 'Gori', population: 49000, latitude: 41.9826, longitude: 44.1099, is_capital: false },
      { name: 'Poti', population: 41500, latitude: 42.1462, longitude: 41.6718, is_capital: false },
      { name: 'Telavi', population: 19600, latitude: 41.9199, longitude: 45.4736, is_capital: false },
    ],
  };

  return cityTemplates[countryCode] || [];
};

const seedBulkCities = async () => {
  try {
    console.log('Adding bulk cities to reach 1000+ records...\n');

    const countries = await Country.findAll({ raw: true });
    const countryMap = {};
    for (const c of countries) {
      countryMap[c.code] = c.id;
    }

    let totalInserted = 0;

    for (const [code, countryId] of Object.entries(countryMap)) {
      const cities = generateCitiesForCountry('', code);
      
      for (const cityData of cities) {
        try {
          const [city, created] = await City.findOrCreate({
            where: { name: cityData.name, country_id: countryId },
            defaults: { ...cityData, country_id: countryId }
          });
          if (created) totalInserted++;
        } catch (err) {}
      }
    }

    const totalCountries = await Country.count();
    const totalCities = await City.count();
    const totalRecords = totalCountries + totalCities;

    console.log('\n========================================');
    console.log('  Bulk seeding completed!');
    console.log('========================================');
    console.log(`  New cities inserted: ${totalInserted}`);
    console.log(`  Total countries: ${totalCountries}`);
    console.log(`  Total cities: ${totalCities}`);
    console.log(`  TOTAL RECORDS: ${totalRecords}`);
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Bulk seeding failed:', error);
    process.exit(1);
  }
};

seedBulkCities();
