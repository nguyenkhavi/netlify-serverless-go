import type { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts',
  out: './src/migration',
  connectionString: process.env.DATABASE_URL,
  // 'mysql://e7no2ylusejh8phgi982:pscale_pw_B6oO5llxfCdiITmej0SqLcFyMmRgjnFZOz1kK1A0bw@aws.connect.psdb.cloud/test-fleamint?ssl={"rejectUnauthorized":false}',
} satisfies Config;
