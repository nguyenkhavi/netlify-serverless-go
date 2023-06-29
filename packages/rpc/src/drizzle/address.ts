import { mysqlTable, varchar, datetime, boolean, serial, text } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const addressTable = mysqlTable('address', {
  id: serial('id').primaryKey().notNull(),
  userId: varchar('user_id', { length: 52 }).notNull(),
  country: varchar('country', { length: 64 }).notNull(),
  state: varchar('state', { length: 64 }).notNull(),
  street: varchar('street', { length: 64 }).notNull(),
  secondStreet: varchar('second_street', { length: 64 }).notNull(),
  apartmentNumber: text('apartment_number').notNull(),
  postalCode: varchar('postal_code', { length: 10 }).notNull(),
  contactNumber: varchar('contact_number', { length: 20 }).notNull(),
  dialCode: varchar('dial_code', { length: 10 }).notNull(),
  isDefault: boolean('is_default').notNull(),
  additionalInformation: varchar('additional_information', { length: 128 }),

  createdAt: datetime('created_at').default(sql`NOW()`),
  updatedAt: datetime('updated_at'),
});
