'use client';
//THIRD PARTY MODULES
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RouterOutputs, api } from '_@landing/utils/api';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import T from '_@shared/components/table/TableCore';
//SHARED
import LoadingIcon from '_@shared/icons/LoadingIcon';

// Init dayjs plugins
dayjs.extend(relativeTime);

type TData = RouterOutputs['myActivities']['data'][number];

const columnHelper = createColumnHelper<TData>();

const firstUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
const signInCol = columnHelper.accessor((row) => row['action'], {
  id: 'action',
  header: () => <p className="text-center">Action</p>,
  cell: (cell) => {
    let value = cell.getValue() || '';
    value = value
      .split('_')
      .map((word) => firstUpperCase(word))
      .join(' ');
    return <p className="text-center">{value}</p>;
  },
});
const browserCol = columnHelper.accessor((row) => row['browser'], {
  id: 'browser',
  header: () => <p className="text-center">Browser</p>,
  cell: (cell) => <p className="text-center">{cell.getValue()}</p>,
});
const ipCol = columnHelper.accessor((row) => row['ipAddress'], {
  id: 'ipAddress',
  header: () => <p className="text-center">IP Address</p>,
  cell: (cell) => <p className="text-center">{cell.getValue()}</p>,
});
const locationCol = columnHelper.accessor((row) => row['location'], {
  id: 'location',
  header: () => <p className="text-center">Location</p>,
  cell: (cell) => {
    const value = cell.getValue() || 'N/A';
    return <p className="text-center">{value}</p>;
  },
});
const currentCol = columnHelper.accessor((row) => row['createdAt'], {
  id: 'createdAt',
  header: () => <p className="text-center">Current</p>,
  cell: (cell) => {
    const value = cell.getValue() || '';
    const time = dayjs(value).fromNow();
    return <p className="text-center">{time}</p>;
  },
});

const columns = [signInCol, browserCol, ipCol, locationCol, currentCol];

export default function AccountActivity() {
  const { hasNextPage, data, fetchNextPage, isFetching } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: ['myActivities'],
    queryFn: async ({ pageParam = 1 }) => {
      return await api.myActivities.query({
        page: pageParam,
        size: 5,
      });
    },
    getNextPageParam: (lastPage) => {
      if (Number(lastPage.total) / Number(lastPage.size) > Number(lastPage.page)) {
        return Number(lastPage.page) + 1;
      }
      return undefined;
    },
  });

  const table = useReactTable({
    data: data?.pages.flatMap((page) => page.data) || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section>
      <h1 className="mb-4 text-lg text-primary lg:text-h5-bold">Account activity</h1>
      <div className="w-[--content-width] md:w-auto">
        <T.Table>
          <T.TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <T.TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <T.TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </T.TableHead>
                  );
                })}
              </T.TableRow>
            ))}
          </T.TableHeader>
          <T.TableBody className="bg-secondary-200">
            {isFetching && !table.getRowModel().rows?.length ? (
              <T.TableRow>
                <T.TableCell colSpan={columns.length} className="h-24">
                  <LoadingIcon className="mx-auto" />
                </T.TableCell>
              </T.TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  <>
                    {table.getRowModel().rows.map((row) => (
                      <T.TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <T.TableCell
                            className="ow:min-w-[theme(spacing[49.5])] lg:ow:min-w-fit"
                            key={cell.id}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </T.TableCell>
                        ))}
                      </T.TableRow>
                    ))}
                    <Show when={hasNextPage}>
                      <T.TableRow>
                        <T.TableCell colSpan={columns.length} className="ow:py-6 ow:pl-12">
                          {isFetching ? (
                            <p className="flex items-center space-x-2 font-bold">
                              <LoadingIcon />
                              Loading...
                            </p>
                          ) : (
                            <button onClick={() => fetchNextPage()}>
                              <p className="cursor-pointer font-bold text-info underline">
                                Show more
                              </p>
                            </button>
                          )}
                        </T.TableCell>
                      </T.TableRow>
                    </Show>
                  </>
                ) : (
                  <T.TableRow>
                    <T.TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </T.TableCell>
                  </T.TableRow>
                )}
              </>
            )}
          </T.TableBody>
        </T.Table>
      </div>
    </section>
  );
}
