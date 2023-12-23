const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Filmax API",
      version: "1.0.0",
      description: "Descripción de la API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./Router/*.js"],
};

const swagger = swaggerJSDoc(options);

module.exports = swagger;
