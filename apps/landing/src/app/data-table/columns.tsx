'use client';
//THIRD PARTY MODULES
import { ColumnDef } from '@tanstack/react-table';
//RELATIVE MODULES
import { ActiveSession } from './page';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ActiveSession>[] = [
  {
    accessorKey: 'signed-in',
    header: 'Signed In',
  },
  {
    accessorKey: 'browser',
    header: 'Browser',
  },
  {
    accessorKey: 'ip-address',
    header: 'IP Address',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'current',
    header: 'Current',
  },
];
