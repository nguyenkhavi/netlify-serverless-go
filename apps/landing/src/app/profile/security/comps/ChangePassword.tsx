'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
//SHARED
import LockPasswordIcon from '_@shared/icons/LockPasswordIcon';

const schema = z
  .object({
    currentPassword: z.string().nonempty('This field is required'),
    newPassword: z.string().nonempty('This field is required'),
    confirmPassword: z.string().nonempty('This field is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: 'New password is the same as a current password',
    path: ['newPassword'],
  });

type FormValues = z.infer<typeof schema>;

const formItemClasses = ['ow:gap-1 mb-5 md:w-1/2'];

export default function ChangePassword() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <section className="pt-5 lg:pt-0">
      <h1 className="text-h5-bold text-primary">Change Password</h1>
      <p className="mb-4 text-body1 text-text-50">Please update your password.</p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={classcat([
              'bg-secondary-200',
              'rounded-[10px] border border-text-10',
              'px-3 pb-4 pt-6 md:px-6 md:pb-5 md:pt-9',
            ])}
          >
            <FormItem
              label="Current Password"
              name="currentPassword"
              className={classcat([formItemClasses])}
            >
              <FormInput
                type="password"
                showEyeIcon={false}
                className="h-13.75 rounded-[5px] data-[valid='false']:rounded-[5px]"
                placeholder="Enter old password"
                trailingComponent={<LockPasswordIcon className="mr-4 md:mr-1" />}
              />
            </FormItem>
            <FormItem
              label="New Password"
              name="newPassword"
              className={classcat([formItemClasses])}
            >
              <FormInput
                type="password"
                showEyeIcon={false}
                className="h-13.75 rounded-[5px] data-[valid='false']:rounded-[5px]"
                placeholder="Enter new password"
                trailingComponent={<LockPasswordIcon className="mr-4 md:mr-1" />}
              />
            </FormItem>
            <FormItem
              label="Re-Enter New  Password"
              name="confirmPassword"
              className={classcat([formItemClasses])}
            >
              <FormInput
                type="password"
                showEyeIcon={false}
                className="h-13.75 rounded-[5px] data-[valid='false']:rounded-[5px]"
                placeholder="Re-enter new password"
                trailingComponent={<LockPasswordIcon className="mr-4 md:mr-1" />}
              />
            </FormItem>
            <Button
              type="submit"
              className="btnsm mt-3 w-max md:btnmd ow:px-11 md:mt-8 ow:md:px-13"
            >
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
