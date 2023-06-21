'use client';

//THIRD PARTY MODULES
import dayjs from 'dayjs';
import { useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RouterOutputs, nextApi } from '_@landing/utils/api';
import { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
//LAYOUT, COMPONENTS
import T from '_@shared/components/table/TableCore';
//SHARED
import CheckIcon from '_@shared/icons/CheckIcon';
import LoadingIcon from '_@shared/icons/LoadingIcon';

// Init dayjs plugins
dayjs.extend(relativeTime);

type TData = RouterOutputs['listSession'][number];

const columnHelper = createColumnHelper<TData>();

const signInCol = columnHelper.accessor((row) => row['createdAt'], {
  id: 'createdAt',
  header: () => <p className="text-center">Signed in</p>,
  cell: (cell) => {
    const value = cell.getValue() || '';
    const time = dayjs(value).fromNow();
    return <p className="text-center">{time}</p>;
  },
});
const browserCol = columnHelper.accessor((row) => row['userAgent'], {
  id: 'userAgent',
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
const currentCol = columnHelper.accessor((row) => row['ext'], {
  id: 'ext',
  header: () => <p className="text-center">Current</p>,
  cell: (cell) => {
    const expTime = (cell.getValue() || 0) * 1000;
    const isExpired = expTime < Date.now();
    if (isExpired) {
      return <p className="text-center text-error">Inactive</p>;
    } else {
      return (
        <p className="flex items-center justify-center text-primary">
          <span className="mr-1 grid h-3 w-3 place-items-center rounded-full bg-primary">
            <CheckIcon className="h-2.5 w-2.5 text-black" />
          </span>
          Active
        </p>
      );
    }
  },
});

const columns = [signInCol, browserCol, ipCol, locationCol, currentCol];

export default function ActiveSection() {
  const { data: listSession, isFetching } = nextApi.listSession.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const { logout } = useAuthStoreAction();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: closeSession } = nextApi.revokeAllSession.useMutation({});

  const table = useReactTable({
    data: listSession || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onCloseSession = async () => {
    setIsLoading(true);
    await closeSession({});
    await logout();
  };

  return (
    <section>
      <h1 className="mb-4 text-h5-bold text-primary">Active Session</h1>
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
            {isFetching ? (
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
                          <T.TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </T.TableCell>
                        ))}
                      </T.TableRow>
                    ))}
                    <T.TableRow>
                      <T.TableCell>
                        <button onClick={onCloseSession}>
                          {isLoading ? (
                            'Logout all sessions...'
                          ) : (
                            <p className="cursor-pointer text-info underline">Close all sessions</p>
                          )}
                        </button>
                      </T.TableCell>
                      <T.TableCell colSpan={columns.length - 1}></T.TableCell>
                    </T.TableRow>
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
