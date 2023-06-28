'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';

const schema = z.object({
  price: z
    .string()
    .nonempty('Price is required')
    .superRefine((val, ctx) => {
      if (!Number(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          message: 'Price must be a number',
          expected: 'number',
          received: typeof val,
        });
      } else if (Number(val) < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          message: 'Price must be greater than 0',
          minimum: 0,
          type: 'number',
          inclusive: true,
        });
      }
    }),
});
type FormValues = z.infer<typeof schema>;

export default function ChangePrice() {
  const { hideDialog } = dialogMyItemCardStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = form;

  const _onsubmit = (values: FormValues) => {
    // TODO: value is string need to convert to number
    console.log(values);
    hideDialog();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(_onsubmit)}>
        <h2 className="text-body2 md:text-h6">Change Price</h2>
        <p className="mt-1 text-body1 text-text-50">
          it is advised that you reduce the price of your NFT.
        </p>
        <FormItem name="price" label="" className="mt-4">
          <FormInput
            placeholder="Enter new price"
            className="input-md"
            trailingComponent={<span className="text-subtitle2 text-text-20">BUSD</span>}
          />
        </FormItem>
        <div className="mt-4 grid grid-cols-2 gap-2 md:gap-4">
          <Button className="btnmd" variant="outlined" onClick={hideDialog}>
            Cancel
          </Button>
          <Button className="btnmd" type="submit">
            Change Price
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
