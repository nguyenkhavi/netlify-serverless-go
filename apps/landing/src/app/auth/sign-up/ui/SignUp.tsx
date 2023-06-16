'use client';
//THIRD PARTY MODULES
import * as z from 'zod';
import dayjs from 'dayjs';
import classcat from 'classcat';
import { Gender } from '_@rpc/drizzle/enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
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

const valuesSchema = z.object({
  firstName: z.string().nonempty({ message: 'First name is required' }),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
  username: z.string().nonempty({ message: 'Username is required' }),
  email: z.string().email(),
  phone: z.object({
    digitalCode: z.string().nonempty({ message: 'Phone code is required' }),
    phoneNumber: z.string().nonempty({ message: 'Phone number is required' }),
  }),
  gender: z.enum([Gender.FEMALE, Gender.MALE, Gender.OTHER]),
  birthday: z.object({
    day: z.string(),
    month: z.string(),
    year: z.string(),
  }),
  recaptcha: z.string().nonempty({ message: 'Please verify you are not a robot' }),
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
  const { handleSubmit, watch, setValue } = methods;

  const month = watch('birthday.month');
  const year = watch('birthday.year');
  const { dayOptions, monthOptions, yearOptions } = useMemo(
    () => getDateMockupForSelect(Number(month), Number(year)),
    [month, year],
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const digitalCode = data.phone.digitalCode as Country['code'];
      const digital = countryMapping[digitalCode];
      await signUp({
        email: data.email,
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
      });
    } finally {
      setIsLoading(false);
    }
  });

  const _handleVerifyReCaptcha = useCallback(
    (token: string) => {
      setValue('recaptcha', token);
    },
    [setValue],
  );

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
              <GoogleReCaptchaProvider
                reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA || ''}
              >
                <GoogleReCaptcha onVerify={_handleVerifyReCaptcha} />
              </GoogleReCaptchaProvider>

              <div className="grid gap-10">
                <div className="grid gap-5 md:gap-4">
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

                <Button isLoading={isLoading} type="submit" className="btnlg mx-auto">
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

const getDateMockupForSelect = (
  month: number,
  year: number,
): {
  dayOptions: BaseSelectOption[];
  monthOptions: BaseSelectOption[];
  yearOptions: BaseSelectOption[];
} => {
  const dayOptions: BaseSelectOption[] = [];
  const monthOptions: BaseSelectOption[] = [];
  const yearOptions: BaseSelectOption[] = [];
  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1;
  const currentDay = dayjs().date();

  for (let i = currentYear; i >= 1900; i--) {
    yearOptions.push({ value: i.toString(), label: i.toString() });
  }

  if (year === currentYear) {
    for (let i = 1; i <= currentMonth; i++) {
      monthOptions.push({ value: i.toString(), label: i.toString() });
    }
  } else {
    for (let i = 1; i <= 12; i++) {
      monthOptions.push({ value: i.toString(), label: i.toString() });
    }
  }

  if (year === currentYear && month === currentMonth) {
    for (let i = 1; i <= currentDay; i++) {
      dayOptions.push({ value: i.toString(), label: i.toString() });
    }
  } else {
    const daysInMonth = dayjs(`${year}-${month}`).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      dayOptions.push({ value: i.toString(), label: i.toString() });
    }
  }

  return { dayOptions, monthOptions, yearOptions };
};
