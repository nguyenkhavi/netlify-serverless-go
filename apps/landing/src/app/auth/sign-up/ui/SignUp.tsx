'use client';
//THIRD PARTY MODULES
import * as z from 'zod';
import dayjs from 'dayjs';
import Link from 'next/link';
import classcat from 'classcat';
import { useMemo, useState } from 'react';
import { Gender } from '_@rpc/drizzle/enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import errorHandler from '_@landing/app/auth/utils/errorHandler';
import { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import FormSelect from '_@shared/components/FormSelect';
import { BaseSelectOption } from '_@shared/components/BaseSelect';
import FormRadioGroup from '_@shared/components/radio/FormRadioGroup';
import FormCheckboxArray from '_@shared/components/checkbox/FormCheckboxArray';
import FormPhoneInput from '_@shared/components/input/phone-input/FormPhoneInput';
//SHARED
import BgLeftAuth from '_@shared/icons/BgLeftAuth';
import BgRightAuth from '_@shared/icons/BgRightAuth';
import LogoWhiteIcon from '_@shared/icons/LogoWhiteIcon';
import { Country, countryMapping } from '_@shared/constant/countries';
//HOOK
import { phoneNumberSchema } from '_@landing/server/auth/auth.schema';

const valuesSchema = z.object({
  firstName: z.string().trim().nonempty({ message: 'This field is required' }),
  lastName: z.string().trim().nonempty({ message: 'This field is required' }),
  username: z.string().trim().nonempty({ message: 'This field is required' }),
  email: z
    .string()
    .trim()
    .nonempty({ message: 'This field is required' })
    .email({ message: 'Invalid Email' }),
  phone: z.object({
    digitalCode: z.string().nonempty({ message: 'This field is required' }),
    phoneNumber: phoneNumberSchema,
  }),
  gender: z.enum([Gender.FEMALE, Gender.MALE, Gender.OTHER]),
  birthday: z
    .object({
      day: z.string(),
      month: z.string(),
      year: z.string(),
    })
    .refine(
      (data) => {
        const { day, month, year } = data;
        const currentDateMinus18Years = dayjs()
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .subtract(18, 'year');
        const selectedDate = dayjs(`${year}-${month}-${day}`)
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0);
        return currentDateMinus18Years.diff(selectedDate) > 0;
      },
      {
        message: 'You must be at least 18 years old',
      },
    ),
  // check === true => agree
  rule: z.boolean().refine((check) => check, { message: 'This field is required' }),
});

