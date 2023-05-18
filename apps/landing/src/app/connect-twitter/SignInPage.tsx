'use client'

import {
  SignedIn,
  SignedOut,
  SignInButton,
  useSignIn,
  useClerk,
  useSignUp,
  SignUp,
} from '@clerk/nextjs'
import { OAuthStrategy } from '@clerk/nextjs/dist/server'
import { EGender } from '_@rpc/routers/clerk/clerk.validators'
import { useState } from 'react'

const SignInPage = () => {
  const { signOut } = useClerk()
  const { signUp } = useSignUp()
  const [code, setCode] = useState('')
  const { isLoaded, signIn, setActive } = useSignIn()

  async function handleSignIn() {
    signIn
      ?.create({
        identifier: 'vi.nguyen@sens-vn.com',
        password: 'Pass@1233',
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
    if (signUp) {
      await signUp.create({
        unsafeMetadata: {
          dob: new Date().toISOString(),
          gender: EGender.FEMALE,
        },
        birthday: new Date().toISOString(),
        gender: 'male',
        username: 'vidzai',
        password: 'NkviDev@1233',
        emailAddress: 'vi.nguyen@sens-vn.com',
        firstName: 'KhaVi',
        lastName: 'Nguyen',
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    }
  }
  const onPressVerify = async (e) => {
    e.preventDefault()
    if (!isLoaded) {
      return
    }

    if (signUp) {
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        })
        if (completeSignUp.status !== 'complete') {
          /*  investigate the response, to see if there was an error
           or if the user needs to complete more steps.*/
          console.log(JSON.stringify(completeSignUp, null, 2))
        }
        if (completeSignUp.status === 'complete') {
          await setActive({ session: completeSignUp.createdSessionId })
        }
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2))
      }
    }
  }

  return (
    // <SignIn  path="/sign-in" routing="path" signUpUrl="/sign-up" />
    <>
      <button onClick={() => signOut()}>Sign out</button>
      <br />
      <button onClick={() => handleSignUp()}>Sign up</button>
      <br />
      <input value={code} onChange={({ target }) => setCode(target.value)} placeholder="Code" />
      <button onClick={onPressVerify}>Verify</button>
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
