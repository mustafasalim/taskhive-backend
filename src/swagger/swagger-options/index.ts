export const swaggerOptions = () => {
  return {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Mustafa Salim Auth Api",
        version: "1.0.0",
        description: "Auth API",
        contact: {
          name: "Developer",
        },
        servers: [
          {
            url: process.env.CLIENT_URL,
          },
        ],
      },
    },
    apis: ["./src/routes/**/swagger.ts"],
  }
}
