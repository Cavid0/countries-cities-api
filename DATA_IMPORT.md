# Data Import Utility

This utility helps you import large datasets into the database.

## Supported Data Sources

1. **REST Countries API** - https://restcountries.com/v3.1/all
2. **CSV Files** - Custom country/city data
3. **JSON Files** - Structured data

---

## Using REST Countries API

The REST Countries API provides comprehensive data about countries.

### Quick Start

1. Create a file at `src/utils/importData.js`

2. Add this code:

```javascript
require('dotenv').config();
const axios = require('axios');
const { Country, City } = require('../models');

/**
 * Import countries from REST Countries API
 */
const importCountriesFromAPI = async () => {
  try {
    console.log('🔄 Fetching data from REST Countries API...');
    
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;
    
    console.log(`📥 Received ${countries.length} countries`);
    console.log('💾 Importing into database...');
    
    let imported = 0;
    let skipped = 0;
    
    for (const country of countries) {
      try {
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
          process.stdout.write(`\rImported: ${imported}/${countries.length}`);
        }
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          skipped++;
        } else {
          console.error(`\n❌ Error importing ${country.name.common}:`, error.message);
        }
      }
    }
    
    console.log(`\n✅ Import completed!`);
    console.log(`   Imported: ${imported}`);
    console.log(`   Skipped (duplicates): ${skipped}`);
    console.log(`   Errors: ${countries.length - imported - skipped}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
};

// Run import
importCountriesFromAPI();
```

3. Install axios if not already installed:
```bash
npm install axios
```

4. Run the import:
```bash
node src/utils/importData.js
```

---

## Importing from CSV

For CSV files with country/city data:

### Install CSV Parser

```bash
npm install csv-parser
```

### Create Import Script

```javascript
const fs = require('fs');
const csv = require('csv-parser');
const { Country, City } = require('../models');

const importFromCSV = async (filePath) => {
  const results = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        console.log(`📥 Found ${results.length} records`);
        
        for (const row of results) {
          try {
            await Country.create({
              name: row.name,
              code: row.code,
              capital: row.capital,
              population: parseInt(row.population) || 0,
              // ... map other fields
            });
          } catch (error) {
            console.error(`Error importing ${row.name}:`, error.message);
          }
        }
        
        resolve();
      })
      .on('error', reject);
  });
};

// Usage
importFromCSV('./data/countries.csv')
  .then(() => {
    console.log('✅ Import completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Import failed:', error);
    process.exit(1);
  });
```

---

## Recommended Datasets

### 1. REST Countries API
- **URL**: https://restcountries.com/v3.1/all
- **Records**: 250+ countries
- **Format**: JSON
- **Free**: Yes
- **Data**: Name, code, capital, population, area, region, flags, coordinates

### 2. SimpleMaps World Cities Database
- **URL**: https://simplemaps.com/data/world-cities
- **Records**: 40,000+ cities
- **Format**: CSV
- **Free**: Basic version (15,000 cities)
- **Data**: City name, country, population, coordinates

### 3. GeoNames
- **URL**: http://download.geonames.org/export/dump/
- **Records**: Millions
- **Format**: Text files
- **Free**: Yes (with attribution)
- **Data**: Comprehensive geographic data

### 4. Natural Earth Data
- **URL**: https://www.naturalearthdata.com/downloads/
- **Records**: Complete world dataset
- **Format**: Shapefile, JSON
- **Free**: Public domain
- **Data**: Countries, states, cities, geographical features

---

## Data Cleaning Tips

After importing, you may want to clean the data:

```javascript
// Remove countries with no population data
await Country.destroy({
  where: {
    population: 0
  }
});

// Update missing coordinates
await Country.update(
  { latitude: 0, longitude: 0 },
  { 
    where: {
      latitude: null
    }
  }
);
```

---

## Batch Import Performance

For large datasets (10,000+ records), use bulk inserts:

```javascript
const chunkSize = 1000;
for (let i = 0; i < data.length; i += chunkSize) {
  const chunk = data.slice(i, i + chunkSize);
  await Country.bulkCreate(chunk, {
    ignoreDuplicates: true,
    validate: true
  });
  console.log(`Imported ${i + chunk.length}/${data.length}`);
}
```

---

## Verification

After import, verify the data:

```bash
# Connect to database
psql -U postgres -d countries_cities_db

# Check counts
SELECT COUNT(*) FROM countries;
SELECT COUNT(*) FROM cities;

# Check data quality
SELECT * FROM countries WHERE population IS NULL;
SELECT * FROM countries WHERE latitude IS NULL;
```
