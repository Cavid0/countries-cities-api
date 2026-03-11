require('dotenv').config();
const { Country, City } = require('../models');

const worldCities = [
  { code: 'IN', cities: [
    { name: 'Surat', population: 4462002, latitude: 21.1702, longitude: 72.8311, is_capital: false },
    { name: 'Coimbatore', population: 1601438, latitude: 11.0168, longitude: 76.9558, is_capital: false },
    { name: 'Kochi', population: 677381, latitude: 9.9312, longitude: 76.2673, is_capital: false },
    { name: 'Thiruvananthapuram', population: 957730, latitude: 8.5241, longitude: 76.9366, is_capital: false },
    { name: 'Agra', population: 1585704, latitude: 27.1767, longitude: 78.0081, is_capital: false },
    { name: 'Varanasi', population: 1198491, latitude: 25.3176, longitude: 82.9739, is_capital: false },
    { name: 'Amritsar', population: 1132761, latitude: 31.6340, longitude: 74.8723, is_capital: false },
    { name: 'Rajkot', population: 1286995, latitude: 22.3039, longitude: 70.8022, is_capital: false },
    { name: 'Jodhpur', population: 1033918, latitude: 26.2389, longitude: 73.0243, is_capital: false },
    { name: 'Gwalior', population: 1069276, latitude: 26.2183, longitude: 78.1828, is_capital: false },
  ]},
  { code: 'CN', cities: [
    { name: 'Zhengzhou', population: 3677000, latitude: 34.7472, longitude: 113.6250, is_capital: false },
    { name: 'Changsha', population: 3194000, latitude: 28.2282, longitude: 112.9388, is_capital: false },
    { name: 'Fuzhou', population: 2921000, latitude: 26.0745, longitude: 119.2965, is_capital: false },
    { name: 'Jinan', population: 2870000, latitude: 36.6512, longitude: 117.1201, is_capital: false },
    { name: 'Guiyang', population: 2628000, latitude: 26.6470, longitude: 106.6302, is_capital: false },
    { name: 'Urumqi', population: 2360000, latitude: 43.8256, longitude: 87.6168, is_capital: false },
    { name: 'Nanning', population: 2190000, latitude: 22.8170, longitude: 108.3665, is_capital: false },
    { name: 'Taiyuan', population: 2035000, latitude: 37.8706, longitude: 112.5489, is_capital: false },
  ]},
  { code: 'US', cities: [
    { name: 'Las Vegas', population: 641903, latitude: 36.1699, longitude: -115.1398, is_capital: false },
    { name: 'Seattle', population: 737015, latitude: 47.6062, longitude: -122.3321, is_capital: false },
    { name: 'Boston', population: 675647, latitude: 42.3601, longitude: -71.0589, is_capital: false },
    { name: 'Miami', population: 442241, latitude: 25.7617, longitude: -80.1918, is_capital: false },
    { name: 'Minneapolis', population: 429954, latitude: 44.9778, longitude: -93.2650, is_capital: false },
    { name: 'Tampa', population: 399700, latitude: 27.9506, longitude: -82.4572, is_capital: false },
    { name: 'St. Louis', population: 301578, latitude: 38.6270, longitude: -90.1994, is_capital: false },
    { name: 'Pittsburgh', population: 302971, latitude: 40.4406, longitude: -79.9959, is_capital: false },
    { name: 'Cincinnati', population: 309317, latitude: 39.1031, longitude: -84.5120, is_capital: false },
    { name: 'Kansas City', population: 508090, latitude: 39.0997, longitude: -94.5786, is_capital: false },
    { name: 'Cleveland', population: 372624, latitude: 41.4993, longitude: -81.6944, is_capital: false },
    { name: 'Salt Lake City', population: 200591, latitude: 40.7608, longitude: -111.8910, is_capital: false },
  ]},
  { code: 'BR', cities: [
    { name: 'Campinas', population: 1204073, latitude: -22.9099, longitude: -47.0626, is_capital: false },
    { name: 'Vitoria', population: 365855, latitude: -20.3155, longitude: -40.3128, is_capital: false },
    { name: 'Florianopolis', population: 508826, latitude: -27.5954, longitude: -48.5480, is_capital: false },
    { name: 'Natal', population: 884122, latitude: -5.7945, longitude: -35.2110, is_capital: false },
    { name: 'Maceio', population: 1018948, latitude: -9.6498, longitude: -35.7089, is_capital: false },
    { name: 'Teresina', population: 868075, latitude: -5.0892, longitude: -42.8019, is_capital: false },
    { name: 'Campo Grande', population: 906092, latitude: -20.4697, longitude: -54.6201, is_capital: false },
    { name: 'Sao Luis', population: 1108975, latitude: -2.5307, longitude: -44.2825, is_capital: false },
  ]},
  { code: 'JP', cities: [
    { name: 'Shizuoka', population: 693389, latitude: 34.9756, longitude: 138.3827, is_capital: false },
    { name: 'Okayama', population: 724691, latitude: 34.6617, longitude: 133.9350, is_capital: false },
    { name: 'Kumamoto', population: 740822, latitude: 32.8032, longitude: 130.7079, is_capital: false },
    { name: 'Kagoshima', population: 599814, latitude: 31.5966, longitude: 130.5571, is_capital: false },
    { name: 'Nagasaki', population: 411421, latitude: 32.7503, longitude: 129.8779, is_capital: false },
    { name: 'Matsuyama', population: 509835, latitude: 33.8392, longitude: 132.7656, is_capital: false },
  ]},
  { code: 'RU', cities: [
    { name: 'Volgograd', population: 1013533, latitude: 48.7080, longitude: 44.5133, is_capital: false },
    { name: 'Krasnodar', population: 948827, latitude: 45.0355, longitude: 38.9753, is_capital: false },
    { name: 'Saratov', population: 838042, latitude: 51.5462, longitude: 46.0086, is_capital: false },
    { name: 'Tyumen', population: 807000, latitude: 57.1553, longitude: 65.5340, is_capital: false },
    { name: 'Tolyatti', population: 699000, latitude: 53.5303, longitude: 49.3461, is_capital: false },
    { name: 'Izhevsk', population: 648665, latitude: 56.8527, longitude: 53.2114, is_capital: false },
    { name: 'Barnaul', population: 632391, latitude: 53.3548, longitude: 83.7698, is_capital: false },
    { name: 'Vladivostok', population: 605049, latitude: 43.1198, longitude: 131.8869, is_capital: false },
  ]},
  { code: 'DE', cities: [
    { name: 'Duisburg', population: 498110, latitude: 51.4344, longitude: 6.7623, is_capital: false },
    { name: 'Bochum', population: 364628, latitude: 51.4818, longitude: 7.2162, is_capital: false },
    { name: 'Wuppertal', population: 354382, latitude: 51.2562, longitude: 7.1508, is_capital: false },
    { name: 'Bielefeld', population: 334195, latitude: 52.0302, longitude: 8.5325, is_capital: false },
    { name: 'Bonn', population: 329673, latitude: 50.7374, longitude: 7.0982, is_capital: false },
    { name: 'Mannheim', population: 309370, latitude: 49.4875, longitude: 8.4660, is_capital: false },
  ]},
  { code: 'FR', cities: [
    { name: 'Bordeaux', population: 257068, latitude: 44.8378, longitude: -0.5792, is_capital: false },
    { name: 'Reims', population: 182211, latitude: 49.2583, longitude: 4.0317, is_capital: false },
    { name: 'Saint-Etienne', population: 172565, latitude: 45.4397, longitude: 4.3872, is_capital: false },
    { name: 'Le Havre', population: 170352, latitude: 49.4944, longitude: 0.1079, is_capital: false },
    { name: 'Toulon', population: 171953, latitude: 43.1242, longitude: 5.9280, is_capital: false },
    { name: 'Angers', population: 153000, latitude: 47.4736, longitude: -0.5548, is_capital: false },
  ]},
  { code: 'TR', cities: [
    { name: 'Antalya', population: 1354000, latitude: 36.8969, longitude: 30.7133, is_capital: false },
    { name: 'Samsun', population: 556000, latitude: 41.2867, longitude: 36.3300, is_capital: false },
    { name: 'Eskisehir', population: 871187, latitude: 39.7767, longitude: 30.5206, is_capital: false },
    { name: 'Denizli', population: 612000, latitude: 37.7765, longitude: 29.0864, is_capital: false },
    { name: 'Malatya', population: 441000, latitude: 38.3552, longitude: 38.3095, is_capital: false },
  ]},
  { code: 'IT', cities: [
    { name: 'Florence', population: 366927, latitude: 43.7696, longitude: 11.2558, is_capital: false },
    { name: 'Venice', population: 259150, latitude: 45.4408, longitude: 12.3155, is_capital: false },
    { name: 'Verona', population: 257275, latitude: 45.4384, longitude: 10.9916, is_capital: false },
    { name: 'Padua', population: 210401, latitude: 45.4064, longitude: 11.8768, is_capital: false },
    { name: 'Trieste', population: 204234, latitude: 45.6495, longitude: 13.7768, is_capital: false },
  ]},
  { code: 'ES', cities: [
    { name: 'Las Palmas', population: 378517, latitude: 28.1235, longitude: -15.4366, is_capital: false },
    { name: 'Murcia', population: 453258, latitude: 37.9922, longitude: -1.1307, is_capital: false },
    { name: 'Palma', population: 416065, latitude: 39.5696, longitude: 2.6502, is_capital: false },
    { name: 'Valladolid', population: 298866, latitude: 41.6523, longitude: -4.7245, is_capital: false },
    { name: 'Vigo', population: 292817, latitude: 42.2406, longitude: -8.7207, is_capital: false },
  ]},
  { code: 'MX', cities: [
    { name: 'Toluca', population: 873536, latitude: 19.2826, longitude: -99.6557, is_capital: false },
    { name: 'Aguascalientes', population: 863893, latitude: 21.8818, longitude: -102.2913, is_capital: false },
    { name: 'Morelia', population: 784776, latitude: 19.7060, longitude: -101.1950, is_capital: false },
    { name: 'Saltillo', population: 807537, latitude: 25.4232, longitude: -100.9924, is_capital: false },
    { name: 'Hermosillo', population: 884273, latitude: 29.0729, longitude: -110.9559, is_capital: false },
  ]},
  { code: 'PK', cities: [
    { name: 'Hyderabad', population: 1733000, latitude: 25.3960, longitude: 68.3578, is_capital: false },
    { name: 'Bahawalpur', population: 762000, latitude: 29.3956, longitude: 71.6836, is_capital: false },
    { name: 'Sargodha', population: 659000, latitude: 32.0836, longitude: 72.6711, is_capital: false },
    { name: 'Sukkur', population: 499000, latitude: 27.7052, longitude: 68.8574, is_capital: false },
    { name: 'Larkana', population: 490000, latitude: 27.5594, longitude: 68.2128, is_capital: false },
  ]},
  { code: 'EG', cities: [
    { name: 'Tanta', population: 420000, latitude: 30.7865, longitude: 31.0004, is_capital: false },
    { name: 'Asyut', population: 416000, latitude: 27.1809, longitude: 31.1837, is_capital: false },
    { name: 'Ismailia', population: 366000, latitude: 30.5965, longitude: 32.2715, is_capital: false },
    { name: 'Faiyum', population: 350000, latitude: 29.3084, longitude: 30.8428, is_capital: false },
    { name: 'Zagazig', population: 303000, latitude: 30.5877, longitude: 31.5020, is_capital: false },
  ]},
  { code: 'NG', cities: [
    { name: 'Ogbomoso', population: 297000, latitude: 8.1227, longitude: 4.2436, is_capital: false },
    { name: 'Aba', population: 310000, latitude: 5.1164, longitude: 7.3667, is_capital: false },
    { name: 'Warri', population: 311824, latitude: 5.5167, longitude: 5.7500, is_capital: false },
    { name: 'Jos', population: 816824, latitude: 9.8965, longitude: 8.8583, is_capital: false },
    { name: 'Ilorin', population: 908000, latitude: 8.5000, longitude: 4.5500, is_capital: false },
  ]},
  { code: 'BD', cities: [
    { name: 'Gazipur', population: 437000, latitude: 23.9999, longitude: 90.4203, is_capital: false },
    { name: 'Narayanganj', population: 2200000, latitude: 23.6238, longitude: 90.5000, is_capital: false },
    { name: 'Mymensingh', population: 410000, latitude: 24.7471, longitude: 90.4203, is_capital: false },
    { name: 'Bogra', population: 340000, latitude: 24.8510, longitude: 89.3710, is_capital: false },
  ]},
  { code: 'ID', cities: [
    { name: 'Bekasi', population: 2543676, latitude: -6.2383, longitude: 106.9756, is_capital: false },
    { name: 'Bogor', population: 1096000, latitude: -6.5971, longitude: 106.8060, is_capital: false },
    { name: 'Malang', population: 895387, latitude: -7.9786, longitude: 112.6304, is_capital: false },
    { name: 'Yogyakarta', population: 412000, latitude: -7.7956, longitude: 110.3695, is_capital: false },
    { name: 'Manado', population: 427906, latitude: 1.4748, longitude: 124.8421, is_capital: false },
    { name: 'Denpasar', population: 897000, latitude: -8.6705, longitude: 115.2126, is_capital: false },
  ]},
  { code: 'CO', cities: [
    { name: 'Santa Marta', population: 524000, latitude: 11.2408, longitude: -74.1990, is_capital: false },
    { name: 'Pereira', population: 474000, latitude: 4.8133, longitude: -75.6961, is_capital: false },
    { name: 'Manizales', population: 400000, latitude: 5.0689, longitude: -75.5174, is_capital: false },
    { name: 'Ibague', population: 564000, latitude: 4.4389, longitude: -75.2322, is_capital: false },
  ]},
  { code: 'PL', cities: [
    { name: 'Katowice', population: 294510, latitude: 50.2649, longitude: 19.0238, is_capital: false },
    { name: 'Bialystok', population: 297288, latitude: 53.1325, longitude: 23.1688, is_capital: false },
    { name: 'Kielce', population: 194852, latitude: 50.8661, longitude: 20.6286, is_capital: false },
    { name: 'Torun', population: 202562, latitude: 53.0138, longitude: 18.5984, is_capital: false },
  ]},
  { code: 'ZA', cities: [
    { name: 'Soweto', population: 1695047, latitude: -26.2678, longitude: 27.8585, is_capital: false },
    { name: 'Tshwane', population: 2921488, latitude: -25.7313, longitude: 28.2184, is_capital: false },
    { name: 'Ekurhuleni', population: 3178470, latitude: -26.1914, longitude: 28.3228, is_capital: false },
    { name: 'Nelson Mandela Bay', population: 1152115, latitude: -33.7680, longitude: 25.6706, is_capital: false },
  ]},
  { code: 'IR', cities: [
    { name: 'Qom', population: 1201158, latitude: 34.6401, longitude: 50.8764, is_capital: false },
    { name: 'Rasht', population: 680000, latitude: 37.2808, longitude: 49.5832, is_capital: false },
    { name: 'Zahedan', population: 587730, latitude: 29.4963, longitude: 60.8629, is_capital: false },
    { name: 'Hamadan', population: 554406, latitude: 34.7990, longitude: 48.5150, is_capital: false },
  ]},
  { code: 'KR', cities: [
    { name: 'Goyang', population: 1073000, latitude: 37.6564, longitude: 126.8350, is_capital: false },
    { name: 'Seongnam', population: 948757, latitude: 37.4449, longitude: 127.1389, is_capital: false },
    { name: 'Yongin', population: 1070000, latitude: 37.2411, longitude: 127.1776, is_capital: false },
    { name: 'Cheongju', population: 833276, latitude: 36.6424, longitude: 127.4890, is_capital: false },
    { name: 'Bucheon', population: 842696, latitude: 37.4989, longitude: 126.7831, is_capital: false },
  ]},
];

const run = async () => {
  try {
    console.log('Adding final batch of world cities...\n');

    const allCountries = await Country.findAll({ raw: true });
    const countryMap = {};
    for (const c of allCountries) countryMap[c.code] = c.id;

    let totalInserted = 0;

    for (const entry of worldCities) {
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
