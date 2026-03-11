const { ApolloServer, gql } = require('apollo-server-express');
const { Country, City } = require('../models');
const { Op } = require('sequelize');

const typeDefs = gql`
  type Country {
    id: ID!
    name: String!
    code: String!
    capital: String
    population: String
    area: Float
    region: String
    subregion: String
    latitude: Float
    longitude: Float
    flagUrl: String
    cities: [City]
  }

  type City {
    id: ID!
    name: String!
    countryId: ID!
    population: String
    latitude: Float
    longitude: Float
    isCapital: Boolean
    country: Country
  }

  type CountryStats {
    totalCountries: Int!
    totalCities: Int!
  }

  type PaginatedCountries {
    totalItems: Int!
    items: [Country]!
    totalPages: Int!
    currentPage: Int!
  }

  type PaginatedCities {
    totalItems: Int!
    items: [City]!
    totalPages: Int!
    currentPage: Int!
  }

  type Query {
    countries(page: Int, size: Int, search: String, region: String): PaginatedCountries!
    country(id: ID!): Country
    countryByCode(code: String!): Country
    cities(page: Int, size: Int, search: String, countryId: ID, isCapital: Boolean): PaginatedCities!
    city(id: ID!): City
    citiesByCountry(countryId: ID!): PaginatedCities!
    capitalCities: PaginatedCities!
    stats: CountryStats!
  }

  type Mutation {
    createCountry(name: String!, code: String!, capital: String, population: Int, area: Float, region: String, subregion: String, latitude: Float, longitude: Float, flagUrl: String): Country!
    updateCountry(id: ID!, name: String, code: String, capital: String, population: Int, area: Float): Country
    deleteCountry(id: ID!): Boolean!
    createCity(name: String!, countryId: ID!, population: Int, latitude: Float, longitude: Float, isCapital: Boolean): City!
    updateCity(id: ID!, name: String, population: Int, latitude: Float, longitude: Float, isCapital: Boolean): City
    deleteCity(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    countries: async (_, { page = 1, size = 20, search, region }) => {
      const limit = Math.min(size || 20, 100);
      const offset = (page - 1) * limit;
      const where = {};
      if (search) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { code: { [Op.iLike]: `%${search}%` } },
          { capital: { [Op.iLike]: `%${search}%` } }
        ];
      }
      if (region) where.region = { [Op.iLike]: `%${region}%` };
      const data = await Country.findAndCountAll({ where, limit, offset, order: [['name', 'ASC']] });
      return { totalItems: data.count, items: data.rows, totalPages: Math.ceil(data.count / limit), currentPage: page };
    },
    country: async (_, { id }) => await Country.findByPk(id, { include: [{ model: City, as: 'cities' }] }),
    countryByCode: async (_, { code }) => await Country.findOne({ where: { code: code.toUpperCase() }, include: [{ model: City, as: 'cities' }] }),
    cities: async (_, { page = 1, size = 20, search, countryId, isCapital }) => {
      const limit = Math.min(size || 20, 100);
      const offset = (page - 1) * limit;
      const where = {};
      if (search) where.name = { [Op.iLike]: `%${search}%` };
      if (countryId) where.country_id = countryId;
      if (isCapital !== undefined) where.is_capital = isCapital;
      const data = await City.findAndCountAll({ where, limit, offset, include: [{ model: Country, as: 'country', attributes: ['id', 'name', 'code'] }], order: [['name', 'ASC']] });
      return { totalItems: data.count, items: data.rows, totalPages: Math.ceil(data.count / limit), currentPage: page };
    },
    city: async (_, { id }) => await City.findByPk(id, { include: [{ model: Country, as: 'country' }] }),
    citiesByCountry: async (_, { countryId }) => {
      const data = await City.findAndCountAll({ where: { country_id: countryId }, order: [['population', 'DESC']] });
      return { totalItems: data.count, items: data.rows, totalPages: 1, currentPage: 1 };
    },
    capitalCities: async () => {
      const data = await City.findAndCountAll({ where: { is_capital: true }, include: [{ model: Country, as: 'country', attributes: ['id', 'name', 'code', 'region'] }], order: [['name', 'ASC']] });
      return { totalItems: data.count, items: data.rows, totalPages: 1, currentPage: 1 };
    },
    stats: async () => ({ totalCountries: await Country.count(), totalCities: await City.count() })
  },
  Mutation: {
    createCountry: async (_, args) => await Country.create({ name: args.name, code: args.code, capital: args.capital, population: args.population, area: args.area, region: args.region, subregion: args.subregion, latitude: args.latitude, longitude: args.longitude, flag_url: args.flagUrl }),
    updateCountry: async (_, { id, ...u }) => { const c = await Country.findByPk(id); if (!c) return null; await c.update(u); return c; },
    deleteCountry: async (_, { id }) => { const c = await Country.findByPk(id); if (!c) return false; await c.destroy(); return true; },
    createCity: async (_, args) => { const c = await City.create({ name: args.name, country_id: args.countryId, population: args.population, latitude: args.latitude, longitude: args.longitude, is_capital: args.isCapital || false }); return await City.findByPk(c.id, { include: [{ model: Country, as: 'country' }] }); },
    updateCity: async (_, { id, ...u }) => { const c = await City.findByPk(id); if (!c) return null; if (u.isCapital !== undefined) u.is_capital = u.isCapital; await c.update(u); return await City.findByPk(id, { include: [{ model: Country, as: 'country' }] }); },
    deleteCity: async (_, { id }) => { const c = await City.findByPk(id); if (!c) return false; await c.destroy(); return true; }
  },
  Country: { flagUrl: (c) => c.flag_url, cities: async (c) => await City.findAll({ where: { country_id: c.id } }) },
  City: { countryId: (c) => c.country_id, isCapital: (c) => c.is_capital, country: async (c) => await Country.findByPk(c.country_id) }
};

module.exports = { typeDefs, resolvers };
