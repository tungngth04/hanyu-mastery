const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hanyu Mastery API',
      version: '1.0.0',
      description: 'API documentation for Hanyu Mastery website',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api/v1`,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },

    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
