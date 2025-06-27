import { numeric, pgTable, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers.ts';

export const ordersTable = pgTable('Orders', {
    id: uuid().defaultRandom().primaryKey(),
    customerId: uuid().notNull(),
    amount: numeric({ mode: 'number' }),
    ...timestamps
}) 