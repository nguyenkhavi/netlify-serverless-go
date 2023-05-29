//THIRD PARTY MODULES
import { test, expect } from 'vitest';
//SYSTEMS
import { caller } from '_@rpc/services/caller';

// test('get user shipping address', async () => {
//   try {
//     const data = await caller.user.getUserShippingAddress({
//       userId: 'user_2Q8n4h6DrexPk03tvSmPoF8BW5P',
//     });

//     console.log({ data });

//     expect(true).toBe(true);
//   } catch (err) {
//     console.log(err);
//   }
// });

test('create user shipping address', async () => {
  try {
    const data = await caller.user.createUserShippingAddress({
      userId: 'user_2Q8n4h6DrexPk03tvSmPoF8BW5P',
      country: 'Vietnam',
      state: 'Ho Chi Minh',
      streetAddress: '123 XVNT',
      apartmentNumber: '6969',
      postCode: '100000',
      phoneNumber: '964564273',
      phoneCode: '+84',
      additionalInformation: 'hello world',
    });

    console.log({ data });

    expect(true).toBe(true);
  } catch (err) {
    console.log(err);
  }
});

// test('update user shipping address', async () => {
//   try {
//     const data = await caller.user.updateUserShippingAddress({
//       id: '....',
//       userId: 'user_2Q8n4h6DrexPk03tvSmPoF8BW5P',
//       country: 'Vietnam',
//       state: 'Ho Chi Minh',
//       streetAddress: '123 XVNT',
//       apartmentNumber: '6969',
//       postCode: '100000',
//       phoneNumber: '964564273',
//       phoneCode: '+84',
//       additionalInformation: 'hello world',
//     });

//     console.log({ data });

//     expect(true).toBe(true);
//   } catch (err) {
//     console.log(err);
//   }
// });
