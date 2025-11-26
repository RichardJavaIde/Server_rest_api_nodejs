import swaggerJSDoc from "swagger-jsdoc";


const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Products ",
                description: "Endpoints for managing products",
            }
        ],
        info: {
            title: "Product Management API Node.js / Express / typescript",
            version: "1.0.0",
            description: "API for managing products, built with Node.js, Express, and TypeScript."
        }
    },
    apis: ["./src/routes.ts"],
}
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;