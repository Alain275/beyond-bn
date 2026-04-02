const { sequelize } = require("./src/config/database");

async function migrateArticlesToUUID() {
  try {
    console.log("Starting migration: Converting articles table ID from INTEGER to UUID...");
    
    // Check if uuid-ossp extension exists, if not create it
    await sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
    console.log("✓ UUID extension enabled");

    // Drop the existing articles table if it exists and recreate with UUID
    await sequelize.query(`
      DROP TABLE IF EXISTS "articles" CASCADE;
    `);
    console.log("✓ Dropped existing articles table");

    // Create articles table with UUID
    await sequelize.query(`
      CREATE TABLE "articles" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "title" VARCHAR(255) NOT NULL,
        "category" VARCHAR(255) NOT NULL,
        "author" VARCHAR(255) NOT NULL,
        "status" VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
        "content" TEXT NOT NULL,
        "image" VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    console.log("✓ Created articles table with UUID primary key");

    // Create indexes for better performance
    await sequelize.query(`
      CREATE INDEX idx_articles_status ON "articles"("status");
      CREATE INDEX idx_articles_category ON "articles"("category");
      CREATE INDEX idx_articles_created_at ON "articles"("createdAt" DESC);
    `);
    console.log("✓ Created indexes");

    console.log("\n✅ Migration completed successfully!");
    console.log("The articles table now uses UUID for the id field.");
    
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Run migration
migrateArticlesToUUID();
