//RELATIVE MODULES
import { columns } from './columns';
import { DataTable } from './data-table';

export enum ECurrentStatus {
  'Active',
  'Inactive',
}

export type ActiveSession = {
  id: string;
  'signed-in': Date;
  browser: 'Arc' | 'Google' | 'Firefox' | 'Opera';
  'ip-address': string;
  location: string;
  current: ECurrentStatus.Active;
};

async function getData(): Promise<ActiveSession[]> {
  return [
    {
      id: '728ed52f',
      'signed-in': new Date('2021-08-01T12:00:00'),
      browser: 'Arc',
      'ip-address': '192:62:24:1',
      location: 'United States',
      current: ECurrentStatus.Active,
    },
    {
      id: '728ed52f',
      'signed-in': new Date('2021-08-01T12:00:00'),
      browser: 'Google',
      'ip-address': '192:62:24:1',
      location: 'United States',
      current: ECurrentStatus.Active,
    },
    {
      id: '728ed52f',
      'signed-in': new Date('2021-08-01T12:00:00'),
      browser: 'Firefox',
      'ip-address': '192:62:24:1',
      location: 'United States',
      current: ECurrentStatus.Active,
    },
    {
      id: '728ed52f',
      'signed-in': new Date('2021-08-01T12:00:00'),
      browser: 'Opera',
      'ip-address': '192:62:24:1',
      location: 'United States',
      current: ECurrentStatus.Active,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
