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
      {
        name: "Videos",
        description: "Video content management for the platform",
      },
      {
        name: "PDFs",
        description: "PDF document management for the learning hub",
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
        Video: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Introduction to Critical Thinking" },
            description: { type: "string", example: "Learn the fundamentals of critical thinking and logical reasoning" },
            url: { type: "string", example: "https://youtube.com/watch?v=example" },
            category: { type: "string", example: "Education" },
            duration: { type: "string", example: "15:30" },
            status: { type: "string", enum: ["published", "draft"], example: "published" },
            thumbnail: { type: "string", example: "https://example.com/thumbnail.jpg" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          }
        },
        VideoRequest: {
          type: "object",
          required: ["title", "description", "url", "category", "duration"],
          properties: {
            title: { type: "string", example: "Introduction to Critical Thinking" },
            description: { type: "string", example: "Learn the fundamentals of critical thinking and logical reasoning" },
            url: { type: "string", example: "https://youtube.com/watch?v=example" },
            category: { type: "string", example: "Education" },
            duration: { type: "string", example: "15:30" },
            status: { type: "string", enum: ["published", "draft"], example: "published" },
            thumbnail: { type: "string", example: "https://example.com/thumbnail.jpg" },
          }
        },
        PDF: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Legal and Law Enforcement Vocabulary" },
            description: { type: "string", example: "Essential terms for police professionals" },
            category: { type: "string", example: "Vocabulary" },
            fileName: { type: "string", example: "legal-vocabulary.pdf" },
            fileSize: { type: "string", example: "2.4 MB" },
            filePath: { type: "string", example: "/uploads/pdfs/legal-vocabulary.pdf" },
            status: { type: "string", enum: ["published", "draft"], example: "published" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          }
        },
        PDFRequest: {
          type: "object",
          required: ["title", "description", "category", "fileName", "fileSize"],
          properties: {
            title: { type: "string", example: "Legal and Law Enforcement Vocabulary" },
            description: { type: "string", example: "Essential terms for police professionals" },
            category: { type: "string", example: "Vocabulary" },
            fileName: { type: "string", example: "legal-vocabulary.pdf" },
            fileSize: { type: "string", example: "2.4 MB" },
            filePath: { type: "string", example: "/uploads/pdfs/legal-vocabulary.pdf" },
            status: { type: "string", enum: ["published", "draft"], example: "published" },
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
      },
      "/api/videos": {
        get: {
          tags: ["Videos"],
          summary: "Get all videos with optional filtering",
          parameters: [
            {
              name: "status",
              in: "query",
              schema: { type: "string", enum: ["published", "draft"] },
              description: "Filter by video status"
            },
            {
              name: "category",
              in: "query",
              schema: { type: "string" },
              description: "Filter by video category"
            },
            {
              name: "search",
              in: "query",
              schema: { type: "string" },
              description: "Search in video title and description"
            }
          ],
          responses: {
            200: {
              description: "List of videos retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Videos retrieved successfully" },
                      count: { type: "integer", example: 5 },
                      videos: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Video" }
                      }
                    }
                  }
                }
              }
            },
            500: {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" }
                }
              }
            }
          }
        },
        post: {
          tags: ["Videos"],
          summary: "Create a new video (Admin only)",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/VideoRequest" }
              }
            }
          },
          responses: {
            201: {
              description: "Video created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Video created successfully" },
                      video: { $ref: "#/components/schemas/Video" }
                    }
                  }
                }
              }
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Missing required fields" },
                      required: {
                        type: "array",
                        items: { type: "string" },
                        example: ["title", "description", "url", "category", "duration"]
                      }
                    }
                  }
                }
              }
            },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin access required" },
            500: { description: "Internal server error" }
          }
        }
      },
      "/api/videos/{id}": {
        get: {
          tags: ["Videos"],
          summary: "Get a specific video by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the video to retrieve"
            }
          ],
          responses: {
            200: {
              description: "Video retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Video retrieved successfully" },
                      video: { $ref: "#/components/schemas/Video" }
                    }
                  }
                }
              }
            },
            400: {
              description: "Invalid video ID",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" }
                }
              }
            },
            404: {
              description: "Video not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" }
                }
              }
            },
            500: { description: "Internal server error" }
          }
        },
        patch: {
          tags: ["Videos"],
          summary: "Update a video (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the video to update"
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "Updated Video Title" },
                    description: { type: "string", example: "Updated video description" },
                    url: { type: "string", example: "https://youtube.com/watch?v=updated" },
                    category: { type: "string", example: "Education" },
                    duration: { type: "string", example: "20:45" },
                    status: { type: "string", enum: ["published", "draft"], example: "published" },
                    thumbnail: { type: "string", example: "https://example.com/new-thumbnail.jpg" }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "Video updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Video updated successfully" },
                      video: { $ref: "#/components/schemas/Video" }
                    }
                  }
                }
              }
            },
            400: { description: "Validation error or invalid video ID" },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin access required" },
            404: { description: "Video not found" },
            500: { description: "Internal server error" }
          }
        },
        delete: {
          tags: ["Videos"],
          summary: "Delete a video (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the video to delete"
            }
          ],
          responses: {
            200: {
              description: "Video deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Video deleted successfully" }
                    }
                  }
                }
              }
            },
            400: { description: "Invalid video ID" },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin access required" },
            404: { description: "Video not found" },
            500: { description: "Internal server error" }
          }
        }
      },
      "/api/pdfs": {
        get: {
          tags: ["PDFs"],
          summary: "Get all PDFs with optional filtering",
          parameters: [
            {
              name: "status",
              in: "query",
              schema: { type: "string", enum: ["published", "draft"] },
              description: "Filter by PDF status"
            },
            {
              name: "category",
              in: "query",
              schema: { type: "string" },
              description: "Filter by PDF category"
            },
            {
              name: "search",
              in: "query",
              schema: { type: "string" },
              description: "Search in PDF title and description"
            }
          ],
          responses: {
            200: {
              description: "List of PDFs retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "PDFs retrieved successfully" },
                      count: { type: "integer", example: 3 },
                      pdfs: {
                        type: "array",
                        items: { $ref: "#/components/schemas/PDF" }
                      }
                    }
                  }
                }
              }
            },
            500: {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" }
                }
              }
            }
          }
        },
        post: {
          tags: ["PDFs"],
          summary: "Upload a new PDF (Admin only)",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PDFRequest" }
              }
            }
          },
          responses: {
            201: {
              description: "PDF created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "PDF created successfully" },
                      pdf: { $ref: "#/components/schemas/PDF" }
                    }
                  }
                }
              }
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Missing required fields" },
                      required: {
                        type: "array",
                        items: { type: "string" },
                        example: ["title", "description", "category", "fileName", "fileSize"]
                      }
                    }
                  }
                }
              }
            },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin access required" },
            500: { description: "Internal server error" }
          }
        }
      },
      "/api/pdfs/{id}": {
        get: {
          tags: ["PDFs"],
          summary: "Get a specific PDF by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the PDF to retrieve"
            }
          ],
          responses: {
            200: {
              description: "PDF retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "PDF retrieved successfully" },
                      pdf: { $ref: "#/components/schemas/PDF" }
                    }
                  }
                }
              }
            },
            400: {
              description: "Invalid PDF ID",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" }
                }
              }
            },
            404: {
              description: "PDF not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" }
                }
              }
            },
            500: { description: "Internal server error" }
          }
        },
        patch: {
          tags: ["PDFs"],
          summary: "Update a PDF (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the PDF to update"
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "Updated PDF Title" },
                    description: { type: "string", example: "Updated PDF description" },
                    category: { type: "string", example: "Grammar" },
                    fileName: { type: "string", example: "updated-document.pdf" },
                    fileSize: { type: "string", example: "3.2 MB" },
                    filePath: { type: "string", example: "/uploads/pdfs/updated-document.pdf" },
                    status: { type: "string", enum: ["published", "draft"], example: "published" }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "PDF updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "PDF updated successfully" },
                      pdf: { $ref: "#/components/schemas/PDF" }
                    }
                  }
                }
              }
            },
            400: { description: "Validation error or invalid PDF ID" },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin access required" },
            404: { description: "PDF not found" },
            500: { description: "Internal server error" }
          }
        },
        delete: {
          tags: ["PDFs"],
          summary: "Delete a PDF (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the PDF to delete"
            }
          ],
          responses: {
            200: {
              description: "PDF deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "PDF deleted successfully" }
                    }
                  }
                }
              }
            },
            400: { description: "Invalid PDF ID" },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin access required" },
            404: { description: "PDF not found" },
            500: { description: "Internal server error" }
          }
        }
      },
      "/api/pdfs/{id}/download": {
        get: {
          tags: ["PDFs"],
          summary: "Download a PDF file",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "ID of the PDF to download"
            }
          ],
          responses: {
            200: {
              description: "PDF download information",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "PDF download information" },
                      pdf: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          title: { type: "string", example: "Legal Vocabulary" },
                          fileName: { type: "string", example: "legal-vocabulary.pdf" },
                          fileSize: { type: "string", example: "2.4 MB" },
                          filePath: { type: "string", example: "/uploads/pdfs/legal-vocabulary.pdf" },
                          downloadUrl: { type: "string", example: "/api/pdfs/1/download" }
                        }
                      }
                    }
                  }
                }
              }
            },
            400: { description: "Invalid PDF ID" },
            404: { description: "PDF not found" },
            500: { description: "Internal server error" }
          }
        }
      }
    }
  };
}

module.exports = {
  createSwaggerSpec,
};