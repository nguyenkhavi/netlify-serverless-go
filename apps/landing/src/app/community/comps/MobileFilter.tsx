'use client';
//THIRD PARTY MODULES
import dayjs from 'dayjs';
import classcat from 'classcat';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import * as Popover from '@radix-ui/react-popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import Calendar from '_@shared/components/calendar/Calendar';
import FormRadioGroup from '_@shared/components/radio/FormRadioGroup';
//SHARED
import CloseIcon from '_@shared/icons/CloseIcon';
import FunnelIcon from '_@shared/icons/FunnelIcon';
import CalendarIcon from '_@shared/icons/CalendarIcon';
//RELATIVE MODULES
import { FormValues, OPTIONS, schema } from '../search/page';

export default function MobileSearchFilter() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { people: 'ANYONE' },
  });

  const { handleSubmit } = methods;

  const onFilter = (values: FormValues) => {
    console.log(values);
    console.log({ date });
  };

  return (
    <Popover.Root open={open}>
      <Popover.Trigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="flex rounded-[5px] bg-secondary-300 p-2.5 lg:hidden"
        >
          <span className="mr-2.5 text-xs text-text-50">Filters</span>
          <FunnelIcon className="text-text-50" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className={classcat([
            'relative border border-solid border-text-20 bg-secondary will-change-[transform,opacity]',
            'w-79.5',
          ])}
          sideOffset={-56}
          onPointerDownOutside={() => {
            setOpen(false);
          }}
        >
          <div className="h-fit rounded-[10px] bg-secondary-300 p-4">
            <h2 className="mb-4 text-xl">Search Filter</h2>
            <h3 className="mb-1.25 text-base">People</h3>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onFilter)} className="mb-4">
                <FormItem label="" name="people" className="mb-4">
                  <FormRadioGroup options={OPTIONS} className="gap-2" />
                </FormItem>

                <div className="mb-4 ml-auto">
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <Button
                        id="date"
                        variant="outlined"
                        leadingIcon={<CalendarIcon />}
                        className={classcat([
                          'h-8 ow:border-text-10 ow:px-4 ow:text-text-30 [&>svg]:h-4 [&>svg]:w-4',
                        ])}
                      >
                        {date?.from ? (
                          date.to ? (
                            <>
                              {dayjs(date.from).format('MMM DD, YYYY')} -{' '}
                              {dayjs(date.to).format('MMM DD, YYYY')}
                            </>
                          ) : (
                            dayjs(date.from).format('MMM DD, YYYY')
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content className="w-auto bg-secondary p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </Popover.Content>
                  </Popover.Root>
                </div>

                <Button type="submit" className="ow:w-[138px]">
                  Go
                </Button>
              </form>
            </FormProvider>
          </div>
          <Button
            onClick={() => setOpen(false)}
            className={classcat([
              'absolute right-4 top-4',
              'rounded-[theme(spacing[1.25])] border-none bg-secondary-200',
              'ow:h-10.5 ow:w-11.25 ow:p-0 [&>svg]:ml-2 [&>svg]:h-6 [&>svg]:w-6',
            ])}
            leadingIcon={<CloseIcon className={classcat(['text-text-50'])} />}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
