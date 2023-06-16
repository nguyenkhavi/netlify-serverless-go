// 'use client';
// //THIRD PARTY MODULES
// import { useState } from 'react';
// import { api } from '_@landing/utils/api';
// import { useRouter } from 'next/navigation';
// import { EGender } from '_@rpc/routers/clerk/clerk.validators';
// import { useContract, useValidDirectListings } from '@thirdweb-dev/react';
// import { useClerk, useSession, useSignIn, useSignUp } from '@clerk/nextjs';
// //LAYOUT, COMPONENTS
// import { ConnectWalletButton } from '_@landing/components/provider/ConnectWalletButton';
// //SHARED
// import { useSocketStore } from '_@shared/stores/socket/useSocketStore';
// //RELATIVE MODULES
// import { useIndexedDBContext } from '../provider/IndexedDBProvider';

// const SignInPage = () => {
//   const { push } = useRouter();
//   const { signOut } = useClerk();
//   const { signUp } = useSignUp();
//   const { socket } = useSocketStore((state) => state);
//   const [code, setCode] = useState('');
//   const { isLoaded, signIn, setActive } = useSignIn();
//   const { session } = useSession();
//   // const { mutate: logout } = api.logout.mutate();
//   const { db } = useIndexedDBContext();

//   const contractAddress = '0x0a7D39504176eE6de53a6e320fb47c5D44f3666A';
//   const { contract } = useContract(contractAddress, 'marketplace-v3');

//   const { data: directListings } = useValidDirectListings(contract, {
//     count: 100, // Number of listings to fetch
//     // offeror: '{{offeror_address}}', // Has offers from this address
//     // seller: '{{seller_address}}', // Being sold by this address
//     start: 0, // Start from this index (pagination)
//     // tokenContract: '{{token_contract_address}}', // Only show NFTs from this collection
//     // tokenId: '{{token_id}}', // Only show NFTs with this token ID
//   });

//   console.log({ directListings });

//   async function handleSignIn() {
//     signIn
//       ?.create({
//         identifier: 'minh1@mailinator.com',
//         password: 'NkviDev@1233',
//       })
//       .then((result) => {
//         if (result.status === 'complete') {
//           setActive({ session: result.createdSessionId });
//         }
//         console.log(result);
//       })
//       .catch((err) => console.error('error', err.errors[0].longMessage));
//   }

//   async function handleSignUp() {
//     console.log({ signUp });
//     if (signUp) {
//       await signUp.create({
//         unsafeMetadata: {
//           dob: new Date().toISOString(),
//           gender: EGender.FEMALE,
//         },
//         birthday: new Date().toISOString(),
//         gender: 'male',
//         username: 'minh2mai',
//         password: 'NkviDev@1233',
//         emailAddress: 'minh2@mailinator.com',
//         firstName: 'KhaVi',
//         lastName: 'Nguyen',
//       });
//       await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
//     }
//   }

//   const onPressVerify = async (e: any) => {
//     e.preventDefault();
//     if (!isLoaded) {
//       return;
//     }

//     if (signUp) {
//       try {
//         const completeSignUp = await signUp.attemptEmailAddressVerification({
//           code,
//         });
//         if (completeSignUp.status !== 'complete') {
//           /*  investigate the response, to see if there was an error
//            or if the user needs to complete more steps.*/
//           console.log(JSON.stringify(completeSignUp, null, 2));
//         }
//         if (completeSignUp.status === 'complete') {
//           await setActive({ session: completeSignUp.createdSessionId });
//         }
//       } catch (err: any) {
//         console.error(JSON.stringify(err, null, 2));
//       }
//     }
//   };

//   return (
//     // <SignIn  path="/sign-in" routing="path" signUpUrl="/sign-up" />
//     <>
//       <button
//         onClick={() => {
//           if (!session || !socket) return;
//           signOut();
//           push('/');
//           // api.logout.mutate({ currentSessionId: session?.id, userId: session?.user.id, socketId: socket?.id });
//           api.logout.mutate();
//         }}
//       >
//         Sign out
//       </button>
//       <br />
//       <button onClick={() => handleSignUp()}>Sign up</button>
//       <br />
//       <input value={code} onChange={({ target }) => setCode(target.value)} placeholder="Code" />
//       <button onClick={onPressVerify}>Verify</button>
//       <br />
//       <button onClick={() => handleSignIn()}>Sign In</button>
//       <ConnectWalletButton />
//     </>
//   );
// };

// export default SignInPage;

export default function Page() {}
