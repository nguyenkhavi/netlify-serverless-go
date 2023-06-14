//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import GoogleReCAPTCHA from 'react-google-recaptcha';
import { Controller, useFormContext } from 'react-hook-form';
//LAYOUT, COMPONENTS
import FormCheckboxArray from '_@shared/components/checkbox/FormCheckboxArray';
//SHARED
import LoadingIcon from '_@shared/icons/LoadingIcon';

export default function ReCAPTCHA({
  name,
  className,
  ...props
}: { name: string } & React.ComponentProps<'div'>) {
  const { control, setValue } = useFormContext();
  const [loading, setLoading] = useState(true);

  return (
    <Controller
      name={name}
      control={control}
      render={() => {
        return (
          <div className={classcat(['relative', className])} {...props}>
            <div className="cursor-pointer [&_*]:cursor-pointer">
              <div className="flex items-center justify-between rounded border-[0.5px] border-text-80 px-2 py-4">
                <div className="flex space-x-2">
                  {loading ? (
                    <LoadingIcon />
                  ) : (
                    <FormCheckboxArray
                      name={name}
                      checkboxClassName="ow:h-6 ow:w-6 pointer-events-none"
                      borderClassName="ow:border-[#c1c1c1] border-[2px]"
                    />
                  )}
                  <p className="ml-2 text-[14px] text-text-80">I'm not a robot</p>
                </div>

                <div className="relative h-0 w-16.25 ">
                  <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 gap-0 text-center">
                    <img
                      src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                      alt="gg-captcha"
                      className="mx-auto h-8 w-8 object-cover"
                    />
                    <span className="text-[10px] text-[#555]">reCAPTCHA</span>
                  </div>
                </div>
              </div>
            </div>
            <GoogleReCAPTCHA
              asyncScriptOnLoad={() => setLoading(false)}
              className="absolute inset-0 opacity-0 [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
              sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA as string}
              onChange={(value) => {
                if (!value) return;
                setValue('recaptcha', value);
              }}
            />
          </div>
        );
      }}
    />
  );
}
