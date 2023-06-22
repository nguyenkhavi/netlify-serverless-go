//THIRD PARTY MODULES
import { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
//LAYOUT, COMPONENTS
import T from '_@shared/components/table/TableCore';

type TData = {
  status: string;
  id: string;
  amount: string;
  recipient: string;
  balance: string;
};

const columnHelper = createColumnHelper<TData>();

const statusCol = columnHelper.accessor((row) => row['status'], {
  id: 'status',
  header: 'Status',
  size: 248,
});

const amountCol = columnHelper.accessor((row) => row['amount'], {
  id: 'amount',
  header: 'Amount',
  size: 248,
});

const recipientCol = columnHelper.accessor((row) => row['recipient'], {
  id: 'recipient',
  header: 'Recipient',
  size: 248,
});

const balanceCol = columnHelper.accessor((row) => row['balance'], {
  id: 'balance',
  header: 'Balance',
  size: 248,
});

const columns = [statusCol, amountCol, recipientCol, balanceCol];

export default function SoldContent() {
  const [data, setData] = useState<TData[]>(MOCK_DATA);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="[&>div]:rounded-none [&>div]:lg:border-none">
      <T.Table className="table-fixed">
        <T.TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <T.TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <T.TableHead key={header.id} className="whitespace-nowrap text-center">
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
          {table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <T.TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <T.TableCell key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </T.TableCell>
                  ))}
                </T.TableRow>
              ))}
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
  );
}

const MOCK_DATA: TData[] = [
  {
    status: 'Sent',
    id: '1',
    amount: '1.21 FLM',
    recipient: '@syed',
    balance: '0.19 FLM',
  },
  {
    status: 'Sent',
    id: '2',

    amount: '1.21 FLM',
    recipient: '@syed',
    balance: '0.19 FLM',
  },
  {
    status: 'Sent',
    id: '2',

    amount: '1.21 FLM',
    recipient: '@syed',
    balance: '0.19 FLM',
  },
  {
    status: 'Sent',
    id: '2',

    amount: '1.21 FLM',
    recipient: '@syed',
    balance: '0.19 FLM',
  },
  {
    status: 'Sent',
    id: '2',

    amount: '1.21 FLM',
    recipient: '@syed',
    balance: '0.19 FLM',
  },
  {
    status: 'Sent',
    id: '2',

    amount: '1.21 FLM',
    recipient: '@syed',
    balance: '0.19 FLM',
  },
];
