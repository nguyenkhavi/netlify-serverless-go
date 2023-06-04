import { sql } from 'drizzle-orm';
import { datetime, mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core';
// import { securityQuestion } from './securityQuestion';

export const userAnswer = mysqlTable(
  'user_answer',
  {
    id: varchar('id', { length: 12 }),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),

    userId: varchar('user_id', { length: 32 }),
    memorableAnswer: varchar('memorable_answer', { length: 256 }),
    //Reference to security_question table
    questionId: varchar('question_id', { length: 12 }), //.references(() => securityQuestion.id),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.questionId),
  }),
);
