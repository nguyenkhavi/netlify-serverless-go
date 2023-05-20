//THIRD PARTY MODULES
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function Page(props: any) {
  console.log({ props });
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom OAuth flow
  return <AuthenticateWithRedirectCallback />;
}
