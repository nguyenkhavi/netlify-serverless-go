import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

const SSOCallback = (props: any) => {
  console.log({ props })
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom OAuth flow
  return <AuthenticateWithRedirectCallback />
}

export default SSOCallback
