//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
//SHARED
import CameraIcon from '_@shared/icons/CameraIcon';
import { TwitterLightIcon } from '_@shared/icons/TwitterIcon';
import { InstagramLightIcon } from '_@shared/icons/InstagramIcon';

const schema = z.object({
  about: z.string(),
  description: z.string(),
  street_address: z.string(),
  country: z.string(),
  state: z.string(),
  street_address_2: z.string(),
  apartment_number: z.string(),
  postcode: z.string(),
  contact_number: z.string(),
  additional_info: z.string(),
});

type FormValues = z.infer<typeof schema>;

type ProfileEditProps = {
  setIsEdit: (isEdit: boolean) => void;
};

export default function ProfileEdit({ setIsEdit }: ProfileEditProps) {
  const [coverUrl, setCoverUrl] = useState('/images/profile/cover.jpeg');
  const [avatarUrl, setAvatarUrl] = useState(
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
  );

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const _handleUploadFileCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setCoverUrl(url);
  };

  const _handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-7">
        <div className="rounded-[10px] bg-secondary-200 py-3">
          <h2 className="mb-6.5 px-3 text-h6 lg:text-h5-bold">Personal Information</h2>
          <img className="relative z-[1] h-34 w-full object-cover lg:h-36" src={coverUrl} alt="" />
          <div className="relative z-[2] -mt-7 grid grid-cols-3 place-items-center px-3 lg:-mt-14.5">
            <div></div>
            <div
              className={classcat([
                'overflow-hidden rounded-full border border-primary',
                'relative h-14 w-14 lg:h-29 lg:w-29',
                '[&>button]:hover:flex [&>img]:hover:blur-[1px]',
              ])}
            >
              <img className="h-full w-full object-cover" src={avatarUrl} alt="" />
              <button
                type="button"
                className={classcat([
                  'absolute inset-0',
                  'flex items-center justify-center',
                  'btn-avt hidden',
                ])}
              >
                <CameraIcon className="h-7.5 w-6 cursor-pointer" />
                <input
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  type="file"
                  onChange={_handleUploadAvatar}
                />
              </button>
            </div>
            <div className="flex w-full justify-end">
              <Button
                variant="outlined"
                className={classcat([
                  'w-max text-[10px] ow:h-6 ow:rounded-3xl ow:bg-black/[.66] ow:px-3 [&>svg]:h-3 [&>svg]:w-3',
                  'relative ow:lg:h-10 ow:lg:px-5 ow:lg:text-subtitle2 [&>svg]:lg:h-5 [&>svg]:lg:w-5',
                ])}
                leadingIcon={<CameraIcon />}
              >
                Edit Cover
                <input
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  type="file"
                  onChange={_handleUploadFileCover}
                />
              </Button>
            </div>
          </div>
          <div className="mt-4 grid gap-4 px-3 lg:mt-1 lg:grid-cols-[1fr_333px]">
            <div className="grid gap-4">
              <FormItem label="About me" name="about">
                <FormInput
                  tag="textarea"
                  placeholder="Write about yourself.."
                  className="h-65 resize-none rounded lg:h-26"
                />
              </FormItem>
              <FormItem label="Store description" name="description">
                <FormInput
                  tag="textarea"
                  placeholder="Write about your store.."
                  className="h-65 resize-none rounded lg:h-26"
                />
              </FormItem>
            </div>
            <div>
              <p className="mb-1 text-body1">Social Connection</p>
              <span className="mb-2.5 text-body3 text-text-30">
                Help collector verify your account by connecting social account
              </span>
              <div className="mb-4 flex items-center justify-between">
                <p className="flex items-center">
                  <TwitterLightIcon className="mr-2" />
                  Twitter
                </p>
                <Button className="btnsm w-max">Connect</Button>
              </div>
              <div className="flex items-center justify-between ">
                <p className="flex items-center">
                  <InstagramLightIcon className="mr-2" />
                  Instagram
                </p>
                <Button className="btnsm w-max">Connect</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Button
            className="btnsm mr-2.5 w-max lg:btnmd"
            variant="outlined"
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </Button>
          <Button className="btnsm w-max lg:btnmd" type="submit">
            Update
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}