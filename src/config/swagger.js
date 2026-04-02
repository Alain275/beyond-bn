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
      {
        name: "Articles",
        description: "Article management for the learning hub",
      },
      {
        name: "Activities",
        description: "Activity management for the platform",
      },
      {
        name: "Debates",
        description: "Debate management for the platform",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
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
        Article: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "How to Write an Essay" },
            category: { type: "string", example: "Writing" },
            author: { type: "string", example: "Learning Hub Team" },
            status: { type: "string", enum: ["draft", "published"], example: "published" },
            content: { type: "string", example: "<p>HTML content here</p>" },
            image: { type: "string", example: "https://example.com/image.jpg" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          }
        },
        ArticleRequest: {
          type: "object",
          required: ["title", "category", "author", "content"],
          properties: {
            title: { type: "string", example: "How to Write an Essay" },
            category: { type: "string", example: "Writing" },
            author: { type: "string", example: "Learning Hub Team" },
            status: { type: "string", enum: ["draft", "published"], example: "published" },
            content: { type: "string", example: "<p>HTML content here</p>" },
            image: { type: "string", example: "https://example.com/image.jpg" },
          }
        },
        Activity: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Debate Competitions" },
            description: { type: "string", example: "Participate in structured debates on diverse topics..." },
            status: { type: "string", enum: ["active", "inactive"], example: "active" },
            image: { type: "string", example: "https://unsplash.com/photo" },
            participants: { type: "integer", example: 48 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          }
        },
        ActivityRequest: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: { type: "string", example: "Debate Competitions" },
            description: { type: "string", example: "Participate in structured debates on diverse topics..." },
            status: { type: "string", enum: ["active", "inactive"], example: "active" },
            image: { type: "string", example: "https://unsplash.com/photo" },
          }
        },
        Debate: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            motion: { type: "string", example: "This House Believes..." },
            category: { type: "string", example: "Technology" },
            status: { type: "string", enum: ["Open", "In Progress", "Completed", "Upcoming"], example: "Open" },
            date: { type: "string", example: "2026-03-20" },
            rounds: { type: "integer", example: 4 },
            points: { type: "integer", example: 300 },
            maxTeamSize: { type: "integer", example: 3 },
            judges: { type: "string", example: "Dr. Jean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          }
        },
        DebateRequest: {
          type: "object",
          required: ["motion", "category", "date"],
          properties: {
            motion: { type: "string", example: "This House Believes..." },
            category: { type: "string", example: "Technology" },
            status: { type: "string", enum: ["Open", "In Progress", "Completed", "Upcoming"], example: "Open" },
            date: { type: "string", example: "2026-03-20" },
            rounds: { type: "integer", example: 4 },
            points: { type: "integer", example: 300 },
            maxTeamSize: { type: "integer", example: 3 },
            judges: { type: "string", example: "Dr. Jean" },
          }
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
      "/api/articles": {
        get: {
          tags: ["Articles"],
          summary: "Get all articles",
          responses: {
            200: {
              description: "List of articles",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Article" }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ["Articles"],
          summary: "Create a new article (Admin only)",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "category", "author", "content"],
                  properties: {
                    title: { type: "string", example: "How to Write an Essay" },
                    category: { type: "string", example: "Writing" },
                    author: { type: "string", example: "Learning Hub Team" },
                    status: { type: "string", enum: ["draft", "published"], example: "published" },
                    content: { type: "string", example: "<p>HTML content here</p>" },
                    image: { type: "string", example: "https://example.com/image.jpg" }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: "Article created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Article" }
                }
              }
            },
            400: {
              description: "Validation error"
            },
            401: {
              description: "Unauthorized"
            },
            403: {
              description: "Forbidden - Admin access required"
            }
          }
        }
      },
      "/api/articles/{id}": {
        get: {
          tags: ["Articles"],
          summary: "Get a specific article by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "Integer ID of the article to retrieve"
            }
          ],
          responses: {
            200: {
              description: "Article retrieved successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Article" }
                }
              }
            },
            400: {
              description: "Invalid article ID"
            },
            404: {
              description: "Article not found"
            }
          }
        },
        patch: {
          tags: ["Articles"],
          summary: "Update an article (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the article to update"
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "How to Write an Essay" },
                    category: { type: "string", example: "Writing" },
                    author: { type: "string", example: "Learning Hub Team" },
                    status: { type: "string", enum: ["draft", "published"], example: "published" },
                    content: { type: "string", example: "<p>HTML content here</p>" },
                    image: { type: "string", example: "https://example.com/image.jpg" }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "Article updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Article" }
                }
              }
            },
            404: {
              description: "Article not found"
            }
          }
        },
        delete: {
          tags: ["Articles"],
          summary: "Delete an article (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the article to delete"
            }
          ],
          responses: {
            200: {
              description: "Article deleted successfully",
              content: {
                "application/json": {
                  schema: { 
                    type: "object", 
                    properties: { message: { type: "string" } } 
                  }
                }
              }
            },
            404: {
              description: "Article not found"
            }
          }
        }
      },
      "/api/articles/upload-image": {
        post: {
          tags: ["Articles"],
          summary: "Upload an article image (Admin only)",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["image"],
                  properties: {
                    image: {
                      type: "string",
                      format: "binary",
                      description: "Image file (jpeg, jpg, png, gif, webp; max 5MB)"
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "Image uploaded successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      imageUrl: {
                        type: "string",
                        example: "/uploads/articles/article-1710000000000-123456789.jpg"
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: "Invalid upload request"
            },
            401: {
              description: "Unauthorized"
            },
            403: {
              description: "Forbidden - Admin access required"
            }
          }
        }
      },
      "/api/activities": {
        get: {
          tags: ["Activities"],
          summary: "Get all activities",
          responses: {
            200: {
              description: "List of activities",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Activity" }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ["Activities"],
          summary: "Create a new activity (Admin only)",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "description"],
                  properties: {
                    title: { type: "string", example: "Debate Competitions" },
                    description: { type: "string", example: "Participate in structured debates on diverse topics..." },
                    status: { type: "string", enum: ["active", "inactive"], example: "active" },
                    image: { type: "string", example: "https://unsplash.com/photo" },
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: "Activity created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Activity" }
                }
              }
            }
          }
        }
      },
      "/api/activities/{id}": {
        patch: {
          tags: ["Activities"],
          summary: "Update an activity (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the activity to update"
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "Debate Competitions" },
                    description: { type: "string", example: "Participate in structured debates on diverse topics..." },
                    status: { type: "string", enum: ["active", "inactive"], example: "active" },
                    image: { type: "string", example: "https://unsplash.com/photo" },
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "Activity updated successfully"
            }
          }
        },
        delete: {
          tags: ["Activities"],
          summary: "Delete an activity (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the activity to delete"
            }
          ],
          responses: {
            200: {
              description: "Activity deleted successfully"
            }
          }
        }
      }
    },
    "/api/debates": {
      get: {
        tags: ["Debates"],
        summary: "Get all debates",
        responses: {
          200: {
            description: "A list of debates",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Debate" } }
              }
            }
          }
        }
      },
      post: {
        tags: ["Debates"],
        summary: "Create a new debate (Admin only)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/DebateRequest" } } }
        },
        responses: {
          201: { description: "Debate created", content: { "application/json": { schema: { $ref: "#/components/schemas/Debate" } } } },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" }
        }
      }
    },
    "/api/debates/{id}": {
      put: {
        tags: ["Debates"],
        summary: "Update a debate (Admin only)",
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", description: "ID of the debate to update" } }
        ],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/DebateRequest" } } }
        },
        responses: {
          200: { description: "Debate updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Debate" } } } },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
          404: { description: "Debate not found" }
        }
      },
      delete: {
        tags: ["Debates"],
        summary: "Delete a debate (Admin only)",
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", description: "ID of the debate to delete" } }
        ],
        responses: {
          200: { description: "Debate deleted" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
          404: { description: "Debate not found" }
        }
      }
    }
  };
}

module.exports = {
  createSwaggerSpec,
};