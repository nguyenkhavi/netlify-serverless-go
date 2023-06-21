'use client';
//THIRD PARTY MODULES
import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import errorHandler from '_@landing/app/auth/utils/errorHandler';
import { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormPhoneInput from '_@shared/components/input/phone-input/FormPhoneInput';
//SHARED
import BgLeftAuth from '_@shared/icons/BgLeftAuth';
import BgRightAuth from '_@shared/icons/BgRightAuth';
import LogoWhiteIcon from '_@shared/icons/LogoWhiteIcon';
import { Country, countryMapping } from '_@shared/constant/countries';
//HOOK
import { phoneNumberSchema } from '_@landing/server/auth/auth.schema';

const values = z.object({
  phone: z.object({
    digitalCode: z.string(),
    phoneNumber: phoneNumberSchema,
  }),
});

type Values = z.infer<typeof values>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithSMS } = useAuthStoreAction();
  const methods = useForm<Values>({
    resolver: zodResolver(values),
    defaultValues: {
      phone: {
        digitalCode: 'GB',
        phoneNumber: '',
      },
    },
  });
  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const digitalCode = data.phone.digitalCode as Country['code'];
      const digital = countryMapping[digitalCode];
      setIsLoading(true);
      await loginWithSMS({
        phone: {
          phoneCode: digital.dialCode,
          phoneNumber: data.phone.phoneNumber,
        },
      });
    } catch (err: any) {
      if (err.message === 'BAD_REQUEST') {
        setError('phone.phoneNumber', {
          message: 'Invalid phone number',
          type: 'manual',
        });
      } else {
        errorHandler(err, setError);
      }
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <section className="my-20 grid gap-6 md:my-40 md:gap-20">
      <div className="absolute top-0 hidden w-screen justify-between md:flex">
        <BgLeftAuth />
        <BgRightAuth />
      </div>
      <LogoWhiteIcon className="mx-auto" />
      <div className="mx-[--px]  md:mx-auto md:w-full md:max-w-[theme(space.135)]">
        <div className="flex h-96 flex-col space-y-8 rounded-lg bg-secondary-200 p-4 md:h-100 md:p-6">
          <h5 className="text-center text-h5 text-primary-700 md:text-h4">Sign In</h5>
          <FormProvider {...methods}>
            <form className="flex grow flex-col space-y-10" onSubmit={onSubmit}>
              <div className="flex grow flex-col">
                <div className="grow">
                  <FormItem label="Phone Number" name="phone.phoneNumber">
                    <>
                      <FormPhoneInput
                        name={{
                          digitalCode: 'phone.digitalCode',
                          phoneNumber: 'phone.phoneNumber',
                        }}
                      />
                    </>
                  </FormItem>
                </div>

                <Button isLoading={isLoading} type="submit" className="btnxlg mx-auto ow:w-full">
                  Get Started
                </Button>
              </div>

              <p className="flex items-center justify-center space-x-1">
                <span className="text-body3 text-text-80">Don't have an account?</span>
                <Link href="/auth/sign-up" className="btn-link text-body2 text-primary ow:w-fit">
                  Sign Up
                </Link>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
