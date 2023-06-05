'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { feedbackStore } from '_@landing/stores/feedbackStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import BaseModal from '_@shared/components/modal/BaseModal';
import FormRadioGroup from '_@shared/components/radio/FormRadioGroup';

const schema = z.object({
  type: z.string().trim(),
  content: z.string().trim().min(1, 'This field is required.'),
});

const OPTIONS = [
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'report', label: 'Report' },
];

type FormValues = z.infer<typeof schema>;

export default function ModalFeedback() {
  const { open, setOpen } = feedbackStore();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'suggestion' },
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <BaseModal
      open={open}
      owStyles={{
        contentClasses: 'px-4 md:px-11 py-10 border border-text-10 max-w-[30.625rem] w-full',
        overlayClasses: 'px-4',
      }}
    >
      <p className="text-h6">HI @Jhon_Meian,</p>
      <small className="mb-7.5 block text-body3 text-text-50">Select feedback type</small>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem label="" name="type">
            <FormRadioGroup options={OPTIONS} ariaLabel="Choose type" className="gap-2" />
          </FormItem>
          <FormItem label="Tell us about it in a few words:" name="content" className="mt-10">
            <FormInput
              tag="textarea"
              placeholder="Text here...."
              className="resize-none rounded-[10px] data-[valid='false']:rounded-[10px]"
            />
          </FormItem>
          <div className="mt-5 flex justify-end">
            <Button
              className="btnmd mr-2.5 ow:w-34.5"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button className="btnmd ow:w-34.5" type="submit">
              Send
            </Button>
          </div>
        </form>
      </FormProvider>
    </BaseModal>
  );
}
