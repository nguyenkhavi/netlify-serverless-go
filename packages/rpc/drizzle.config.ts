import type { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts',
  out: './src/migration',
  connectionString: process.env.DATABASE_URL,
} satisfies Config;
