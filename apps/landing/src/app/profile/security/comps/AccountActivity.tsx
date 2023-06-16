'use client';
//THIRD PARTY MODULES
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RouterOutputs, nextApi } from '_@landing/utils/api';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
//LAYOUT, COMPONENTS
import T from '_@shared/components/table/TableCore';
//SHARED

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
  header: 'IP Address',
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
  const { data: listSession } = nextApi.myActivities.useQuery({
    page: 0,
    size: 10,
  });

  const table = useReactTable({
    data: listSession?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section>
      <h1 className="mb-4 text-h5-bold text-primary">Account activity</h1>
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
                    <p className="cursor-pointer text-info underline">Show more</p>
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
