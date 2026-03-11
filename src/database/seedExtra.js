require('dotenv').config();
const { Country, City } = require('../models');

const moreCountries = [
  { name: 'Afghanistan', code: 'AF', capital: 'Kabul', population: 38928346, area: 652230, region: 'Asia', subregion: 'Southern Asia', latitude: 33.93911, longitude: 67.709953, flag_url: 'https://flagcdn.com/af.svg' },
  { name: 'Antigua and Barbuda', code: 'AG', capital: "Saint John's", population: 97929, area: 442, region: 'Americas', subregion: 'Caribbean', latitude: 17.060816, longitude: -61.796428, flag_url: 'https://flagcdn.com/ag.svg' },
  { name: 'Bahamas', code: 'BS', capital: 'Nassau', population: 393244, area: 13943, region: 'Americas', subregion: 'Caribbean', latitude: 25.03428, longitude: -77.39628, flag_url: 'https://flagcdn.com/bs.svg' },
  { name: 'Bahrain', code: 'BH', capital: 'Manama', population: 1701575, area: 765, region: 'Asia', subregion: 'Western Asia', latitude: 26.0667, longitude: 50.5577, flag_url: 'https://flagcdn.com/bh.svg' },
  { name: 'Barbados', code: 'BB', capital: 'Bridgetown', population: 287375, area: 430, region: 'Americas', subregion: 'Caribbean', latitude: 13.193887, longitude: -59.543198, flag_url: 'https://flagcdn.com/bb.svg' },
  { name: 'Belize', code: 'BZ', capital: 'Belmopan', population: 397628, area: 22966, region: 'Americas', subregion: 'Central America', latitude: 17.189877, longitude: -88.49765, flag_url: 'https://flagcdn.com/bz.svg' },
  { name: 'Brunei', code: 'BN', capital: 'Bandar Seri Begawan', population: 437479, area: 5765, region: 'Asia', subregion: 'South-Eastern Asia', latitude: 4.535277, longitude: 114.727669, flag_url: 'https://flagcdn.com/bn.svg' },
  { name: 'Cape Verde', code: 'CV', capital: 'Praia', population: 555987, area: 4033, region: 'Africa', subregion: 'Western Africa', latitude: 16.002082, longitude: -24.013197, flag_url: 'https://flagcdn.com/cv.svg' },
  { name: 'Central African Republic', code: 'CF', capital: 'Bangui', population: 4829767, area: 622984, region: 'Africa', subregion: 'Middle Africa', latitude: 6.611111, longitude: 20.939444, flag_url: 'https://flagcdn.com/cf.svg' },
  { name: 'Chad', code: 'TD', capital: "N'Djamena", population: 16425864, area: 1284000, region: 'Africa', subregion: 'Middle Africa', latitude: 15.454166, longitude: 18.732207, flag_url: 'https://flagcdn.com/td.svg' },
  { name: 'Comoros', code: 'KM', capital: 'Moroni', population: 869601, area: 1862, region: 'Africa', subregion: 'Eastern Africa', latitude: -11.875001, longitude: 43.872219, flag_url: 'https://flagcdn.com/km.svg' },
  { name: 'Congo', code: 'CG', capital: 'Brazzaville', population: 5518087, area: 342000, region: 'Africa', subregion: 'Middle Africa', latitude: -0.228021, longitude: 15.827659, flag_url: 'https://flagcdn.com/cg.svg' },
  { name: 'Djibouti', code: 'DJ', capital: 'Djibouti', population: 988000, area: 23200, region: 'Africa', subregion: 'Eastern Africa', latitude: 11.825138, longitude: 42.590275, flag_url: 'https://flagcdn.com/dj.svg' },
  { name: 'Dominica', code: 'DM', capital: 'Roseau', population: 71986, area: 751, region: 'Americas', subregion: 'Caribbean', latitude: 15.414999, longitude: -61.370976, flag_url: 'https://flagcdn.com/dm.svg' },
  { name: 'Dominican Republic', code: 'DO', capital: 'Santo Domingo', population: 10847910, area: 48671, region: 'Americas', subregion: 'Caribbean', latitude: 18.735693, longitude: -70.162651, flag_url: 'https://flagcdn.com/do.svg' },
  { name: 'Equatorial Guinea', code: 'GQ', capital: 'Malabo', population: 1402985, area: 28051, region: 'Africa', subregion: 'Middle Africa', latitude: 1.650801, longitude: 10.267895, flag_url: 'https://flagcdn.com/gq.svg' },
  { name: 'Eritrea', code: 'ER', capital: 'Asmara', population: 3546421, area: 117600, region: 'Africa', subregion: 'Eastern Africa', latitude: 15.179384, longitude: 39.782334, flag_url: 'https://flagcdn.com/er.svg' },
  { name: 'Eswatini', code: 'SZ', capital: 'Mbabane', population: 1160164, area: 17364, region: 'Africa', subregion: 'Southern Africa', latitude: -26.522503, longitude: 31.465866, flag_url: 'https://flagcdn.com/sz.svg' },
  { name: 'Fiji', code: 'FJ', capital: 'Suva', population: 896445, area: 18272, region: 'Oceania', subregion: 'Melanesia', latitude: -17.713371, longitude: 178.065032, flag_url: 'https://flagcdn.com/fj.svg' },
  { name: 'Gabon', code: 'GA', capital: 'Libreville', population: 2225734, area: 267668, region: 'Africa', subregion: 'Middle Africa', latitude: -0.803689, longitude: 11.609444, flag_url: 'https://flagcdn.com/ga.svg' },
  { name: 'Gambia', code: 'GM', capital: 'Banjul', population: 2416668, area: 10689, region: 'Africa', subregion: 'Western Africa', latitude: 13.443182, longitude: -15.310139, flag_url: 'https://flagcdn.com/gm.svg' },
  { name: 'Grenada', code: 'GD', capital: "Saint George's", population: 112523, area: 344, region: 'Americas', subregion: 'Caribbean', latitude: 12.1165, longitude: -61.679, flag_url: 'https://flagcdn.com/gd.svg' },
  { name: 'Guinea', code: 'GN', capital: 'Conakry', population: 13132795, area: 245857, region: 'Africa', subregion: 'Western Africa', latitude: 9.945587, longitude: -9.696645, flag_url: 'https://flagcdn.com/gn.svg' },
  { name: 'Guinea-Bissau', code: 'GW', capital: 'Bissau', population: 1968001, area: 36125, region: 'Africa', subregion: 'Western Africa', latitude: 11.803749, longitude: -15.180413, flag_url: 'https://flagcdn.com/gw.svg' },
  { name: 'Guyana', code: 'GY', capital: 'Georgetown', population: 786552, area: 214969, region: 'Americas', subregion: 'South America', latitude: 4.860416, longitude: -58.93018, flag_url: 'https://flagcdn.com/gy.svg' },
  { name: 'Haiti', code: 'HT', capital: 'Port-au-Prince', population: 11402528, area: 27750, region: 'Americas', subregion: 'Caribbean', latitude: 18.971187, longitude: -72.285215, flag_url: 'https://flagcdn.com/ht.svg' },
  { name: 'Jamaica', code: 'JM', capital: 'Kingston', population: 2961167, area: 10991, region: 'Americas', subregion: 'Caribbean', latitude: 18.109581, longitude: -77.297508, flag_url: 'https://flagcdn.com/jm.svg' },
  { name: 'Kiribati', code: 'KI', capital: 'Tarawa', population: 119449, area: 811, region: 'Oceania', subregion: 'Micronesia', latitude: -3.370417, longitude: -168.734039, flag_url: 'https://flagcdn.com/ki.svg' },
  { name: 'Kosovo', code: 'XK', capital: 'Pristina', population: 1810463, area: 10887, region: 'Europe', subregion: 'Southern Europe', latitude: 42.602636, longitude: 20.902977, flag_url: 'https://flagcdn.com/xk.svg' },
  { name: 'Lesotho', code: 'LS', capital: 'Maseru', population: 2142249, area: 30355, region: 'Africa', subregion: 'Southern Africa', latitude: -29.609988, longitude: 28.233608, flag_url: 'https://flagcdn.com/ls.svg' },
  { name: 'Liberia', code: 'LR', capital: 'Monrovia', population: 5057681, area: 111369, region: 'Africa', subregion: 'Western Africa', latitude: 6.428055, longitude: -9.429499, flag_url: 'https://flagcdn.com/lr.svg' },
  { name: 'Liechtenstein', code: 'LI', capital: 'Vaduz', population: 38128, area: 160, region: 'Europe', subregion: 'Central Europe', latitude: 47.166, longitude: 9.555373, flag_url: 'https://flagcdn.com/li.svg' },
  { name: 'Madagascar', code: 'MG', capital: 'Antananarivo', population: 27691018, area: 587041, region: 'Africa', subregion: 'Eastern Africa', latitude: -18.766947, longitude: 46.869107, flag_url: 'https://flagcdn.com/mg.svg' },
  { name: 'Malawi', code: 'MW', capital: 'Lilongwe', population: 19129952, area: 118484, region: 'Africa', subregion: 'Eastern Africa', latitude: -13.254308, longitude: 34.301525, flag_url: 'https://flagcdn.com/mw.svg' },
  { name: 'Maldives', code: 'MV', capital: 'Male', population: 540544, area: 300, region: 'Asia', subregion: 'Southern Asia', latitude: 3.202778, longitude: 73.22068, flag_url: 'https://flagcdn.com/mv.svg' },
  { name: 'Mauritania', code: 'MR', capital: 'Nouakchott', population: 4649658, area: 1030700, region: 'Africa', subregion: 'Western Africa', latitude: 21.00789, longitude: -10.940835, flag_url: 'https://flagcdn.com/mr.svg' },
  { name: 'Mauritius', code: 'MU', capital: 'Port Louis', population: 1271768, area: 2040, region: 'Africa', subregion: 'Eastern Africa', latitude: -20.348404, longitude: 57.552152, flag_url: 'https://flagcdn.com/mu.svg' },
  { name: 'Micronesia', code: 'FM', capital: 'Palikir', population: 115023, area: 702, region: 'Oceania', subregion: 'Micronesia', latitude: 7.425554, longitude: 150.550812, flag_url: 'https://flagcdn.com/fm.svg' },
  { name: 'Monaco', code: 'MC', capital: 'Monaco', population: 39242, area: 2, region: 'Europe', subregion: 'Western Europe', latitude: 43.7384, longitude: 7.4246, flag_url: 'https://flagcdn.com/mc.svg' },
  { name: 'Nauru', code: 'NR', capital: 'Yaren', population: 10824, area: 21, region: 'Oceania', subregion: 'Micronesia', latitude: -0.522778, longitude: 166.931503, flag_url: 'https://flagcdn.com/nr.svg' },
  { name: 'Palau', code: 'PW', capital: 'Ngerulmud', population: 18094, area: 459, region: 'Oceania', subregion: 'Micronesia', latitude: 7.51498, longitude: 134.58252, flag_url: 'https://flagcdn.com/pw.svg' },
  { name: 'Papua New Guinea', code: 'PG', capital: 'Port Moresby', population: 8947024, area: 462840, region: 'Oceania', subregion: 'Melanesia', latitude: -6.314993, longitude: 143.95555, flag_url: 'https://flagcdn.com/pg.svg' },
  { name: 'Saint Kitts and Nevis', code: 'KN', capital: 'Basseterre', population: 53199, area: 261, region: 'Americas', subregion: 'Caribbean', latitude: 17.357822, longitude: -62.782998, flag_url: 'https://flagcdn.com/kn.svg' },
  { name: 'Saint Lucia', code: 'LC', capital: 'Castries', population: 183627, area: 616, region: 'Americas', subregion: 'Caribbean', latitude: 13.909444, longitude: -60.978893, flag_url: 'https://flagcdn.com/lc.svg' },
  { name: 'Samoa', code: 'WS', capital: 'Apia', population: 198414, area: 2842, region: 'Oceania', subregion: 'Polynesia', latitude: -13.759029, longitude: -172.104629, flag_url: 'https://flagcdn.com/ws.svg' },
  { name: 'San Marino', code: 'SM', capital: 'San Marino', population: 33931, area: 61, region: 'Europe', subregion: 'Southern Europe', latitude: 43.9424, longitude: 12.4578, flag_url: 'https://flagcdn.com/sm.svg' },
  { name: 'Sao Tome and Principe', code: 'ST', capital: 'Sao Tome', population: 219159, area: 964, region: 'Africa', subregion: 'Middle Africa', latitude: 0.18636, longitude: 6.613081, flag_url: 'https://flagcdn.com/st.svg' },
  { name: 'Seychelles', code: 'SC', capital: 'Victoria', population: 98347, area: 452, region: 'Africa', subregion: 'Eastern Africa', latitude: -4.679574, longitude: 55.491977, flag_url: 'https://flagcdn.com/sc.svg' },
  { name: 'Sierra Leone', code: 'SL', capital: 'Freetown', population: 7976983, area: 71740, region: 'Africa', subregion: 'Western Africa', latitude: 8.460555, longitude: -11.779889, flag_url: 'https://flagcdn.com/sl.svg' },
  { name: 'Solomon Islands', code: 'SB', capital: 'Honiara', population: 686884, area: 28896, region: 'Oceania', subregion: 'Melanesia', latitude: -9.64571, longitude: 160.156194, flag_url: 'https://flagcdn.com/sb.svg' },
  { name: 'Suriname', code: 'SR', capital: 'Paramaribo', population: 586632, area: 163820, region: 'Americas', subregion: 'South America', latitude: 3.919305, longitude: -56.027783, flag_url: 'https://flagcdn.com/sr.svg' },
  { name: 'Togo', code: 'TG', capital: 'Lome', population: 8278724, area: 56785, region: 'Africa', subregion: 'Western Africa', latitude: 8.619543, longitude: 0.824782, flag_url: 'https://flagcdn.com/tg.svg' },
  { name: 'Tonga', code: 'TO', capital: "Nuku'alofa", population: 105695, area: 747, region: 'Oceania', subregion: 'Polynesia', latitude: -21.178986, longitude: -175.198242, flag_url: 'https://flagcdn.com/to.svg' },
  { name: 'Trinidad and Tobago', code: 'TT', capital: 'Port of Spain', population: 1399488, area: 5130, region: 'Americas', subregion: 'Caribbean', latitude: 10.691803, longitude: -61.222503, flag_url: 'https://flagcdn.com/tt.svg' },
  { name: 'Tuvalu', code: 'TV', capital: 'Funafuti', population: 11792, area: 26, region: 'Oceania', subregion: 'Polynesia', latitude: -7.109535, longitude: 177.64933, flag_url: 'https://flagcdn.com/tv.svg' },
  { name: 'Vanuatu', code: 'VU', capital: 'Port Vila', population: 307145, area: 12189, region: 'Oceania', subregion: 'Melanesia', latitude: -15.376706, longitude: 166.959158, flag_url: 'https://flagcdn.com/vu.svg' },
  { name: 'Vatican City', code: 'VA', capital: 'Vatican City', population: 825, area: 0.44, region: 'Europe', subregion: 'Southern Europe', latitude: 41.9029, longitude: 12.4534, flag_url: 'https://flagcdn.com/va.svg' },
  { name: 'DR Congo', code: 'CD', capital: 'Kinshasa', population: 89561403, area: 2344858, region: 'Africa', subregion: 'Middle Africa', latitude: -4.038333, longitude: 21.758664, flag_url: 'https://flagcdn.com/cd.svg' },
  { name: 'Ivory Coast', code: 'CI', capital: 'Yamoussoukro', population: 26378274, area: 322463, region: 'Africa', subregion: 'Western Africa', latitude: 7.539989, longitude: -5.54708, flag_url: 'https://flagcdn.com/ci.svg' },
  { name: 'Andorra', code: 'AD', capital: 'Andorra la Vella', population: 77265, area: 468, region: 'Europe', subregion: 'Southern Europe', latitude: 42.546245, longitude: 1.601554, flag_url: 'https://flagcdn.com/ad.svg' },
];

