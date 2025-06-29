import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers.ts';

export const invoicesTable = pgTable('Invoices', {
    id: uuid().defaultRandom().primaryKey(),
    customerId: uuid().notNull(),
    orderId: uuid().notNull(),
    ...timestamps
}) 