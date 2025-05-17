import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_GPgtY8DSjZ9c@ep-rapid-brook-a5j3z6s5-pooler.us-east-2.aws.neon.tech/Ai-elearning?sslmode=require'
  }
});
