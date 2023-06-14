'use client';
//THIRD PARTY MODULES
import * as z from 'zod';
import dayjs from 'dayjs';
import React from 'react';
import { useMemo } from 'react';
import classcat from 'classcat';
import { Gender } from '_@rpc/drizzle/enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import ReCAPTCHA from '_@landing/components/ReCAPTCHA';
import FormSelect from '_@shared/components/FormSelect';
import { BaseSelectOption } from '_@shared/components/BaseSelect';
import FormRadioGroup from '_@shared/components/radio/FormRadioGroup';
import FormCheckboxArray from '_@shared/components/checkbox/FormCheckboxArray';
import FormPhoneInput from '_@shared/components/input/phone-input/FormPhoneInput';
//SHARED
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
  const { handleSubmit, watch } = methods;

  const month = watch('birthday.month');
  const year = watch('birthday.year');
  const { dayOptions, monthOptions, yearOptions } = useMemo(
    () => getDateMockupForSelect(Number(month), Number(year)),
    [month, year],
  );

  const onSubmit = handleSubmit(async (data) => {
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
  });

  return (
    <section className="mb-11 mt-13.75 grid gap-11.5 md:mb-23 md:mt-27.5 md:gap-20">
      <LogoWhiteIcon className="mx-auto" />
      <div className="mx-[--px] w-full md:mx-auto md:max-w-[theme(space.135)]">
        <div
          className={classcat([
            'rounded-[10px] bg-secondary-200',
            'grid gap-9 md:gap-2.5',
            'px-3 pb-10 pt-7 md:px-8.25 md:pb-7 md:pt-8.5',
          ])}
        >
          <h5 className="text-center text-h4 text-primary-700">Sign Up</h5>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-2 md:gap-4">
                <FormItem label="First Name" name="firstName">
                  <FormInput placeholder="First name" />
                </FormItem>

                <FormItem label="Last Name" name="lastName">
                  <FormInput placeholder="Last name" />
                </FormItem>

                <FormItem label="Username" name="username">
                  <FormInput placeholder="Username" />
                </FormItem>

                <FormItem label="Email" name="email">
                  <FormInput placeholder="Email" />
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
                    <FormSelect options={monthOptions} name="birthday.month" placeholder="Month" />
                    <FormSelect options={dayOptions} name="birthday.day" placeholder="Day" />
                    <FormSelect options={yearOptions} name="birthday.year" placeholder="Year" />
                  </div>
                </FormItem>

                <FormItem label="Gender" name="gender">
                  <FormRadioGroup
                    className="space-y-4"
                    options={[
                      { label: 'Male', value: Gender.MALE },
                      { label: 'Female', value: Gender.FEMALE },
                      { label: 'Other', value: Gender.OTHER },
                    ]}
                  />
                </FormItem>
              </div>

              <div className="mt-4 md:mt-9">
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
              </div>

              <ReCAPTCHA name="recaptcha" className="mt-6 md:mt-9" />

              <Button type="submit" className="btnlg mx-auto mt-4 ow:w-62 md:mt-6 md:ow:w-full">
                Sign Up
              </Button>

              <p className="mt-7 flex items-center justify-center space-x-1 md:mt-6">
                <span className="text-body3 text-text-80 md:text-body1">Already a member?</span>
                <button className="btn-link text-body2 text-primary ow:w-fit">Sign In</button>
              </p>
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
