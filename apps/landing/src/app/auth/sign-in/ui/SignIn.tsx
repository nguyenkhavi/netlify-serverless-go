'use client';
//THIRD PARTY MODULES
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuthStoreAction } from '_@landing/stores/useAuthStore';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormPhoneInput from '_@shared/components/input/phone-input/FormPhoneInput';
//SHARED
import LogoWhiteIcon from '_@shared/icons/LogoWhiteIcon';
import { Country, countryMapping } from '_@shared/constant/countries';

const values = z.object({
  phone: z.object({
    digitalCode: z.string().min(1).max(3),
    phoneNumber: z.string().min(0).max(10, { message: 'Phone number must be 10 digits' }),
  }),
});

type Values = z.infer<typeof values>;

export default function SignIn() {
  const { loginWithSMS, logout } = useAuthStoreAction();
  const methods = useForm<Values>({
    resolver: zodResolver(values),
    defaultValues: {
      phone: {
        digitalCode: 'VN',
        phoneNumber: '834493868',
      },
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const digitalCode = data.phone.digitalCode as Country['code'];
    const digital = countryMapping[digitalCode];
    await loginWithSMS(`+${digital.dialCode}${data.phone.phoneNumber}`);
  });

  return (
    <section className="mb-17 mt-12.5">
      <div className="mb-8.75 mt-12.5">
        <LogoWhiteIcon className="mx-auto" />
      </div>
      <div className="mx-[--px] md:mx-auto md:max-w-[theme(space.135)]">
        <div className="rounded-[10px] bg-secondary-200 px-3 py-9 md:px-8.25 md:pb-7 md:pt-8.5 ">
          <h5 className="text-center text-h5 text-primary-700 md:text-h4">Sign In</h5>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="mt-8.5 md:mt-10">
              <div className="grid gap-4">
                <FormItem label="Email/username" name="">
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
              </div>
              <div className="mt-1 text-end md:mt-2">
                <a href="#" className="btn-link text-primary">
                  Forget Password?
                </a>
              </div>
              <Button type="submit" className="btnlg mx-auto mt-6 ow:w-62 md:ow:w-full">
                Sign in
              </Button>

              <p className="mt-11 flex items-center justify-center space-x-1">
                <span className="text-body1 text-text-80">Don't have an account?</span>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="btn-link text-primary ow:w-fit"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
