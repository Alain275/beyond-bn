function createSwaggerSpec(port) {
  return {
    openapi: "3.0.3",
    info: {
      title: "Beyond the Horizon API",
      version: "1.0.0",
      description: "Comprehensive REST API for the Beyond the Horizon platform. This API provides endpoints for user authentication, article management, video content, PDF documents, debate competitions, and activity tracking. All admin endpoints require JWT authentication via Bearer token.",
      contact: {
        name: "Beyond the Horizon Support",
        email: "support@beyond.com"
      }
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
            firstName: { 
              type: "string", 
              example: "Alain",
              description: "User's first name",
              minLength: 2,
              maxLength: 50
            },
            lastName: { 
              type: "string", 
              example: "Mukasa",
              description: "User's last name",
              minLength: 2,
              maxLength: 50
            },
            phone: { 
              type: "string", 
              example: "+250700000000",
              description: "User's phone number with country code (optional)",
              pattern: "^\\+?[1-9]\\d{1,14}$"
            },
            email: { 
              type: "string", 
              format: "email", 
              example: "alain.mukasa@example.com",
              description: "User's email address (must be unique)"
            },
            password: { 
              type: "string", 
              format: "password", 
              example: "Secret@123",
              description: "Password (must contain uppercase, lowercase, number, and special character)",
              minLength: 8
            },
            confirmPassword: { 
              type: "string", 
              format: "password", 
              example: "Secret@123",
              description: "Password confirmation (must match password field)"
            },
            role: { 
              type: "string", 
              enum: ["user", "admin"], 
              example: "user",
              description: "User role - 'user' for regular users, 'admin' for administrators",
              default: "user"
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["identifier", "password"],
          properties: {
            identifier: {
              type: "string",
              example: "admin@beyond.com",
              description: "User email address or auto-generated student ID (e.g., BTH-0001)",
            },
            password: { 
              type: "string", 
              format: "password", 
              example: "Admin@123",
              description: "User's password",
              minLength: 8
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { 
              type: "integer", 
              example: 1,
              description: "Unique identifier for the user"
            },
            studentId: { 
              type: "string", 
              example: "BTH-0001",
              description: "Auto-generated student ID (format: BTH-XXXX)"
            },
            firstName: { 
              type: "string", 
              example: "System",
              description: "User's first name"
            },
            lastName: { 
              type: "string", 
              example: "Admin",
              description: "User's last name"
            },
            phone: { 
              type: "string", 
              example: "+250700000000",
              description: "User's phone number with country code"
            },
            email: { 
              type: "string", 
              format: "email", 
              example: "admin@beyond.com",
              description: "User's email address"
            },
            role: { 
              type: "string", 
              enum: ["user", "admin"], 
              example: "admin",
              description: "User's role in the system"
            },
            createdAt: { 
              type: "string", 
              format: "date-time",
              description: "Timestamp when the user account was created"
            },
          },
        },
        AuthSuccessResponse: {
          type: "object",
          properties: {
            message: { 
              type: "string", 
              example: "Login successful.",
              description: "Success message"
            },
            token: { 
              type: "string", 
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3R1ZGVudElkIjoiQlRILTAwMDEiLCJlbWFpbCI6ImFkbWluQGJleW9uZC5jb20iLCJyb2xlIjoiYWRtaW4ifQ.xyz123",
              description: "JWT authentication token (use in Authorization header as 'Bearer <token>')"
            },
            user: { 
              $ref: "#/components/schemas/User",
              description: "User information object"
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { 
              type: "string", 
              example: "Invalid credentials.",
              description: "Error message describing what went wrong"
            },
            required: {
              type: "array",
              items: { type: "string" },
              example: ["title", "category", "author", "content"],
              description: "List of required fields (only present in validation errors)"
            },
            errors: {
              type: "array",
              items: { type: "string" },
              example: ["Email must be valid", "Password must be at least 8 characters"],
              description: "Detailed validation error messages (only present in validation errors)"
            }
          },
        },
        Article: {
          type: "object",
          properties: {
            id: { 
              type: "string", 
              format: "uuid", 
              example: "550e8400-e29b-41d4-a716-446655440000",
              description: "Unique identifier for the article (UUID)"
            },
            title: { 
              type: "string", 
              example: "How to Write an Effective Essay: A Comprehensive Guide",
              description: "Title of the article"
            },
            category: { 
              type: "string", 
              example: "Writing",
              description: "Category of the article (e.g., Writing, Grammar, Research, Critical Thinking)"
            },
            author: { 
              type: "string", 
              example: "Learning Hub Team",
              description: "Author or creator of the article"
            },
            status: { 
              type: "string", 
              enum: ["draft", "published"], 
              example: "published",
              description: "Publication status of the article"
            },
            content: { 
              type: "string", 
              example: "<h2>Introduction</h2><p>Writing an effective essay requires careful planning and execution...</p>",
              description: "HTML content of the article"
            },
            image: { 
              type: "string", 
              example: "https://example.com/images/essay-writing.jpg",
              description: "URL or path to the article's featured image"
            },
            createdAt: { 
              type: "string", 
              format: "date-time",
              description: "Timestamp when the article was created"
            },
            updatedAt: { 
              type: "string", 
              format: "date-time",
              description: "Timestamp when the article was last updated"
            },
          }
        },
        ArticleRequest: {
          type: "object",
          required: ["title", "category", "author", "content"],
          properties: {
            title: { 
              type: "string", 
              example: "How to Write an Effective Essay: A Comprehensive Guide",
              description: "Title of the article",
              minLength: 5,
              maxLength: 200
            },
            category: { 
              type: "string", 
              example: "Writing",
              description: "Category of the article (e.g., Writing, Grammar, Research, Critical Thinking)"
            },
            author: { 
              type: "string", 
              example: "Learning Hub Team",
              description: "Author or creator of the article",
              minLength: 2,
              maxLength: 100
            },
            status: { 
              type: "string", 
              enum: ["draft", "published"], 
              example: "published",
              description: "Publication status - 'draft' for unpublished, 'published' for public articles",
              default: "draft"
            },
            content: { 
              type: "string", 
              example: "<h2>Introduction</h2><p>Writing an effective essay requires careful planning and execution. This guide will walk you through the essential steps...</p><h2>Step 1: Understanding the Prompt</h2><p>Before you begin writing, make sure you fully understand what is being asked...</p>",
              description: "HTML content of the article (supports rich text formatting)"
            },
            image: { 
              type: "string", 
              example: "https://example.com/images/essay-writing.jpg",
              description: "URL or path to the article's featured image (can be external URL or uploaded path like /uploads/articles/article-123.jpg)"
            },
          }
        },
        Activity: {
          type: "object",
          properties: {
            id: { 
              type: "integer", 
              example: 1,
              description: "Unique identifier for the activity"
            },
            title: { 
              type: "string", 
              example: "Debate Competitions",
              description: "Title of the activity"
            },
            description: { 
              type: "string", 
              example: "Participate in structured debates on diverse topics to enhance critical thinking, public speaking, and argumentation skills. Join teams and compete in regional and national competitions.",
              description: "Detailed description of the activity"
            },
            status: { 
              type: "string", 
              enum: ["active", "inactive"], 
              example: "active",
              description: "Status of the activity - 'active' for ongoing, 'inactive' for paused/ended"
            },
            image: { 
              type: "string", 
              example: "https://images.unsplash.com/photo-debate-competition",
              description: "URL to the activity's image"
            },
            participants: { 
              type: "integer", 
              example: 48,
              description: "Number of participants enrolled in the activity"
            },
            createdAt: { 
              type: "string", 
              format: "date-time",
              description: "Timestamp when the activity was created"
            },
            updatedAt: { 
              type: "string", 
              format: "date-time",
              description: "Timestamp when the activity was last updated"
            },
          }
        },
        ActivityRequest: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: { 
              type: "string", 
              example: "Debate Competitions",
              description: "Title of the activity",
              minLength: 3,
              maxLength: 150
            },
            description: { 
              type: "string", 
              example: "Participate in structured debates on diverse topics to enhance critical thinking, public speaking, and argumentation skills. Join teams and compete in regional and national competitions.",
              description: "Detailed description of the activity",
              minLength: 20,
              maxLength: 1000
            },
            status: { 
              type: "string", 
              enum: ["active", "inactive"], 
              example: "active",
              description: "Status of the activity - 'active' for ongoing, 'inactive' for paused/ended",
              default: "active"
            },
            image: { 
              type: "string", 
              example: "https://images.unsplash.com/photo-debate-competition",
              description: "URL to the activity's image (optional)"
            },
          }
        },
        Debate: {
          type: "object",
          properties: {
            id: { 
              type: "integer", 
              example: 1,
              description: "Unique identifier for the debate"
            },
            motion: { 
              type: "string", 
              example: "This House Believes That Artificial Intelligence Will Do More Harm Than Good",
              description: "The debate motion or topic statement"
            },
            category: { 
              type: "string", 
              example: "Technology",
              description: "Category of the debate"
            },
            status: { 
              type: "string", 
              enum: ["Open", "In Progress", "Completed", "Upcoming"], 
              example: "Open",
              description: "Current status of the debate"
            },
            date: { 
              type: "string", 
              format: "date",
              example: "2026-03-20",
              description: "Date when the debate is scheduled"
            },
            rounds: { 
              type: "integer", 
              example: 4,
              description: "Number of debate rounds"
            },
            points: { 
              type: "integer", 
              example: 300,
              description: "Points awarded for participation or winning"
            },
            maxTeamSize: { 
              type: "integer", 
              example: 3,
              description: "Maximum number of members per team"
            },
            judges: { 
              type: "string", 
              example: "Dr. Jean Mukasa, Prof. Sarah Williams",
              description: "Names of judges"
            },
            createdAt: { 
              type: "string", 
              format: "date-time",
              description: "Timestamp when the debate was created"
            },
            updatedAt: { 
              type: "string", 
              format: "date-time",
              description: "Timestamp when the debate was last updated"
            },
          }
        },
        DebateRequest: {
          type: "object",
          required: ["motion", "category", "date"],
          properties: {
            motion: { 
              type: "string", 
              example: "This House Believes That Artificial Intelligence Will Do More Harm Than Good",
              description: "The debate motion or topic statement"
            },
            category: { 
              type: "string", 
              example: "Technology",
              description: "Category of the debate (e.g., Technology, Politics, Education, Environment)"
            },
            status: { 
              type: "string", 
              enum: ["Open", "In Progress", "Completed", "Upcoming"], 
              example: "Open",
              description: "Current status of the debate"
            },
            date: { 
              type: "string", 
              format: "date",
              example: "2026-03-20",
              description: "Date when the debate is scheduled (YYYY-MM-DD format)"
            },
            rounds: { 
              type: "integer", 
              example: 4,
              description: "Number of debate rounds",
              minimum: 1
            },
            points: { 
              type: "integer", 
              example: 300,
              description: "Points awarded for participation or winning",
              minimum: 0
            },
            maxTeamSize: { 
              type: "integer", 
              example: 3,
              description: "Maximum number of members per team",
              minimum: 1
            },
            judges: { 
              type: "string", 
              example: "Dr. Jean Mukasa, Prof. Sarah Williams",
              description: "Names of judges (comma-separated if multiple)"
            },
          }
        },
        Video: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { 
              type: "string", 
              example: "Introduction to Public Speaking" 
            },
            description: { 
              type: "string", 
              example: "Learn the fundamentals of effective public speaking and presentation skills" 
            },
            url: { 
              type: "string", 
              example: "https://youtube.com/watch?v=abc123",
              description: "URL to the video (YouTube, Vimeo, or direct link)"
            },
            category: { 
              type: "string", 
              example: "Communication Skills" 
            },
            duration: { 
              type: "string", 
              example: "15:30",
              description: "Video duration in MM:SS or HH:MM:SS format"
            },
            status: { 
              type: "string", 
              enum: ["draft", "published"], 
              example: "published" 
            },
            thumbnail: { 
              type: "string", 
              example: "https://example.com/thumbnails/video-1.jpg",
              description: "URL to the video thumbnail image"
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          }
        },
        VideoRequest: {
          type: "object",
          required: ["title", "description", "url", "category", "duration"],
          properties: {
            title: { 
              type: "string", 
              example: "Introduction to Public Speaking",
              description: "Title of the video",
              minLength: 3,
              maxLength: 200
            },
            description: { 
              type: "string", 
              example: "Learn the fundamentals of effective public speaking and presentation skills. This comprehensive guide covers body language, voice modulation, audience engagement, and overcoming stage fright.",
              description: "Detailed description of the video content",
              minLength: 10,
              maxLength: 1000
            },
            url: { 
              type: "string", 
              format: "uri",
              example: "https://youtube.com/watch?v=abc123",
              description: "URL to the video (YouTube, Vimeo, or direct link)"
            },
            category: { 
              type: "string", 
              example: "Communication Skills",
              description: "Category of the video (e.g., Communication Skills, Leadership, Debate Techniques)"
            },
            duration: { 
              type: "string", 
              example: "15:30",
              pattern: "^([0-9]{1,2}:)?[0-5][0-9]:[0-5][0-9]$",
              description: "Video duration in MM:SS or HH:MM:SS format"
            },
            status: { 
              type: "string", 
              enum: ["draft", "published"], 
              example: "published",
              description: "Publication status of the video"
            },
            thumbnail: { 
              type: "string", 
              format: "uri",
              example: "https://example.com/thumbnails/video-1.jpg",
              description: "URL to the video thumbnail image (optional)"
            }
          }
        },
        PDF: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { 
              type: "string", 
              example: "Legal Vocabulary Guide" 
            },
            description: { 
              type: "string", 
              example: "Comprehensive guide to legal terminology and vocabulary for law students" 
            },
            category: { 
              type: "string", 
              example: "Legal Studies" 
            },
            fileName: { 
              type: "string", 
              example: "legal-vocabulary-guide.pdf" 
            },
            fileSize: { 
              type: "string", 
              example: "2.4 MB" 
            },
            filePath: { 
              type: "string", 
              example: "/uploads/pdfs/legal-vocabulary-guide.pdf" 
            },
            status: { 
              type: "string", 
              enum: ["draft", "published"], 
              example: "published" 
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          }
        },
        PDFRequest: {
          type: "object",
          required: ["title", "description", "category", "fileName", "fileSize"],
          properties: {
            title: { 
              type: "string", 
              example: "Legal Vocabulary Guide",
              description: "Title of the PDF document",
              minLength: 3,
              maxLength: 200
            },
            description: { 
              type: "string", 
              example: "Comprehensive guide to legal terminology and vocabulary for law students. Includes definitions, usage examples, and practice exercises.",
              description: "Detailed description of the PDF content",
              minLength: 10,
              maxLength: 1000
            },
            category: { 
              type: "string", 
              example: "Legal Studies",
              description: "Category of the PDF (e.g., Legal Studies, Grammar, Writing, Research)"
            },
            fileName: { 
              type: "string", 
              example: "legal-vocabulary-guide.pdf",
              pattern: "^.*\\.pdf$",
              description: "Name of the PDF file (must end with .pdf)"
            },
            fileSize: { 
              type: "string", 
              example: "2.4 MB",
              description: "Size of the PDF file (e.g., '2.4 MB', '1.5 KB')"
            },
            filePath: { 
              type: "string", 
              example: "/uploads/pdfs/legal-vocabulary-guide.pdf",
              description: "Path where the PDF is stored (optional)"
            },
            status: { 
              type: "string", 
              enum: ["draft", "published"], 
              example: "published",
              description: "Publication status of the PDF"
            }
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
          description: "Create a new user account. Users are automatically assigned a unique student ID (format: BTH-XXXX). Passwords must be at least 8 characters and match the confirmation.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterRequest" },
                examples: {
                  regularUser: {
                    summary: "Regular User Registration",
                    value: {
                      firstName: "Alain",
                      lastName: "Mukasa",
                      phone: "+250700123456",
                      email: "alain.mukasa@example.com",
                      password: "SecurePass@123",
                      confirmPassword: "SecurePass@123",
                      role: "user"
                    }
                  },
                  adminUser: {
                    summary: "Admin User Registration",
                    value: {
                      firstName: "Sarah",
                      lastName: "Johnson",
                      phone: "+250788654321",
                      email: "sarah.admin@beyond.com",
                      password: "AdminSecure@456",
                      confirmPassword: "AdminSecure@456",
                      role: "admin"
                    }
                  },
                  minimalUser: {
                    summary: "Minimal Registration (No Phone)",
                    value: {
                      firstName: "John",
                      lastName: "Doe",
                      email: "john.doe@example.com",
                      password: "MyPassword@789",
                      confirmPassword: "MyPassword@789"
                    }
                  }
                }
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
          description: "Authenticate a user using either their email address or auto-generated student ID. Returns a JWT token that should be included in the Authorization header for protected endpoints.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" },
                examples: {
                  emailLogin: {
                    summary: "Login with Email",
                    value: {
                      identifier: "admin@beyond.com",
                      password: "Admin@123"
                    }
                  },
                  studentIdLogin: {
                    summary: "Login with Student ID",
                    value: {
                      identifier: "BTH-0001",
                      password: "Admin@123"
                    }
                  },
                  userLogin: {
                    summary: "Regular User Login",
                    value: {
                      identifier: "alain.mukasa@example.com",
                      password: "SecurePass@123"
                    }
                  }
                }
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
          summary: "Get all articles with optional filtering",
          parameters: [
            {
              name: "status",
              in: "query",
              schema: { type: "string", enum: ["published", "draft"] },
              description: "Filter by article status"
            },
            {
              name: "category",
              in: "query",
              schema: { type: "string" },
              description: "Filter by article category"
            },
            {
              name: "search",
              in: "query",
              schema: { type: "string" },
              description: "Search in article title, author, and content"
            }
          ],
          responses: {
            200: {
              description: "List of articles retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Articles retrieved successfully" },
                      count: { type: "integer", example: 10 },
                      articles: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Article" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ["Articles"],
          summary: "Create a new article (Admin only)",
          description: "Create a new article with rich HTML content. Requires admin authentication. The article can be saved as a draft or published immediately.",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "category", "author", "content"],
                  properties: {
                    title: { 
                      type: "string", 
                      example: "How to Write an Effective Essay: A Comprehensive Guide",
                      description: "Title of the article"
                    },
                    category: { 
                      type: "string", 
                      example: "Writing",
                      description: "Category (e.g., Writing, Grammar, Research, Critical Thinking)"
                    },
                    author: { 
                      type: "string", 
                      example: "Learning Hub Team",
                      description: "Author name"
                    },
                    status: { 
                      type: "string", 
                      enum: ["draft", "published"], 
                      example: "published",
                      description: "Publication status (defaults to 'draft' if not provided)"
                    },
                    content: { 
                      type: "string", 
                      example: "<h2>Introduction</h2><p>Writing an effective essay requires careful planning and execution. This guide will walk you through the essential steps...</p><h2>Step 1: Understanding the Prompt</h2><p>Before you begin writing, make sure you fully understand what is being asked...</p><h2>Step 2: Research and Brainstorming</h2><p>Gather relevant information and organize your thoughts...</p>",
                      description: "HTML content of the article"
                    },
                    image: { 
                      type: "string", 
                      example: "https://example.com/images/essay-writing.jpg",
                      description: "URL or path to featured image (can be external URL or uploaded path)"
                    }
                  }
                },
                examples: {
                  publishedArticle: {
                    summary: "Published Article Example",
                    value: {
                      title: "Mastering Public Speaking: Tips and Techniques",
                      category: "Communication Skills",
                      author: "Dr. Sarah Johnson",
                      status: "published",
                      content: "<h2>Introduction</h2><p>Public speaking is one of the most valuable skills you can develop...</p><h2>Overcoming Stage Fright</h2><p>Many people experience anxiety when speaking in public. Here are some proven techniques...</p><ul><li>Practice deep breathing exercises</li><li>Visualize success</li><li>Start with smaller audiences</li></ul>",
                      image: "https://example.com/images/public-speaking.jpg"
                    }
                  },
                  draftArticle: {
                    summary: "Draft Article Example",
                    value: {
                      title: "Introduction to Critical Thinking",
                      category: "Critical Thinking",
                      author: "Learning Hub Team",
                      status: "draft",
                      content: "<h2>What is Critical Thinking?</h2><p>Critical thinking is the ability to analyze information objectively...</p>",
                      image: "/uploads/articles/critical-thinking-draft.jpg"
                    }
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
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Article created successfully" },
                      article: { $ref: "#/components/schemas/Article" }
                    }
                  }
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
      "/api/articles/upload-image": {
        post: {
          tags: ["Articles"],
          summary: "Upload an image for articles (Admin only)",
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
                      description: "Image file (JPEG, PNG, GIF, WebP) - Max 5MB"
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
                      message: { type: "string", example: "Image uploaded successfully" },
                      imageUrl: { type: "string", example: "/uploads/articles/article-1234567890-123456789.jpg" },
                      fileName: { type: "string", example: "article-1234567890-123456789.jpg" },
                      fileSize: { type: "string", example: "245.67 KB" },
                      mimeType: { type: "string", example: "image/jpeg" }
                    }
                  }
                }
              }
            },
            400: {
              description: "Validation error - No file provided or invalid file type"
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
              schema: { type: "string", format: "uuid" },
              description: "UUID of the article to retrieve"
            }
          ],
          responses: {
            200: {
              description: "Article retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Article retrieved successfully" },
                      article: { $ref: "#/components/schemas/Article" }
                    }
                  }
                }
              }
            },
            400: {
              description: "Invalid article ID format"
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
              schema: { type: "string", format: "uuid" },
              description: "UUID of the article to update"
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
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Article updated successfully" },
                      article: { $ref: "#/components/schemas/Article" }
                    }
                  }
                }
              }
            },
            400: {
              description: "Invalid article ID format or validation error"
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
              schema: { type: "string", format: "uuid" },
              description: "UUID of the article to delete"
            }
          ],
          responses: {
            200: {
              description: "Article deleted successfully",
              content: {
                "application/json": {
                  schema: { 
                    type: "object", 
                    properties: { message: { type: "string", example: "Article deleted successfully" } } 
                  }
                }
              }
            },
            400: {
              description: "Invalid article ID format"
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
          description: "Create a new activity for the platform. Activities can include debate competitions, workshops, seminars, and other educational events. Requires admin authentication.",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "description"],
                  properties: {
                    title: { 
                      type: "string", 
                      example: "Debate Competitions",
                      description: "Title of the activity"
                    },
                    description: { 
                      type: "string", 
                      example: "Participate in structured debates on diverse topics to enhance critical thinking, public speaking, and argumentation skills. Join teams and compete in regional and national competitions.",
                      description: "Detailed description of the activity"
                    },
                    status: { 
                      type: "string", 
                      enum: ["active", "inactive"], 
                      example: "active",
                      description: "Status of the activity"
                    },
                    image: { 
                      type: "string", 
                      example: "https://images.unsplash.com/photo-debate-competition",
                      description: "URL to the activity's image"
                    },
                  }
                },
                examples: {
                  debateCompetition: {
                    summary: "Debate Competition Activity",
                    value: {
                      title: "National Debate Championships",
                      description: "Participate in structured debates on diverse topics to enhance critical thinking, public speaking, and argumentation skills. Join teams and compete in regional and national competitions. Open to all skill levels with mentorship available.",
                      status: "active",
                      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
                    }
                  },
                  publicSpeakingWorkshop: {
                    summary: "Public Speaking Workshop",
                    value: {
                      title: "Public Speaking Mastery Workshop",
                      description: "Intensive workshop series designed to build confidence and competence in public speaking. Learn techniques for engaging audiences, managing nervousness, and delivering impactful presentations. Includes practical exercises and personalized feedback.",
                      status: "active",
                      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2"
                    }
                  },
                  writingCircle: {
                    summary: "Writing Circle",
                    value: {
                      title: "Creative Writing Circle",
                      description: "Join fellow writers in a supportive environment to share work, receive constructive feedback, and improve your writing skills. Covers various genres including essays, poetry, short stories, and academic writing.",
                      status: "active",
                      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a"
                    }
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
        description: "Retrieve a list of all debates. No authentication required. Returns debates with all their details including motion, category, status, date, rounds, points, team size, and judges.",
        responses: {
          200: {
            description: "List of debates retrieved successfully",
            content: {
              "application/json": {
                schema: { 
                  type: "array", 
                  items: { $ref: "#/components/schemas/Debate" } 
                },
                examples: {
                  debatesList: {
                    summary: "Sample Debates List",
                    value: [
                      {
                        id: 1,
                        motion: "This House Believes That Artificial Intelligence Will Do More Harm Than Good",
                        category: "Technology",
                        status: "Open",
                        date: "2026-04-15",
                        rounds: 4,
                        points: 300,
                        maxTeamSize: 3,
                        judges: "Dr. Jean Mukasa, Prof. Sarah Williams",
                        createdAt: "2026-03-01T10:00:00Z",
                        updatedAt: "2026-03-01T10:00:00Z"
                      },
                      {
                        id: 2,
                        motion: "This House Would Make University Education Free For All Citizens",
                        category: "Education",
                        status: "Upcoming",
                        date: "2026-05-20",
                        rounds: 5,
                        points: 500,
                        maxTeamSize: 4,
                        judges: "Prof. Mary Johnson, Dr. Robert Brown",
                        createdAt: "2026-03-02T14:30:00Z",
                        updatedAt: "2026-03-02T14:30:00Z"
                      }
                    ]
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
        tags: ["Debates"],
        summary: "Create a new debate (Admin only)",
        description: "Schedule a new debate competition. Requires admin authentication. Debates can be created with various statuses and configurations.",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 
            "application/json": { 
              schema: { $ref: "#/components/schemas/DebateRequest" },
              examples: {
                technologyDebate: {
                  summary: "Technology Debate",
                  value: {
                    motion: "This House Believes That Artificial Intelligence Will Do More Harm Than Good",
                    category: "Technology",
                    status: "Open",
                    date: "2026-04-15",
                    rounds: 4,
                    points: 300,
                    maxTeamSize: 3,
                    judges: "Dr. Jean Mukasa, Prof. Sarah Williams, Mr. David Chen"
                  }
                },
                educationDebate: {
                  summary: "Education Debate",
                  value: {
                    motion: "This House Would Make University Education Free For All Citizens",
                    category: "Education",
                    status: "Upcoming",
                    date: "2026-05-20",
                    rounds: 5,
                    points: 500,
                    maxTeamSize: 4,
                    judges: "Prof. Mary Johnson, Dr. Robert Brown"
                  }
                },
                environmentDebate: {
                  summary: "Environment Debate",
                  value: {
                    motion: "This House Supports A Complete Ban On Single-Use Plastics",
                    category: "Environment",
                    status: "Open",
                    date: "2026-04-30",
                    rounds: 3,
                    points: 250,
                    maxTeamSize: 2,
                    judges: "Dr. Emily Green, Prof. James Wilson"
                  }
                }
              }
            } 
          }
        },
        responses: {
          201: { description: "Debate created", content: { "application/json": { schema: { $ref: "#/components/schemas/Debate" } } } },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" }
        }
      }
    },
    "/api/debates/{id}": {
      patch: {
        tags: ["Debates"],
        summary: "Update a debate (Admin only)",
        description: "Update an existing debate's details. All fields are optional - only provided fields will be updated. Requires admin authentication.",
        security: [{ BearerAuth: [] }],
        parameters: [
          { 
            name: "id", 
            in: "path", 
            required: true, 
            schema: { type: "integer" },
            description: "ID of the debate to update",
            example: 1
          }
        ],
        requestBody: {
          required: true,
          content: { 
            "application/json": { 
              schema: {
                type: "object",
                properties: {
                  motion: { 
                    type: "string", 
                    example: "This House Believes That Social Media Does More Harm Than Good",
                    description: "Updated debate motion"
                  },
                  category: { 
                    type: "string", 
                    example: "Social Issues",
                    description: "Updated category"
                  },
                  status: { 
                    type: "string", 
                    enum: ["Open", "In Progress", "Completed", "Upcoming"], 
                    example: "In Progress",
                    description: "Updated status"
                  },
                  date: { 
                    type: "string", 
                    format: "date",
                    example: "2026-04-20",
                    description: "Updated debate date"
                  },
                  rounds: { 
                    type: "integer", 
                    example: 5,
                    description: "Updated number of rounds"
                  },
                  points: { 
                    type: "integer", 
                    example: 400,
                    description: "Updated points"
                  },
                  maxTeamSize: { 
                    type: "integer", 
                    example: 4,
                    description: "Updated max team size"
                  },
                  judges: { 
                    type: "string", 
                    example: "Dr. Jean Mukasa, Prof. Sarah Williams, Dr. Michael Lee",
                    description: "Updated judges list"
                  }
                }
              },
              examples: {
                statusUpdate: {
                  summary: "Update Debate Status",
                  value: {
                    status: "In Progress"
                  }
                },
                fullUpdate: {
                  summary: "Full Debate Update",
                  value: {
                    motion: "This House Believes That Social Media Does More Harm Than Good",
                    category: "Social Issues",
                    status: "In Progress",
                    date: "2026-04-20",
                    rounds: 5,
                    points: 400,
                    maxTeamSize: 4,
                    judges: "Dr. Jean Mukasa, Prof. Sarah Williams, Dr. Michael Lee"
                  }
                },
                reschedule: {
                  summary: "Reschedule Debate",
                  value: {
                    date: "2026-05-15",
                    status: "Upcoming"
                  }
                }
              }
            } 
          }
        },
        responses: {
          200: { 
            description: "Debate updated successfully", 
            content: { 
              "application/json": { 
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Debate updated successfully" },
                    debate: { $ref: "#/components/schemas/Debate" }
                  }
                }
              } 
            } 
          },
          400: {
            description: "Validation error or invalid debate ID",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          401: { 
            description: "Unauthorized - Missing or invalid token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          403: { 
            description: "Forbidden - Admin access required",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          404: { 
            description: "Debate not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
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
      delete: {
        tags: ["Debates"],
        summary: "Delete a debate (Admin only)",
        description: "Permanently delete a debate from the system. This action cannot be undone. Requires admin authentication.",
        security: [{ BearerAuth: [] }],
        parameters: [
          { 
            name: "id", 
            in: "path", 
            required: true, 
            schema: { type: "integer" },
            description: "ID of the debate to delete",
            example: 1
          }
        ],
        responses: {
          200: { 
            description: "Debate deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Debate deleted successfully" }
                  }
                }
              }
            }
          },
          400: {
            description: "Invalid debate ID",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          401: { 
            description: "Unauthorized - Missing or invalid token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          403: { 
            description: "Forbidden - Admin access required",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          404: { 
            description: "Debate not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
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
      }
    },
    "/api/videos": {
      get: {
        tags: ["Videos"],
        summary: "Get all videos with optional filtering",
        description: "Retrieve a list of all videos. Supports filtering by status, category, and search query. No authentication required.",
        parameters: [
          {
            name: "status",
            in: "query",
            schema: { type: "string", enum: ["published", "draft"] },
            description: "Filter by video status (published or draft)",
            example: "published"
          },
          {
            name: "category",
            in: "query",
            schema: { type: "string" },
            description: "Filter by video category (e.g., Communication Skills, Debate Skills)",
            example: "Communication Skills"
          },
          {
            name: "search",
            in: "query",
            schema: { type: "string" },
            description: "Search in video title and description",
            example: "public speaking"
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
                },
                examples: {
                  videosList: {
                    summary: "Sample Videos List",
                    value: {
                      message: "Videos retrieved successfully",
                      count: 3,
                      videos: [
                        {
                          id: 1,
                          title: "Introduction to Public Speaking",
                          description: "Learn the fundamentals of effective public speaking and presentation skills",
                          url: "https://youtube.com/watch?v=abc123",
                          category: "Communication Skills",
                          duration: "15:30",
                          status: "published",
                          thumbnail: "https://img.youtube.com/vi/abc123/maxresdefault.jpg",
                          createdAt: "2026-03-01T10:00:00Z",
                          updatedAt: "2026-03-01T10:00:00Z"
                        },
                        {
                          id: 2,
                          title: "Advanced Debate Techniques",
                          description: "Master advanced debate strategies including rebuttal techniques",
                          url: "https://vimeo.com/123456789",
                          category: "Debate Skills",
                          duration: "22:45",
                          status: "published",
                          thumbnail: "https://i.vimeocdn.com/video/123456789_640.jpg",
                          createdAt: "2026-03-02T14:30:00Z",
                          updatedAt: "2026-03-02T14:30:00Z"
                        }
                      ]
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
        description: "Add a new video to the platform. Supports YouTube, Vimeo, and direct video links. Requires admin authentication.",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VideoRequest" },
              examples: {
                youtubeVideo: {
                  summary: "YouTube Video Example",
                  value: {
                    title: "Introduction to Public Speaking",
                    description: "Learn the fundamentals of effective public speaking and presentation skills. This comprehensive guide covers body language, voice modulation, audience engagement, and overcoming stage fright.",
                    url: "https://youtube.com/watch?v=abc123xyz",
                    category: "Communication Skills",
                    duration: "15:30",
                    status: "published",
                    thumbnail: "https://img.youtube.com/vi/abc123xyz/maxresdefault.jpg"
                  }
                },
                vimeoVideo: {
                  summary: "Vimeo Video Example",
                  value: {
                    title: "Advanced Debate Techniques",
                    description: "Master advanced debate strategies including rebuttal techniques, cross-examination skills, and persuasive argumentation. Perfect for competitive debaters.",
                    url: "https://vimeo.com/123456789",
                    category: "Debate Skills",
                    duration: "22:45",
                    status: "published",
                    thumbnail: "https://i.vimeocdn.com/video/123456789_640.jpg"
                  }
                },
                draftVideo: {
                  summary: "Draft Video Example",
                  value: {
                    title: "Research Methodology Workshop",
                    description: "Comprehensive workshop on research methodologies, data collection, and analysis techniques for academic writing.",
                    url: "https://youtube.com/watch?v=research123",
                    category: "Research Skills",
                    duration: "45:00",
                    status: "draft",
                    thumbnail: "https://example.com/thumbnails/research-workshop.jpg"
                  }
                }
              }
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
        description: "Retrieve detailed information about a specific video. No authentication required.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID of the video to retrieve",
            example: 1
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
                },
                examples: {
                  videoDetails: {
                    summary: "Video Details Example",
                    value: {
                      message: "Video retrieved successfully",
                      video: {
                        id: 1,
                        title: "Introduction to Public Speaking",
                        description: "Learn the fundamentals of effective public speaking and presentation skills. This comprehensive guide covers body language, voice modulation, audience engagement, and overcoming stage fright.",
                        url: "https://youtube.com/watch?v=abc123",
                        category: "Communication Skills",
                        duration: "15:30",
                        status: "published",
                        thumbnail: "https://img.youtube.com/vi/abc123/maxresdefault.jpg",
                        createdAt: "2026-03-01T10:00:00Z",
                        updatedAt: "2026-03-01T10:00:00Z"
                      }
                    }
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
      patch: {
        tags: ["Videos"],
        summary: "Update a video (Admin only)",
        description: "Update an existing video's details. All fields are optional - only provided fields will be updated. Requires admin authentication.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID of the video to update",
            example: 1
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { 
                    type: "string", 
                    example: "Updated Video Title",
                    description: "Updated title"
                  },
                  description: { 
                    type: "string", 
                    example: "Updated video description with more details",
                    description: "Updated description"
                  },
                  url: { 
                    type: "string", 
                    example: "https://youtube.com/watch?v=updated",
                    description: "Updated video URL"
                  },
                  category: { 
                    type: "string", 
                    example: "Leadership",
                    description: "Updated category"
                  },
                  duration: { 
                    type: "string", 
                    example: "20:45",
                    description: "Updated duration"
                  },
                  status: { 
                    type: "string", 
                    enum: ["published", "draft"], 
                    example: "published",
                    description: "Updated status"
                  },
                  thumbnail: { 
                    type: "string", 
                    example: "https://example.com/new-thumbnail.jpg",
                    description: "Updated thumbnail URL"
                  }
                }
              },
              examples: {
                publishVideo: {
                  summary: "Publish Draft Video",
                  value: {
                    status: "published"
                  }
                },
                updateDetails: {
                  summary: "Update Video Details",
                  value: {
                    title: "Mastering Public Speaking - Complete Guide",
                    description: "Comprehensive guide to public speaking with advanced techniques and real-world examples",
                    category: "Communication Skills",
                    status: "published"
                  }
                },
                fullUpdate: {
                  summary: "Full Video Update",
                  value: {
                    title: "Advanced Debate Strategies 2026",
                    description: "Learn cutting-edge debate techniques used by championship teams worldwide",
                    url: "https://youtube.com/watch?v=newvideo123",
                    category: "Debate Skills",
                    duration: "25:15",
                    status: "published",
                    thumbnail: "https://img.youtube.com/vi/newvideo123/maxresdefault.jpg"
                  }
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
          400: { 
            description: "Validation error or invalid video ID",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          401: { 
            description: "Unauthorized - Missing or invalid token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          403: { 
            description: "Forbidden - Admin access required",
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
      delete: {
        tags: ["Videos"],
        summary: "Delete a video (Admin only)",
        description: "Permanently delete a video from the system. This action cannot be undone. Requires admin authentication.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID of the video to delete",
            example: 1
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
          400: { 
            description: "Invalid video ID",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          401: { 
            description: "Unauthorized - Missing or invalid token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          403: { 
            description: "Forbidden - Admin access required",
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
          500: { 
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/api/pdfs": {
      get: {
        tags: ["PDFs"],
        summary: "Get all PDFs with optional filtering",
        description: "Retrieve a list of all PDF documents. Supports filtering by status, category, and search query. No authentication required.",
        parameters: [
          {
            name: "status",
            in: "query",
            schema: { type: "string", enum: ["published", "draft"] },
            description: "Filter by PDF status (published or draft)",
            example: "published"
          },
          {
            name: "category",
            in: "query",
            schema: { type: "string" },
            description: "Filter by PDF category (e.g., Legal Studies, Grammar, Research)",
            example: "Legal Studies"
          },
          {
            name: "search",
            in: "query",
            schema: { type: "string" },
            description: "Search in PDF title and description",
            example: "vocabulary"
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
                },
                examples: {
                  pdfsList: {
                    summary: "Sample PDFs List",
                    value: {
                      message: "PDFs retrieved successfully",
                      count: 3,
                      pdfs: [
                        {
                          id: 1,
                          title: "Legal Vocabulary Guide",
                          description: "Comprehensive guide to legal terminology and vocabulary for law students",
                          category: "Legal Studies",
                          fileName: "legal-vocabulary-guide.pdf",
                          fileSize: "2.4 MB",
                          filePath: "/uploads/pdfs/legal-vocabulary-guide.pdf",
                          status: "published",
                          createdAt: "2026-03-01T10:00:00Z",
                          updatedAt: "2026-03-01T10:00:00Z"
                        },
                        {
                          id: 2,
                          title: "Advanced English Grammar Workbook",
                          description: "Complete workbook for mastering advanced English grammar concepts",
                          category: "Grammar",
                          fileName: "advanced-grammar-workbook.pdf",
                          fileSize: "5.8 MB",
                          filePath: "/uploads/pdfs/advanced-grammar-workbook.pdf",
                          status: "published",
                          createdAt: "2026-03-02T14:30:00Z",
                          updatedAt: "2026-03-02T14:30:00Z"
                        }
                      ]
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
        description: "Add a new PDF document to the learning hub. Requires admin authentication. PDF files should be uploaded separately and then referenced here.",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PDFRequest" },
              examples: {
                legalVocabulary: {
                  summary: "Legal Studies PDF",
                  value: {
                    title: "Legal Vocabulary Guide",
                    description: "Comprehensive guide to legal terminology and vocabulary for law students. Includes definitions, usage examples, and practice exercises covering contract law, criminal law, and civil procedure.",
                    category: "Legal Studies",
                    fileName: "legal-vocabulary-guide.pdf",
                    fileSize: "2.4 MB",
                    filePath: "/uploads/pdfs/legal-vocabulary-guide.pdf",
                    status: "published"
                  }
                },
                grammarWorkbook: {
                  summary: "Grammar Workbook",
                  value: {
                    title: "Advanced English Grammar Workbook",
                    description: "Complete workbook for mastering advanced English grammar concepts. Features 200+ exercises covering complex sentence structures, conditional clauses, subjunctive mood, and more.",
                    category: "Grammar",
                    fileName: "advanced-grammar-workbook.pdf",
                    fileSize: "5.8 MB",
                    filePath: "/uploads/pdfs/advanced-grammar-workbook.pdf",
                    status: "published"
                  }
                },
                researchGuide: {
                  summary: "Research Guide (Draft)",
                  value: {
                    title: "Academic Research Methods Guide",
                    description: "Step-by-step guide to conducting academic research, including literature review techniques, data collection methods, and citation practices.",
                    category: "Research",
                    fileName: "research-methods-guide.pdf",
                    fileSize: "3.1 MB",
                    filePath: "/uploads/pdfs/research-methods-guide.pdf",
                    status: "draft"
                  }
                }
              }
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
        description: "Retrieve detailed information about a specific PDF document. No authentication required.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID of the PDF to retrieve",
            example: 1
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
                },
                examples: {
                  pdfDetails: {
                    summary: "PDF Details Example",
                    value: {
                      message: "PDF retrieved successfully",
                      pdf: {
                        id: 1,
                        title: "Legal Vocabulary Guide",
                        description: "Comprehensive guide to legal terminology and vocabulary for law students. Includes definitions, usage examples, and practice exercises covering contract law, criminal law, and civil procedure.",
                        category: "Legal Studies",
                        fileName: "legal-vocabulary-guide.pdf",
                        fileSize: "2.4 MB",
                        filePath: "/uploads/pdfs/legal-vocabulary-guide.pdf",
                        status: "published",
                        createdAt: "2026-03-01T10:00:00Z",
                        updatedAt: "2026-03-01T10:00:00Z"
                      }
                    }
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
      patch: {
        tags: ["PDFs"],
        summary: "Update a PDF (Admin only)",
        description: "Update an existing PDF document's metadata. All fields are optional - only provided fields will be updated. Requires admin authentication.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID of the PDF to update",
            example: 1
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { 
                    type: "string", 
                    example: "Updated PDF Title",
                    description: "Updated title"
                  },
                  description: { 
                    type: "string", 
                    example: "Updated PDF description with more comprehensive details",
                    description: "Updated description"
                  },
                  category: { 
                    type: "string", 
                    example: "Grammar",
                    description: "Updated category"
                  },
                  fileName: { 
                    type: "string", 
                    example: "updated-document.pdf",
                    description: "Updated file name (must end with .pdf)"
                  },
                  fileSize: { 
                    type: "string", 
                    example: "3.2 MB",
                    description: "Updated file size"
                  },
                  filePath: { 
                    type: "string", 
                    example: "/uploads/pdfs/updated-document.pdf",
                    description: "Updated file path"
                  },
                  status: { 
                    type: "string", 
                    enum: ["published", "draft"], 
                    example: "published",
                    description: "Updated status"
                  }
                }
              },
              examples: {
                publishPDF: {
                  summary: "Publish Draft PDF",
                  value: {
                    status: "published"
                  }
                },
                updateMetadata: {
                  summary: "Update PDF Metadata",
                  value: {
                    title: "Legal Vocabulary Guide - 2026 Edition",
                    description: "Comprehensive guide to legal terminology and vocabulary for law students. Updated with 2026 legal terms and modern usage examples.",
                    category: "Legal Studies",
                    status: "published"
                  }
                },
                fullUpdate: {
                  summary: "Full PDF Update",
                  value: {
                    title: "Advanced Grammar Workbook - Complete Edition",
                    description: "Complete workbook for mastering advanced English grammar concepts. Features 300+ exercises covering complex sentence structures, conditional clauses, subjunctive mood, and more.",
                    category: "Grammar",
                    fileName: "advanced-grammar-complete-2026.pdf",
                    fileSize: "6.5 MB",
                    filePath: "/uploads/pdfs/advanced-grammar-complete-2026.pdf",
                    status: "published"
                  }
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
          400: { 
            description: "Validation error or invalid PDF ID",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          401: { 
            description: "Unauthorized - Missing or invalid token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          403: { 
            description: "Forbidden - Admin access required",
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
      delete: {
        tags: ["PDFs"],
        summary: "Delete a PDF (Admin only)",
        description: "Permanently delete a PDF document from the system. This action cannot be undone. Requires admin authentication.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID of the PDF to delete",
            example: 1
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
          400: { 
            description: "Invalid PDF ID",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          401: { 
            description: "Unauthorized - Missing or invalid token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          403: { 
            description: "Forbidden - Admin access required",
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
          500: { 
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/api/pdfs/{id}/download": {
      get: {
        tags: ["PDFs"],
        summary: "Download a PDF file",
        description: "Get download information for a specific PDF document. Returns metadata including download URL. No authentication required.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID of the PDF to download",
            example: 1
          }
        ],
        responses: {
          200: {
            description: "PDF download information retrieved successfully",
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
                        title: { type: "string", example: "Legal Vocabulary Guide" },
                        fileName: { type: "string", example: "legal-vocabulary-guide.pdf" },
                        fileSize: { type: "string", example: "2.4 MB" },
                        filePath: { type: "string", example: "/uploads/pdfs/legal-vocabulary-guide.pdf" },
                        downloadUrl: { type: "string", example: "/api/pdfs/1/download" }
                      }
                    }
                  }
                },
                examples: {
                  downloadInfo: {
                    summary: "Download Information Example",
                    value: {
                      message: "PDF download information",
                      pdf: {
                        id: 1,
                        title: "Legal Vocabulary Guide",
                        fileName: "legal-vocabulary-guide.pdf",
                        fileSize: "2.4 MB",
                        filePath: "/uploads/pdfs/legal-vocabulary-guide.pdf",
                        downloadUrl: "/api/pdfs/1/download"
                      }
                    }
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
          500: { 
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    }
  };
}

module.exports = {
  createSwaggerSpec,
};