type Values = z.infer<typeof valuesSchema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuthStoreAction();
  const methods = useForm<Values>({
    resolver: zodResolver(valuesSchema),
    defaultValues: {
      birthday: {
        day: dayjs().date().toString(),
        month: (dayjs().month() + 1).toString(),
        year: dayjs().year().toString(),
      },
      phone: {
        digitalCode: 'GB',
        phoneNumber: '',
      },
      gender: Gender.MALE,
    },
  });
  const { handleSubmit, watch, setError, setValue } = methods;
  const { executeRecaptcha } = useGoogleReCaptcha();

  const month = watch('birthday.month');
  const year = watch('birthday.year');
  const { dayOptions, monthOptions, yearOptions } = useMemo(() => {
    setValue('birthday.day', '1');
    return getDateMockupForSelect(Number(month), Number(year));
  }, [month, year, setValue]);

  const onSubmit = handleSubmit(async (_data) => {
    try {
      const data = valuesSchema.parse(_data);
      setIsLoading(true);
      const token = await executeRecaptcha?.('sign_up');
      if (!token) return;
      const digitalCode = data.phone.digitalCode as Country['code'];
      const digital = countryMapping[digitalCode];
      await signUp({
        email: data.email.toLowerCase(),
        dob: new Date(
          `${data.birthday.year}-${data.birthday.month}-${data.birthday.day}`,
        ).toISOString(),
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        phone: {
          phoneCode: digital.dialCode,
          phoneNumber: data.phone.phoneNumber,
        },
        gender: data.gender as any,
        reCaptchaToken: token,
      });
    } catch (err: any) {
      errorHandler(err, setError);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <section className="grid gap-6 py-20 md:gap-20 md:py-40">
      <div className="absolute top-0 flex w-screen justify-between">
        <BgLeftAuth />
        <BgRightAuth />
      </div>

      <LogoWhiteIcon className="mx-auto" />
      <div className="w-screen px-[--px] md:mx-auto md:max-w-[theme(space.135)] md:px-0">
        <div
          className={classcat(['rounded-[10px] bg-secondary-200 md:w-full', 'grid gap-8', 'p-4'])}
        >
          <h5 className="text-center text-h4 text-primary-700">Sign Up</h5>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-10">
                <div className="grid gap-5">
                  <FormItem label="First Name" name="firstName">
                    <FormInput placeholder="First name" className="input-md" />
                  </FormItem>

                  <FormItem label="Last Name" name="lastName">
                    <FormInput placeholder="Last name" className="input-md" />
                  </FormItem>

                  <FormItem label="Username" name="username">
                    <FormInput placeholder="Username" className="input-md" />
                  </FormItem>

                  <FormItem label="Email" name="email">
                    <FormInput placeholder="Email" className="input-md" />
                  </FormItem>

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

                  <FormItem label="Birthday" name="birthday">
                    <div className="flex space-x-3">
                      <FormSelect
                        owStyles={{
                          triggerClasses: 'input-md',
                        }}
                        options={monthOptions}
                        name="birthday.month"
                        placeholder="Month"
                      />
                      <FormSelect
                        owStyles={{
                          triggerClasses: 'input-md',
                        }}
                        options={dayOptions}
                        name="birthday.day"
                        placeholder="Day"
                      />
                      <FormSelect
                        owStyles={{
                          triggerClasses: 'input-md',
                        }}
                        options={yearOptions}
                        name="birthday.year"
                        placeholder="Year"
                      />
                    </div>
                  </FormItem>

                  <FormItem label="Gender" name="gender">
                    <FormRadioGroup
                      className="gap-4"
                      options={[
                        { label: 'Male', value: Gender.MALE },
                        { label: 'Female', value: Gender.FEMALE },
                        { label: 'Other', value: Gender.OTHER },
                      ]}
                    />
                  </FormItem>
                </div>
                <FormItem label="" name="rule">
                  <FormCheckboxArray
                    name="rule"
                    label={
                      <p className="text-body3">
                        Yes, I agree to all Fleamint{' '}
                        <a href="#" className="btn-link text-[#19CA9B]">
                          Terms and Policy
                        </a>
                      </p>
                    }
                  />
                </FormItem>

                <Button isLoading={isLoading} type="submit" className="btnxlg mx-auto">
                  Get Started
                </Button>

                <p className="flex items-center justify-center space-x-1">
                  <span className="text-body3 text-text-80 md:text-body1">Already a member?</span>
                  <Link
                    prefetch={false}
                    href="/auth/sign-in"
                    className="btn-link text-body2 text-primary ow:w-fit"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}

const getDateMockupForSelect = (
  month: number,
  year: number,
): {
  dayOptions: BaseSelectOption[];
  monthOptions: BaseSelectOption[];
  yearOptions: BaseSelectOption[];
} => {
  const dayOptions = [];
  const monthOptions = [];
  const yearOptions = [];
  const daysInMonth = dayjs(`${year}-${month}`, 'YYYY-MM').daysInMonth();
  for (let i = 1; i <= daysInMonth; i++) {
    dayOptions.push({ label: i.toString(), value: i.toString() });
  }
  for (let i = 1; i <= 12; i++) {
    monthOptions.push({ label: i.toString(), value: i.toString() });
  }
  for (let i = 1900; i <= dayjs().year(); i++) {
    yearOptions.push({ label: i.toString(), value: i.toString() });
  }
  return { dayOptions, monthOptions, yearOptions };
};
