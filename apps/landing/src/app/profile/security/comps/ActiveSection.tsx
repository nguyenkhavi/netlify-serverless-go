'use client';

//THIRD PARTY MODULES
import dayjs from 'dayjs';
import { useUser } from '@clerk/nextjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCallback, useEffect, useState } from 'react';
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

// Init dayjs plugins
dayjs.extend(relativeTime);

type TData = {
  status: string;
  lastActiveAt: Date;
  id: string;
  browserName?: string | undefined;
  browserVersion?: string | undefined;
  deviceType?: string | undefined;
  ipAddress?: string | undefined;
  city?: string | undefined;
  country?: string | undefined;
  isMobile?: boolean | undefined;
};

const columnHelper = createColumnHelper<TData>();

const signInCol = columnHelper.accessor((row) => row['lastActiveAt'], {
  id: 'lastActiveAt',
  header: 'Signed In',
  cell: (cell) => {
    return <p>{dayjs(cell.getValue()).fromNow()}</p>;
  },
});

const browserCol = columnHelper.accessor((row) => row['browserName'], {
  id: 'browserName',
  header: () => <p className="text-center">Browser</p>,
  cell: (cell) => <p className="text-center">{cell.getValue()}</p>,
});
const ipCol = columnHelper.accessor((row) => row['ipAddress'], {
  id: 'ipAddress',
  header: 'IP Address',
});
const locationCol = columnHelper.accessor((row) => row['country'], {
  id: 'country',
  header: 'Location',
});
const currentCol = columnHelper.accessor((row) => row['status'], {
  id: 'status',
  header: 'Current',

  cell: (cell) => {
    if (cell.getValue() === 'active') {
      return (
        <p className="inline-flex items-center text-primary">
          <span className="mr-1 grid h-3 w-3 place-items-center rounded-full bg-primary">
            <CheckIcon className="h-2.5 w-2.5 text-black" />
          </span>
          Active
        </p>
      );
    }
    return <p>Inactive</p>;
  },
});

const columns = [signInCol, browserCol, ipCol, locationCol, currentCol];

export default function ActiveSection() {
  const [data, setData] = useState<TData[]>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { user } = useUser();

  const _getUserSession = useCallback(async () => {
    const res = await user?.getSessions();
    if (!res) return;
    setData(
      res.map((item) => ({
        ...item.latestActivity,
        status: item.status,
        lastActiveAt: item.lastActiveAt,
      })),
    );
  }, [user]);

  useEffect(() => {
    _getUserSession();
  }, [_getUserSession]);

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
          <T.TableBody>
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
                    <p className="cursor-pointer text-info underline">Close all sessions</p>
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
          </T.TableBody>
        </T.Table>
      </div>
    </section>
  );
}
