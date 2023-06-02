'use client';
//THIRD PARTY MODULES
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Modal from '_@landing/app/auth/sign-in/comps/Modal';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
//SHARED
import PhoneIcon from '_@shared/icons/PhoneIcon';
import LogoWhiteIcon from '_@shared/icons/LogoWhiteIcon';
//SHARED

enum Mode {
  PHONE = 'phone',
  EMAIL = 'email',
  twoFA = 'twoFA',
}

const screens = {
  [Mode.PHONE]: {
    title: 'Phone Verification Code',
    subTitle: 'Enter  the 6-digit verification  code sent to  717***456',
  },
  [Mode.EMAIL]: {
    title: 'Email Verification Code',
    subTitle: 'Enter  the 6-digit verification  code sent to  abc*******@gmail.com',
  },
  [Mode.twoFA]: {
    title: 'Google 2FA',
    subTitle: 'Enter  the 6-digit verification  code',
  },
};

const screenList = [
  {
    title: 'Phone Number',
    value: Mode.PHONE,
  },
  {
    title: 'Email',
    value: Mode.EMAIL,
  },
  {
    title: 'Google 2FA',
    value: Mode.twoFA,
  },
];

export default function Verify() {
  const methods = useForm();
  const { handleSubmit } = methods;
  const [open, setOpen] = useState(false);
  const [screenMode, setScreenMode] = useState<Mode>(Mode.EMAIL);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const onOpen = (state: boolean) => {
    setOpen(state);
  };

  return (
    <section className="mb-29.25 mt-12.5 md:mb-63.25 md:mt-27.25">
      <div className="mb-8.75 mt-12.5">
        <LogoWhiteIcon className="mx-auto" />
      </div>
      <div className="mx-[--px] md:mx-auto md:max-w-[theme(space.135)]">
        <div className="rounded-[10px] bg-secondary-200 px-3 py-9 md:px-8.25 md:py-13 ">
          <h5 className="text-center text-h4 text-primary-700 md:text-start">
            Security Verification
          </h5>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="mt-12 md:mt-6">
              <div className="grid gap-4">
                <FormItem label={screens[screenMode].title} name="code">
                  <div className="grid gap-1.5">
                    <FormInput
                      name="code"
                      trailingComponent={
                        <button className="btn-link text-subtitle2 font-normal text-primary md:font-semibold">
                          Send Code
                        </button>
                      }
                    />
                    <p className="text-body3 text-text-50">{screens[screenMode].subTitle}</p>
                  </div>
                </FormItem>
              </div>

              <Button disabled={true} className="btnlg mx-auto mt-6 ow:w-62.5 md:ow:w-full">
                Submit
              </Button>

              <div className="mt-11 flex items-center justify-center space-x-1 md:justify-start">
                <button
                  className="btn-link text-subtitle2 text-primary ow:w-fit"
                  onClick={() => setOpen(true)}
                >
                  Try another Verification Method
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <Modal open={open} onOpen={onOpen}>
        <div className="h-56 w-72.5 rounded-[10px] bg-secondary px-8 pb-11 pt-8">
          <div className="grid gap-3">
            <span className="text-h6 text-primary-700">Choose an authenticator</span>

            <div className="grid gap-6">
              {screenList
                .filter((item) => item.value !== screenMode)
                .map((item) => (
                  <Button
                    className="ow:justify-start ow:border-none ow:bg-secondary-200 ow:px-4 ow:text-text-80"
                    color="primary"
                    leadingIcon={<PhoneIcon />}
                    key={item.value}
                    onClick={() => {
                      setScreenMode(item.value);
                      setOpen(false);
                    }}
                  >
                    {item.title}
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
