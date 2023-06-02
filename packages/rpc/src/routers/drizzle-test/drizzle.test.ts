import { subscriber } from '_@rpc/drizzle/subscriber';
import { db } from '_@rpc/services/drizzle';
import { nanoid } from '_@rpc/services/nanoid';
import { InferModel } from 'drizzle-orm';
import { expect, test } from 'vitest';

export type NewSubscriber = InferModel<typeof subscriber, 'insert'>; // insert type

async function insertSubscriber(newSubscriber: NewSubscriber) {
  return db.insert(subscriber).values(newSubscriber);
}

test('insert subscriber', async () => {
  const data = await insertSubscriber({
    id: nanoid(),
    email: 'hieu' + Math.random().toFixed(5).split('.')[1] + '@gmail.com',
  });
  console.log({ data });
});
test('get subscriber', async () => {
  console.time('get subscriber');
  const data = await db.select().from(subscriber).execute();
  console.timeEnd('get subscriber');
  console.log({ data });
  expect(data.length).toBeGreaterThanOrEqual(1);
});
