'use client';

//THIRD PARTY MODULES
import { z } from 'zod';
import dayjs from 'dayjs';
import Link from 'next/link';
import classcat from 'classcat';
import querystring from 'query-string';
import { useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { nextApi } from '_@landing/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FlatActivityEnrichedType } from '_@landing/stores/getstreamStore';
//LAYOUT, COMPONENTS
import Account from './components/Account';
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import NoData from '_@landing/components/NoData';
import FormItem from '_@shared/components/FormItem';
import SearchInput from '_@shared/components/SearchInput';
import Calendar from '_@shared/components/calendar/Calendar';
import FormRadioGroup from '_@shared/components/radio/FormRadioGroup';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import CalendarIcon from '_@shared/icons/CalendarIcon';
//RELATIVE MODULES
import ActivityCard from '../comps/ActivityCard';
import MobileSearchFilter from '../comps/MobileFilter';

export const schema = z.object({
  people: z.union([z.literal('ANYONE'), z.literal('FOLLOWING')]),
});

export const OPTIONS = [
  { value: 'ANYONE', label: 'From anyone' },
  { value: 'FOLLOWING', label: 'People you follow' },
];

export type FormValues = z.infer<typeof schema>;

export type QueryType = 'ALL' | 'ACCOUNT' | 'POST';

const DEFAULT_PAGESIZE = 4;

export default function SearchPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const type = searchParams.get('type') || 'ALL';
  const keyword = searchParams.get('keyword') || '';
  const people = searchParams.get('people') || 'ANYONE';
  const from = searchParams.get('from') || undefined;
  const to = searchParams.get('to') || undefined;

  const { data } = nextApi.communitySearchUserOrPost.useQuery(
    {
      type: type as QueryType,
      keyword: keyword,
      paging: { page: 1, pageSize: DEFAULT_PAGESIZE },
      peopleFilter: people as FormValues['people'],
      from: from,
      to: to,
    },
    { staleTime: 30 * 1000, refetchOnWindowFocus: false, retry: 0 },
  );

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { people: people as FormValues['people'] },
  });

  const { handleSubmit, getValues } = methods;

  const searchText = useRef<HTMLInputElement>(null);

  const _handleSearch = async () => {
    const filterValues = getValues('people');

    if (!searchText.current) return;
    const queryString = querystring.stringify({
      type: type,
      keyword: searchText.current.value,
      from: date?.from?.toISOString(),
      to: date?.to?.toISOString(),
      people: filterValues,
    });

    push(`${pathname}?${queryString}`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_17.5rem]">
      <div>
        <div className="mb-6 flex justify-between">
          <div className="mr-2 flex-1 lg:mr-0">
            <SearchInput
              ref={searchText}
              defaultValue={keyword}
              name="search"
              type="text"
              placeholder="Search"
              className={classcat([
                'h-10 md:text-body1',
                'ow:border-[.5px] ow:border-text-10 ow:bg-secondary-300',
              ])}
              iconPosition="right"
              onKeyDown={(e: KeyboardEvent) => {
                e.key === 'Enter' && _handleSearch();
              }}
              onClickIcon={_handleSearch}
            />
          </div>
          <MobileSearchFilter />
        </div>
        <div className="border-b-[1px] border-solid border-text-10">
          {TAB_MENU.map((tab, idx) => (
            <Link
              prefetch={false}
              key={idx}
              href={{
                pathname,
                query: { ...Object.fromEntries(searchParams), type: tab.key },
              }}
              className={classcat([
                'inline-block w-[92px] pb-[11px] pt-[1px] text-center text-body1 text-text-50 lg:w-[134px] lg:text-body1',
                tab.key === type
                  ? 'relative bg-main-gradient bg-clip-text text-transparent before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-full before:bg-main-gradient'
                  : '',
              ])}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <section className="my-6 bg-secondary-200 p-6">
          <Show when={type !== 'post'}>
            <div>
              {data?.users &&
                data.users.map((user) => (
                  <Account
                    key={user.userId}
                    name={user.username}
                    aboutMe={user.aboutMe}
                    avatar={user.avatar}
                    following={user.following}
                    getstreamId={user.getstreamId}
                  />
                ))}
            </div>
          </Show>
          <Show when={data?.users && data.users.length > 4}>
            <button className="text-gradient-pr relative left-1/2 -translate-x-1/2 before:absolute before:bottom-0 before:h-[1px] before:w-full before:bg-main-gradient">
              View All
            </button>
          </Show>
          <Show
            when={
              (type === 'ACCOUNT' && data?.users?.length === 0) ||
              (type === 'POST' && data?.posts?.length === 0) ||
              (type === 'ALL' && data?.users?.length === 0 && data.posts?.length === 0)
            }
          >
            <NoData />
          </Show>
        </section>

        <Show when={type === 'ALL' || type === 'POST'}>
          <HomeAdvHorizontal />
        </Show>
        <Show when={type !== 'POST'}>
          <div className="mt-6 grid gap-6">
            {data?.posts &&
              (data.posts as FlatActivityEnrichedType[]).map((post) => (
                <ActivityCard key={post.id} activity={post} />
              ))}
          </div>
        </Show>
      </div>

      <div>
        <div className="mb-6 hidden h-fit rounded-[10px] bg-secondary-300 p-4 lg:block">
          <h2 className="mb-4 text-xl">Search Filter</h2>
          <h3 className="mb-1.25 text-base">People</h3>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(_handleSearch)} className="mb-4">
              <FormItem label="" name="people" className="mb-4">
                <FormRadioGroup options={OPTIONS} className="gap-2" />
              </FormItem>

              <div className="mb-4 ml-auto hidden lg:block">
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

              <Button type="submit" className="ow:w-[138px]">
                Go
              </Button>
            </form>
          </FormProvider>
        </div>
        <HomeAdvVertical
          className="ow:relative ow:top-0 ow:w-full"
          btnClasses="ow:left-auto mt-2.5"
        />
      </div>
    </div>
  );
}

const TAB_MENU = [
  { label: 'All', key: 'ALL' },
  { label: 'Account', key: 'ACCOUNT' },
  { label: 'Post', key: 'POST' },
];
