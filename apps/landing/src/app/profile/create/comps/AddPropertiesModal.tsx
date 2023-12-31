//THIRD PARTY MODULES
import * as z from 'zod';
import classcat from 'classcat';
import * as Dialog from '@radix-ui/react-dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useId, useRef, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import BrowserOnly from '_@shared/components/BrowserOnly';
//SHARED
import CrossIcon from '_@shared/icons/CrossIcon';
import { getErrorMessage } from '_@shared/utils/func';

const values = z.object({
  properties: z.record(
    z.object({
      type: z.string().nonempty({ message: 'This field is required' }),
      name: z.string().nonempty({ message: 'This field is required' }),
    }),
  ),
});

type Values = z.infer<typeof values>;
type Props = {
  open: boolean;
  onOpen: (state: boolean) => void;
  setValuesProperties: (values: Values['properties']) => void;
  properties?: Values['properties'] | null;
};

const objectKeys = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[];

const AddPropertiesModal = ({
  properties: _properties,
  setValuesProperties,
  open,
  onOpen,
}: Props) => {
  const methods = useForm<Values>({
    resolver: zodResolver(values),
    defaultValues: {
      properties: (_properties || {}) as Values['properties'],
    },
  });
  const { handleSubmit, setValue, watch } = methods;
  const [properties, setProperties] = useState<string[]>(
    Object.keys(
      _properties || {
        [crypto.randomUUID()]: {
          type: '',
          name: '',
        },
      },
    ),
  );
  const listRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const propertiesData = watch('properties');

  const onAdd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const id = crypto.randomUUID();
    setProperties((prev) => [...prev, id]);

    timeoutRef.current = setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  const onRemove = useCallback(
    (id: string) => () => {
      setProperties((prev) => prev.filter((item) => item !== id));
      const newValues = objectKeys(propertiesData).reduce((acc, key) => {
        if (key !== id) {
          acc[key] = propertiesData[key];
        }
        return acc;
      }, {} as any);

      setValue('properties', newValues);
    },
    [propertiesData, setValue],
  );

  const onSubmit = handleSubmit((data) => {
    setValuesProperties(data.properties);
    onOpen(false);
  });

  return (
    <BrowserOnly>
      <Dialog.Root open={open} onOpenChange={onOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <FormProvider {...methods}>
              <form
                onSubmit={onSubmit}
                className="w-[calc(100vw-var(--px))] sm:w-full md:max-w-[theme(spacing[124.5])]"
              >
                <div className="h-full w-full bg-secondary-300 p-6">
                  <div className="flex h-full flex-col space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-h5-bold text-white">Add Properties</span>
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          onClick={() => onOpen(false)}
                          aria-label="Close"
                          className="relative h-11.25 w-11.25"
                        >
                          <CrossIcon className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2" />
                        </button>
                      </Dialog.Close>
                    </div>
                    <div className="flex h-full grow flex-col space-y-7">
                      <p className="text-body1 text-text-50">
                        Properties show up underneath your item, are clickable can be filtered in
                        your collection’s sidebar.
                      </p>

                      <div
                        ref={listRef}
                        className="max-h-[240px] grow space-y-4 overflow-auto pb-2"
                      >
                        {properties.map((value, i) => (
                          <InputProperties
                            key={value}
                            remove={onRemove(properties[i])}
                            name={`properties.${value}`}
                          />
                        ))}
                      </div>

                      <Button onClick={onAdd} className="ow:w-29.25" variant="outlined">
                        Add More
                      </Button>
                    </div>
                    <Button type="submit" className="shrink-0 md:btnlg">
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </BrowserOnly>
  );
};

export default AddPropertiesModal;

const baseClasses = [
  'w-full bg-transparent',
  'transition-colors',
  'focus-visible:outline-none',
  'text-text-50 placeholder:text-text-20 text-body1',
  'px-4',
];

type InputPropertiesProps = {
  remove?: () => void;
  name: string;
};

const InputProperties = ({ remove, name }: InputPropertiesProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const id = useId();
  return (
    <div className="grid gap-1">
      <div className="flex space-x-1">
        <div className="grid gap-1.25">
          <label htmlFor="title">Type</label>
          <div className="flex rounded-l-[10px] border-[1px] border-text-10">
            <button
              type="button"
              onClick={remove}
              className="grid h-12 w-10.5 shrink-0 place-content-center border-r-[1px] border-text-10 md:w-13.5"
            >
              <CrossIcon className="h-2.5 w-2.5" />
            </button>
            <input
              type="text"
              className={classcat([baseClasses])}
              placeholder="Type"
              {...register(`${name}.type`)}
            />
          </div>
        </div>
        <div className="grid gap-1.25">
          <label htmlFor="title">Name</label>
          <div className="flex rounded-r-[10px] border-[1px] border-text-10">
            <button
              // remove tabIndex
              tabIndex={-1}
              type="button"
              className="grid h-12 w-14 shrink-0 place-content-center border-r-[1px] border-text-10 opacity-0"
            >
              <CrossIcon className="h-2.5 w-2.5" />
            </button>
            <input
              type="text"
              className={classcat([baseClasses])}
              placeholder="Name"
              {...register(`${name}.name`)}
            />
          </div>
        </div>
      </div>
      <p id={`err-${id}`} className="text-body3 text-error">
        {getErrorMessage(`${name}.type`, errors) || getErrorMessage(`${name}.name`, errors)}
      </p>
    </div>
  );
};
