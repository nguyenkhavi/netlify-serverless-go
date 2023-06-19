'use client';
//THIRD PARTY MODULES
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormPhoneInput from '_@shared/components/input/phone-input/FormPhoneInput';
//SHARED
import BgLeftAuth from '_@shared/icons/BgLeftAuth';
import BgRightAuth from '_@shared/icons/BgRightAuth';
import LogoWhiteIcon from '_@shared/icons/LogoWhiteIcon';
import { Country, countryMapping } from '_@shared/constant/countries';

const values = z.object({
  phone: z.object({
    digitalCode: z.string(),
    phoneNumber: z.string().nonempty({ message: 'Phone number is required' }),
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
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

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
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <section className="my-20 grid gap-6 md:my-40 md:gap-20">
      <div className="absolute top-0 flex w-screen justify-between">
        <BgLeftAuth />
        <BgRightAuth />
      </div>
      <LogoWhiteIcon className="mx-auto" />
      <div className="mx-[--px] md:mx-auto md:w-full md:max-w-[theme(space.135)]">
        <div className="rounded-lg bg-secondary-200 p-4 md:p-6">
          <h5 className="text-center text-h5 text-primary-700 md:text-h4">Sign In</h5>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="mt-8">
              <div className="grid gap-16.5">
                <FormItem label="Phone Number" name="phone.phoneNumber">
                  <>
                    <FormPhoneInput
                      name={{ digitalCode: 'phone.digitalCode', phoneNumber: 'phone.phoneNumber' }}
                    />
                    <Show when={errors.phone?.digitalCode || errors.phone?.phoneNumber}>
                      <p className="mt-1 text-body2 text-error">
                        {errors.phone?.digitalCode?.message || errors.phone?.phoneNumber?.message}
                      </p>
                    </Show>
                  </>
                </FormItem>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  className="btnxlg mx-auto ow:w-62 md:ow:w-full"
                >
                  Get Started
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
