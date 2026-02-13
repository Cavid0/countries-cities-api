const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { notFound } = require('./middleware/notFound');

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Countries and Cities API',
      version: '1.0.0',
      description: 'A comprehensive RESTful API providing data about countries and cities worldwide',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/models/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Root endpoint - Welcome page
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Countries and Cities API',
    version: '1.0.0',
    author: 'Cavid Shukurov',
    endpoints: {
      documentation: `${req.protocol}://${req.get('host')}/api-docs`,
      health: `${req.protocol}://${req.get('host')}/health`,
      api: `${req.protocol}://${req.get('host')}/api/v1`,
      countries: `${req.protocol}://${req.get('host')}/api/v1/countries`,
      cities: `${req.protocol}://${req.get('host')}/api/v1/cities`,
      auth: `${req.protocol}://${req.get('host')}/api/v1/auth`
    },
    repository: 'https://github.com/Cavid0/countries-cities-api',
    features: [
      'JWT Authentication',
      'Redis Caching',
      'PostgreSQL Database',
      'Pagination (max 20 per page)',
      'Swagger Documentation',
      'RESTful API Design'
    ]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API base path info
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API v1 is available at /api/v1',
    version: '1.0.0',
    endpoints: {
      countries: `${req.protocol}://${req.get('host')}/api/v1/countries`,
      cities: `${req.protocol}://${req.get('host')}/api/v1/cities`,
      auth: `${req.protocol}://${req.get('host')}/api/v1/auth`,
      documentation: `${req.protocol}://${req.get('host')}/api-docs`
    }
  });
});

// API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api/v1', apiRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
