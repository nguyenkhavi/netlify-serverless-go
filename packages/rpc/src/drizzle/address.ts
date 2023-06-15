import { mysqlTable, varchar, datetime, boolean } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const addressTable = mysqlTable('address', {
  id: varchar('id', { length: 12 }).primaryKey(),
  userId: varchar('user_id', { length: 32 }),
  createdAt: datetime('created_at').default(sql`NOW()`),
  updatedAt: datetime('updated_at'),

  country: varchar('country', { length: 64 }),
  state: varchar('state', { length: 64 }),
  street: varchar('street', { length: 64 }),
  secondStreet: varchar('second_street', { length: 64 }),
  apartmentNumber: varchar('apartment_number', { length: 10 }),
  postalCode: varchar('postal_code', { length: 10 }),
  contactNumber: varchar('contact_number', { length: 20 }),
  isDefault: boolean('is_default'),
});
