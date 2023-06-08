'use client';
//THIRD PARTY MODULES
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
//LAYOUT, COMPONENTS
import T from '_@shared/components/table/TableCore';

// Init dayjs plugins
dayjs.extend(relativeTime);

type TData = {
  id: string;
  action: string;
  browser: string;
  'ip-address': string;
  location: string;
  'signed-in': Date;
};

const columnHelper = createColumnHelper<TData>();

const actionCol = columnHelper.accessor((row) => row['action'], {
  id: 'action',
  header: 'Action',
});

const signInCol = columnHelper.accessor((row) => row['signed-in'], {
  id: 'signed-in',
  header: 'Signed In',
  cell: (cell) => {
    return <p>{dayjs(cell.getValue()).fromNow()}</p>;
  },
});
const browserCol = columnHelper.accessor((row) => row['browser'], {
  id: 'browser',
  header: 'Browser',
});
const ipCol = columnHelper.accessor((row) => row['ip-address'], {
  id: 'ip-address',
  header: 'IP Address',
});
const locationCol = columnHelper.accessor((row) => row['location'], {
  id: 'location',
  header: 'Location',
});

const columns = [actionCol, browserCol, ipCol, locationCol, signInCol];
export default function AccountActivity() {
  const table = useReactTable({
    data: MOCK_DATA,
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

const MOCK_DATA = [
  {
    id: '1',
    action: 'Change Password',
    browser: 'Chrome',
    'ip-address': '192:62:24:1',
    location: 'N/A',
    'signed-in': new Date('2023-05-01T12:00:00'),
  },
  {
    id: '2',
    action: 'Login',
    browser: 'Chrome',
    'ip-address': '192:62:24:1',
    location: 'N/A',
    'signed-in': new Date('2023-05-01T12:00:00'),
  },
  {
    id: '3',
    action: 'Signup',
    browser: 'Chrome',
    'ip-address': '192:62:24:1',
    location: 'N/A',
    'signed-in': new Date('2023-05-01T12:00:00'),
  },
  {
    id: '4',
    action: 'Change Password',
    browser: 'Chrome',
    'ip-address': '192:62:24:1',
    location: 'N/A',
    'signed-in': new Date('2023-05-01T12:00:00'),
  },
];
