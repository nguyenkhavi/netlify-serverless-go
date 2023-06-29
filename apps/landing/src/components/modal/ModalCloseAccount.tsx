'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import { nextApi } from '_@landing/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import FormCheckbox from '_@shared/components/checkbox/FormCheckbox';
import FormRadioGroup from '_@shared/components/radio/FormRadioGroup';
import { Dialog, DialogContent } from '_@shared/components/dialog/BaseDialog';
//SHARED
import InfoIcon from '_@shared/icons/InfoIcon';
import { toastAction } from '_@shared/stores/toast/toastStore';

const schema = z.object({
  reason: z.string().nonempty('This field is required'),
  content: z.string().nonempty('This field is required'),
  isAccept: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function ModalCloseAccount({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { logout } = useAuthStoreAction();
  const { mutateAsync: closeAccount, isLoading: isCloseAccountLoading } =
    nextApi.closeAccount.useMutation();
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { reason: '', content: '', isAccept: true },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: FormValues) => {
    try {
      await closeAccount({
        tellUs: OPTIONS.find((item) => item.value === values.reason)?.label || '',
        tellUsMore: values.content,
      });
      logout();
    } catch (err) {
      console.log(err);
      toastAction.openToast('Something went wrong, please try again later', 'error');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="ow:bg-black ow:p-0 lg:max-w-[542px]" showClose={false}>
        <p className="bg-secondary-200 px-4 py-5 text-h6 md:px-9">Request to close account</p>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 p-4 lg:gap-8 lg:p-6">
            <div className="grid gap-4 lg:gap-8">
              <p>Tell us why you are leaving</p>
              <FormItem label="" name="reason" className="[&>label]:text-text-100">
                <FormRadioGroup options={OPTIONS} ariaLabel="Choose type" className="gap-4" />
              </FormItem>
            </div>

            <div className="grid gap-1">
              <FormItem label="Tell us More" name="content" className="[&>label]:text-text-100">
                <FormInput
                  tag="textarea"
                  className="h-full resize-none"
                  containerClasses="ow:h-34"
                />
              </FormItem>
              <p className="text-sm leading-[1.625rem] text-text-30">
                <span>100 character left</span>
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex space-x-2 rounded-[4px] bg-secondary-200 p-4">
                <InfoIcon className="shrink-0" />
                <p className="text-body3 text-text-50">
                  Closing your account will remove all your account -related information such as
                  transaction history from our records and you won’t be able access them anymore
                </p>
              </div>
              <FormItem label="" name="isAccept">
                <FormCheckbox
                  rootClasses="ow:mt-0"
                  label="I understand I will not be able to verify a new Fleamint account using the identification on this account"
                />
              </FormItem>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button className="btnmd" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                isLoading={isCloseAccountLoading}
                className="btnmd"
                color="error"
                variant="outlined"
                type="submit"
              >
                Deactivate
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

const OPTIONS = [
  { value: '1', label: 'I have privacy concerns' },
  { value: '2', label: "I don't want to submit verification documents" },
  { value: '3', label: 'I have another account' },
  { value: '4', label: 'I am getting too many emails' },
  { value: '5', label: 'I have safety concerns' },
  { value: '6', label: 'Other' },
];
