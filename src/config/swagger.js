function createSwaggerSpec(port) {
  return {
    openapi: "3.0.3",
    info: {
      title: "Beyond Authentication API",
      version: "1.0.0",
      description: "Authentication APIs for the Beyond the Horizon platform.",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Registration and login endpoints",
      },
    ],
    components: {
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["firstName", "lastName", "email", "password", "confirmPassword"],
          properties: {
            firstName: { type: "string", example: "Alain" },
            lastName: { type: "string", example: "Mukasa" },
            phone: { type: "string", example: "+250700000000" },
            email: { type: "string", format: "email", example: "alain@example.com" },
            password: { type: "string", format: "password", example: "Secret@123" },
            confirmPassword: { type: "string", format: "password", example: "Secret@123" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["identifier", "password"],
          properties: {
            identifier: {
              type: "string",
              example: "admin@beyond.com",
              description: "User email or generated student ID",
            },
            password: { type: "string", format: "password", example: "Admin@123" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            studentId: { type: "string", example: "BTH-0001" },
            firstName: { type: "string", example: "System" },
            lastName: { type: "string", example: "Admin" },
            phone: { type: "string", example: "+0000000000" },
            email: { type: "string", format: "email", example: "admin@beyond.com" },
            role: { type: "string", enum: ["user", "admin"], example: "admin" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        AuthSuccessResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login successful." },
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" },
            user: { $ref: "#/components/schemas/User" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Invalid credentials." },
          },
        },
      },
    },
    paths: {
      "/health": {
        get: {
          summary: "Health check",
          responses: {
            200: {
              description: "Service is up",
            },
          },
        },
      },
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user or admin",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterRequest" },
              },
            },
          },
          responses: {
            201: {
              description: "Registration successful",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthSuccessResponse" },
                },
              },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            409: {
              description: "Duplicate email",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Log in with email or student ID",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthSuccessResponse" },
                },
              },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            401: {
              description: "Invalid credentials",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
    },
  };
}

module.exports = {
  createSwaggerSpec,
};