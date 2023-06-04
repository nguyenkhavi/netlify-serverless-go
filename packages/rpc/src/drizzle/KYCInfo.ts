import { sql } from 'drizzle-orm';
import { datetime, mysqlTable, varchar, uniqueIndex } from 'drizzle-orm/mysql-core';

export const KYCInfo = mysqlTable(
  'kyc_info',
  {
    id: varchar('id', { length: 32 }),
    personaInquiryId: varchar('persona_inquiry_id', { length: 32 }),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),
    completedAt: datetime('completed_at'),
    birthDate: datetime('birth_date'),

    firstName: varchar('first_name', { length: 32 }),
    lastName: varchar('last_name', { length: 32 }),
    street1: varchar('street_1', { length: 32 }),
    street2: varchar('street_2', { length: 32 }),
    city: varchar('city', { length: 32 }),
    postalCode: varchar('postal_code', { length: 32 }),
    identificationNumber: varchar('identification_number', { length: 32 }),
    phoneNumber: varchar('phone_number', { length: 32 }),
  },
  (table) => ({
    kycIdIdx: uniqueIndex('kyc_id_idx').on(table.id),
    kycPersonaIdIdx: uniqueIndex('kyc_persona_id_idx').on(table.personaInquiryId),
  }),
);
