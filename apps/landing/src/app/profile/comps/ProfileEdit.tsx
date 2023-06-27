//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { useState } from 'react';
import { api, nextApi } from '_@landing/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import urlWithIpfs from '_@landing/utils/urlWithIpfs';
import { useStorageUpload } from '@thirdweb-dev/react';
import { FormProvider, useForm } from 'react-hook-form';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import ConnectTwitterBtn from '_@landing/components/provider/ConnectTwitter';
import { ConnectInstagram } from '_@landing/components/provider/instagram/ConnectInstagram';
//SHARED
import { TwitterLightIcon } from '_@shared/icons/TwitterIcon';
import { toastStore } from '_@shared/stores/toast/toastStore';
import { InstagramLightIcon } from '_@shared/icons/InstagramIcon';
import CameraIcon, { CameraGradientIcon } from '_@shared/icons/CameraIcon';

const schema = z.object({
  aboutMe: z.string().nonempty({ message: 'This field is required' }),
  description: z.string().nonempty({ message: 'This field is required' }),
  avatarUrl: z.string(),
  coverUrl: z.string(),
});

type FormValues = z.infer<typeof schema>;

type ProfileEditProps = {
  setIsEdit: (isEdit: boolean) => void;
};

const IMAGE_DEFAULT = {
  avatarImage: '/images/profile/avatar-default.webp',
  coverImage: '/images/profile/cover.jpeg',
} as const;

export default function ProfileEdit({ setIsEdit }: ProfileEditProps) {
  const utils = nextApi.useContext();
  const { openToast } = toastStore();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: contentInstagram } = nextApi.userConnectInstagram.useMutation();
  const { mutateAsync: upload } = useStorageUpload();
  const [images, setImages] = useState<{
    avatarUrl?: File;
    coverUrl?: File;
  }>();
  const { user } = useAuthStore();
  const { instagramUid, twitterUid } = user?.profile ?? {};

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      coverUrl: user?.profile.coverUrl ?? IMAGE_DEFAULT.coverImage,
      avatarUrl: user?.profile.avatarUrl ?? IMAGE_DEFAULT.avatarImage,
      aboutMe: user?.profile.aboutMe ?? '',
      description: user?.profile.description ?? '',
    },
  });

  const { handleSubmit, setValue, watch } = methods;
  const avatarUrl = watch('avatarUrl');
  const coverUrl = watch('coverUrl');

  const _handleUploadFile =
    (name: 'avatarUrl' | 'coverUrl') => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      const file = e.target.files[0];
      //file < 15mg
      if (file.size > 15 * 1024 * 1024) {
        let message = '';
        if (name === 'avatarUrl') {
          message = 'Avatar image must be less than 15MB';
        } else {
          message = 'Cover image must be less than 15MB';
        }
        openToast(message);
        return;
      }
      const url = URL.createObjectURL(file);
      setValue(name, url);
      setImages((prev) => {
        return { ...prev, [name]: file };
      });
    };

  const handleInstagramSuccess = (code: string | null) => {
    if (!code) return;
    utils.myProfile.invalidate();
    contentInstagram({
      code,
    });
  };

  const handleTwitterSuccess = () => {
    utils.myProfile.invalidate();
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const { avatarUrl, coverUrl } = values;

      if (avatarUrl === IMAGE_DEFAULT.avatarImage) values.avatarUrl = '';
      if (coverUrl === IMAGE_DEFAULT.coverImage) values.coverUrl = '';
      const [[avatarImageUrl], [coverImageUrl]] = await Promise.all(
        [images?.avatarUrl, images?.coverUrl].map((url) => {
          if (!url) return Promise.resolve('');
          return upload({ data: [url] });
        }),
      );
      if (avatarImageUrl) values.avatarUrl = avatarImageUrl;
      if (coverImageUrl) values.coverUrl = coverImageUrl;
      await api.updatePersonalInfo.mutate(values);
      utils.myProfile.invalidate();
      openToast('Update profile successfully!');
    } catch (error) {
      openToast('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-7">
        <div className="rounded-[10px] bg-secondary-200 py-3">
          <h2 className="mb-6.5 px-3 text-h6 lg:text-h5-bold">Personal Information</h2>
          <img
            className="relative z-[1] h-34 w-full object-cover lg:h-36"
            src={urlWithIpfs(coverUrl)}
            alt=""
          />
          <div className="relative z-[2] -mt-7 grid grid-cols-3 place-items-center px-3 lg:-mt-14.5">
            <div></div>
            <div
              className={classcat([
                'overflow-hidden rounded-full border border-primary',
                'relative h-14 w-14 lg:h-29 lg:w-29',
                '[&>button]:hover:flex [&>img]:hover:blur-[1px]',
              ])}
            >
              <img className="h-full w-full object-cover" src={urlWithIpfs(avatarUrl)} alt="" />
              <button
                type="button"
                className={classcat([
                  'absolute inset-0',
                  'flex items-center justify-center',
                  'hidden',
                ])}
              >
                <CameraIcon className="h-7.5 w-6 cursor-pointer" />
                <input
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  type="file"
                  onChange={_handleUploadFile('avatarUrl')}
                />
              </button>
            </div>
            <div className="flex w-full justify-end">
              <Button
                variant="outlined"
                className={classcat([
                  'border-green-gradient w-max text-[10px] ow:h-6.5 ow:gap-1 ow:rounded-3xl ow:bg-black/[.66] ow:px-2 [&>svg]:h-3 [&>svg]:w-3',
                  'relative ow:lg:h-10 ow:lg:px-4 ow:lg:py-2 ow:lg:text-subtitle2 [&>svg]:lg:h-5 [&>svg]:lg:w-5',
                ])}
                leadingIcon={<CameraGradientIcon />}
              >
                <span className="text-gradient-pr text-[10px] lg:text-subtitle2">Edit Cover</span>
                <input
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  type="file"
                  onChange={_handleUploadFile('coverUrl')}
                />
              </Button>
            </div>
          </div>
          <div className="mt-4 grid gap-4 px-3 lg:mt-1 lg:grid-cols-[1fr_333px]">
            <div className="grid gap-4">
              <FormItem label="About me" name="aboutMe">
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
              <span className="mb-2.5 text-body3 text-text-50">
                Help collector verify your account by connecting social account
              </span>
              <div className="mb-4 flex items-center justify-between">
                <p className="flex items-center">
                  <TwitterLightIcon className="mr-2" />
                  Twitter
                </p>
                <div className="relative">
                  <Button disabled={!!twitterUid} className="btnsm w-max">
                    {twitterUid ? 'Connected' : 'Connect'}
                  </Button>
                  <div
                    className={classcat([
                      '[&>button]:absolute [&>button]:h-full [&>button]:w-full',
                      '[&>button]:-translate-x-1/2 [&>button]:-translate-y-1/2 ',
                      '[&>button]:left-1/2 [&>button]:top-1/2',
                      '[&>button]:opacity-0',
                    ])}
                  >
                    <ConnectTwitterBtn
                      onFailure={(e) => {
                        console.log(e);
                      }}
                      onSuccess={handleTwitterSuccess}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <p className="flex items-center">
                  <InstagramLightIcon className="mr-2" />
                  Instagram
                </p>

                <ConnectInstagram
                  disabled={!!instagramUid}
                  onSuccess={handleInstagramSuccess}
                  buttonText={instagramUid ? 'Connected' : 'Connect'}
                  onFailure={(e) => {
                    console.log(e);
                  }}
                  clientId={process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID as string}
                />
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
          <Button isLoading={isLoading} className="btnsm w-max lg:btnmd" type="submit">
            Update
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
