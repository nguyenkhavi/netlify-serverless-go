//THIRD PARTY MODULES
import { test, expect } from 'vitest';
//SYSTEMS
import { caller } from '_@rpc/services/caller';

test('get presigned url', async () => {
  try {
    const data = await caller.aws.getPresignedUrl({ contentType: 'image/jpeg' });

    console.log({ data });

    expect(true).toBe(true);
  } catch (err) {
    console.log(err);
  }
});
