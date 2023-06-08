'use client';

//THIRD PARTY MODULES
import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import T from '_@shared/components/table/TableCore';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const ex = () => {
    // console.log(table.setPageSize(1));
  };

  return (
    <div>
      <div className="rounded-md border" onClick={ex}>
        <T.Table>
          <T.TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <T.TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <T.TableHead key={header.id}>
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
              table.getRowModel().rows.map((row) => (
                <T.TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <T.TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </T.TableCell>
                  ))}
                </T.TableRow>
              ))
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
      <div className="grid auto-cols-max grid-flow-col justify-end gap-2 py-4">
        <Button
          variant="outlined"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
