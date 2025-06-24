import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/env.ts";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/database/schemas/*.ts",

  // driver: "pglite",
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "migrations",
    schema: "public",
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});
