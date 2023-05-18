'use client'

import { SignedIn, SignedOut, SignInButton, useSignIn, useClerk, useSignUp } from '@clerk/nextjs'
import { OAuthStrategy } from '@clerk/nextjs/dist/server'

const SignInPage = () => {
  const { signOut } = useClerk()
  const { signUp } = useSignUp()

  const { isLoaded, signIn, setActive } = useSignIn()

  async function handleSignIn() {
    signIn
      ?.create({
        identifier: 'vominhquy1903@gmail.com',
        password: 'minhquy@gmail.com',
      })
      .then((result) => {
        if (result.status === 'complete') {
          console.log(result)
          setActive({ session: result.createdSessionId })
        } else {
          console.log(result)
        }
      })
      .catch((err) => console.error('error', err.errors[0].longMessage))
  }

  async function handleSignUp() {
    signUp?.create({
      unsafeMetadata: {
        birthday: new Date().toISOString(),
        gender: 'male',
      },
      birthday: new Date().toISOString(),
      gender: 'male',
      username: 'minhquy1903email',
      password: 'minhquy@gmail.com',
      emailAddress: 'vominhquy1903@gmail.com',
      firstName: 'Quy',
      lastName: 'Minh Quy',
    })
  }

  return (
    // <SignIn  path="/sign-in" routing="path" signUpUrl="/sign-up" />
    <>
      <button onClick={() => signOut()}>Sign out</button>
      <br />
      <button onClick={() => handleSignUp()}>Sign up</button>
      <br />
      <button onClick={() => handleSignIn()}>Sign In</button>
    </>
  )
}

export default SignInPage

function SignInOAuthButtons() {
  const { signIn } = useSignIn()

  const signInWith = (strategy: OAuthStrategy) => {
    console.log({ strategy })
    return signIn?.authenticateWithRedirect({
      continueSignUp: true,
      strategy: 'oauth_twitter',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    })
  }

  // Render a button for each supported OAuth provider
  // you want to add to your app
  return (
    <div>
      <button onClick={() => signInWith('oauth_twitter')}>Sign in with Twitter</button>
    </div>
  )
}
