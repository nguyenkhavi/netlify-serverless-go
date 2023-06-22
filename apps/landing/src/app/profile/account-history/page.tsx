'use client';
//THIRD PARTY MODULES
import dayjs from 'dayjs';
import classcat from 'classcat';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { usePathname, useRouter } from 'next/navigation';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import * as Tab from '_@shared/components/tabs/BaseTab';
import Calendar from '_@shared/components/calendar/Calendar';
import BasePagination from '_@shared/components/pagination/BasePagination';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import CalendarIcon from '_@shared/icons/CalendarIcon';
//RELATIVE MODULES
import AllContent from './comps/AllContent';
import SoldContent from './comps/SoldContent';
import PurchasesContent from './comps/PurchasesContent';
import ProfileNavMobile from '../comps/ProfileNavMobile';

export default function ProfileHistory() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const router = useRouter();
  const pathname = usePathname();

  const _handleTabChange = (value: string) => {
    router.push(`${pathname}?page=1`);
    //
    // console.log(value);
  };

  return (
    <>
      <ProfileNavMobile title={'Account History'} isBorder={false} />
      <div className="rounded-[10px] border-text-10 lg:border">
        <Tab.Root defaultValue={TABS[0].value} onValueChange={_handleTabChange}>
          <Tab.List className="items-center bg-secondary-200">
            {TABS.map((tab, index) => (
              <Tab.Trigger
                key={index}
                value={tab.value}
                className={classcat([
                  'w-39 data-[state=active]:text-subtitle2 ow:text-subtitle2 lg:data-[state=active]:text-xl ow:lg:text-xl',
                  'px-0 pb-2 pt-6 lg:px-8 ow:lg:[&:not(:first-child)]:ml-0',
                  // 'before:absolute before:bottom-2 before:right-0 before:w-[1px] lg:before:h-7',
                  // 'before:bg-text-20',
                ])}
              >
                {tab.label}
              </Tab.Trigger>
            ))}
            <div className="ml-auto mr-5 hidden lg:block">
              <Popover>
                <PopoverTrigger asChild>
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
                </PopoverTrigger>
                <PopoverContent className="w-auto bg-secondary p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </Tab.List>
          {TABS.map((tab, index) => (
            <Tab.Content key={index} value={tab.value} className="ow:mt-0 ow:lg:mt-0">
              {tab.content}
            </Tab.Content>
          ))}
        </Tab.Root>
      </div>
      <div className="mt-9 flex justify-center">
        <BasePagination totalItems={20} perPage={1} />
      </div>
    </>
  );
}

const TABS = [
  {
    value: '1',
    label: 'Purchases',
    content: <PurchasesContent />,
  },
  {
    value: '2',
    label: 'Sold',
    content: <SoldContent />,
  },
  {
    value: '3',
    label: 'All',
    content: <AllContent />,
  },
];