const moreCities = {
  'AF': [
    { name: 'Kabul', population: 4222000, latitude: 34.5553, longitude: 69.2075, is_capital: true },
    { name: 'Kandahar', population: 614254, latitude: 31.6078, longitude: 65.7101, is_capital: false },
    { name: 'Herat', population: 556205, latitude: 34.3529, longitude: 62.2040, is_capital: false },
    { name: 'Mazar-i-Sharif', population: 469247, latitude: 36.7096, longitude: 67.1109, is_capital: false },
  ],
  'DO': [
    { name: 'Santo Domingo', population: 3658000, latitude: 18.4861, longitude: -69.9312, is_capital: true },
    { name: 'Santiago', population: 1200000, latitude: 19.4517, longitude: -70.6970, is_capital: false },
    { name: 'La Romana', population: 208437, latitude: 18.4274, longitude: -68.9728, is_capital: false },
  ],
  'HT': [
    { name: 'Port-au-Prince', population: 2618894, latitude: 18.5944, longitude: -72.3074, is_capital: true },
    { name: 'Cap-Haitien', population: 274404, latitude: 19.7577, longitude: -72.2005, is_capital: false },
  ],
  'JM': [
    { name: 'Kingston', population: 937700, latitude: 18.0179, longitude: -76.8099, is_capital: true },
    { name: 'Montego Bay', population: 110115, latitude: 18.4762, longitude: -77.8939, is_capital: false },
  ],
  'TT': [
    { name: 'Port of Spain', population: 37074, latitude: 10.6596, longitude: -61.5086, is_capital: true },
    { name: 'Chaguanas', population: 83516, latitude: 10.5168, longitude: -61.4114, is_capital: false },
  ],
  'CD': [
    { name: 'Kinshasa', population: 14342000, latitude: -4.4419, longitude: 15.2663, is_capital: true },
    { name: 'Lubumbashi', population: 2015000, latitude: -11.6876, longitude: 27.5026, is_capital: false },
    { name: 'Mbuji-Mayi', population: 1680000, latitude: -6.1364, longitude: 23.5895, is_capital: false },
    { name: 'Kisangani', population: 1100000, latitude: 0.5153, longitude: 25.1900, is_capital: false },
  ],
  'CI': [
    { name: 'Abidjan', population: 5616633, latitude: 5.3600, longitude: -4.0083, is_capital: false },
    { name: 'Yamoussoukro', population: 355573, latitude: 6.8276, longitude: -5.2893, is_capital: true },
    { name: 'Bouake', population: 680694, latitude: 7.6939, longitude: -5.0300, is_capital: false },
  ],
  'GN': [
    { name: 'Conakry', population: 1938000, latitude: 9.6412, longitude: -13.5784, is_capital: true },
    { name: 'Nzerekore', population: 282772, latitude: 7.7561, longitude: -8.8179, is_capital: false },
  ],
  'MG': [
    { name: 'Antananarivo', population: 1275207, latitude: -18.8792, longitude: 47.5079, is_capital: true },
    { name: 'Toamasina', population: 325857, latitude: -18.1496, longitude: 49.4023, is_capital: false },
    { name: 'Antsirabe', population: 257163, latitude: -19.8659, longitude: 47.0333, is_capital: false },
  ],
  'XK': [
    { name: 'Pristina', population: 198897, latitude: 42.6629, longitude: 21.1655, is_capital: true },
    { name: 'Prizren', population: 178000, latitude: 42.2139, longitude: 20.7397, is_capital: false },
  ],
  'SL': [
    { name: 'Freetown', population: 1055964, latitude: 8.4657, longitude: -13.2317, is_capital: true },
    { name: 'Bo', population: 233684, latitude: 7.9647, longitude: -11.7383, is_capital: false },
  ],
  'SR': [
    { name: 'Paramaribo', population: 240924, latitude: 5.8520, longitude: -55.2038, is_capital: true },
  ],
  'BH': [
    { name: 'Manama', population: 411000, latitude: 26.2285, longitude: 50.5860, is_capital: true },
    { name: 'Riffa', population: 195606, latitude: 26.1297, longitude: 50.5550, is_capital: false },
  ],
  'MV': [
    { name: 'Male', population: 215704, latitude: 4.1755, longitude: 73.5093, is_capital: true },
  ],
  'FJ': [
    { name: 'Suva', population: 93970, latitude: -18.1416, longitude: 178.4419, is_capital: true },
    { name: 'Nadi', population: 42284, latitude: -17.7765, longitude: 177.9441, is_capital: false },
  ],
  'MW': [
    { name: 'Lilongwe', population: 1122000, latitude: -13.9626, longitude: 33.7741, is_capital: true },
    { name: 'Blantyre', population: 800264, latitude: -15.7861, longitude: 35.0058, is_capital: false },
  ],
  'TG': [
    { name: 'Lome', population: 1828000, latitude: 6.1256, longitude: 1.2254, is_capital: true },
    { name: 'Sokode', population: 117811, latitude: 8.9833, longitude: 1.1333, is_capital: false },
  ],
  'MR': [
    { name: 'Nouakchott', population: 958399, latitude: 18.0735, longitude: -15.9582, is_capital: true },
    { name: 'Nouadhibou', population: 118167, latitude: 20.9310, longitude: -17.0347, is_capital: false },
  ],
  'GY': [
    { name: 'Georgetown', population: 200000, latitude: 6.8013, longitude: -58.1553, is_capital: true },
  ],
  'LS': [
    { name: 'Maseru', population: 330760, latitude: -29.3167, longitude: 27.4833, is_capital: true },
  ],
  'LR': [
    { name: 'Monrovia', population: 1021762, latitude: 6.3006, longitude: -10.7969, is_capital: true },
  ],
  'SZ': [
    { name: 'Mbabane', population: 94874, latitude: -26.3054, longitude: 31.1367, is_capital: true },
  ],
  'GA': [
    { name: 'Libreville', population: 703940, latitude: 0.4162, longitude: 9.4673, is_capital: true },
  ],
  'GM': [
    { name: 'Banjul', population: 31301, latitude: 13.4549, longitude: -16.5790, is_capital: true },
    { name: 'Serekunda', population: 390000, latitude: 13.4386, longitude: -16.6781, is_capital: false },
  ],
  'CG': [
    { name: 'Brazzaville', population: 1838000, latitude: -4.2634, longitude: 15.2429, is_capital: true },
    { name: 'Pointe-Noire', population: 715334, latitude: -4.7692, longitude: 11.8664, is_capital: false },
  ],
  'CF': [
    { name: 'Bangui', population: 889231, latitude: 4.3947, longitude: 18.5582, is_capital: true },
  ],
  'ER': [
    { name: 'Asmara', population: 963000, latitude: 15.3229, longitude: 38.9251, is_capital: true },
  ],
  'GW': [
    { name: 'Bissau', population: 492004, latitude: 11.8037, longitude: -15.1804, is_capital: true },
  ],
};

const run = async () => {
  try {
    console.log('Adding more countries and cities...\n');

    let countryInserted = 0;
    for (const c of moreCountries) {
      try {
        const [country, created] = await Country.findOrCreate({
          where: { code: c.code },
          defaults: c
        });
        if (created) countryInserted++;
      } catch (err) {}
    }
    console.log(`Countries inserted: ${countryInserted}`);

    let cityInserted = 0;
    const allCountries = await Country.findAll({ raw: true });
    const countryMap = {};
    for (const c of allCountries) countryMap[c.code] = c.id;

    for (const [code, cities] of Object.entries(moreCities)) {
      const countryId = countryMap[code];
      if (!countryId) continue;
      for (const cityData of cities) {
        try {
          const [city, created] = await City.findOrCreate({
            where: { name: cityData.name, country_id: countryId },
            defaults: { ...cityData, country_id: countryId }
          });
          if (created) cityInserted++;
        } catch (err) {}
      }
    }
    console.log(`Cities inserted: ${cityInserted}`);

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
