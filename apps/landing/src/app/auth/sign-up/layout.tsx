'use client';
//THIRD PARTY MODULES
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function SignUp({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA || ''}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
