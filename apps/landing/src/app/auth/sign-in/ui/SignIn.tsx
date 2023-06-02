'use client';
//THIRD PARTY MODULES
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
//SHARED
import LogoWhiteIcon from '_@shared/icons/LogoWhiteIcon';
//SHARED

export default function SignIn() {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section className="mb-17 mt-12.5">
      <div className="mb-8.75 mt-12.5">
        <LogoWhiteIcon className="mx-auto" />
      </div>
      <div className="mx-[--px] md:mx-auto md:max-w-[theme(space.135)]">
        <div className="rounded-[10px] bg-secondary-200 px-3 py-9 md:px-8.25 md:pb-7 md:pt-8.5 ">
          <h5 className="md:text-h-4 text-center text-h5 text-primary-700">Sign In</h5>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="mt-8.5 md:mt-10">
              <div className="grid gap-4">
                <FormItem label="Email/username" name="username">
                  <FormInput name="username" placeholder="www.uihut@gmail.com" />
                </FormItem>

                <FormItem label="Password" name="password">
                  <FormInput name="password" placeholder="**********" type="password" />
                </FormItem>
              </div>
              <div className="mt-1 text-end md:mt-2">
                <a href="#" className="btn-link text-primary">
                  Forget Password?
                </a>
              </div>
              <Button className="btnlg mx-auto mt-6 ow:w-62 md:ow:w-full">Sign in</Button>

              <p className="mt-11 flex items-center justify-center space-x-1">
                <span className="text-body1 text-text-80">Don’t have an account?</span>
                <button className="btn-link text-primary ow:w-fit">Sign Up</button>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
