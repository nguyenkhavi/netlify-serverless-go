'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { dialogStore } from '_@landing/stores/dialogStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
//SHARED
import PenIcon from '_@shared/icons/PenIcon';
import TrashCanIcon from '_@shared/icons/TrashCanIcon';
//RELATIVE MODULES
import ProfileNavMobile from '../comps/ProfileNavMobile';
import ModalAddress, { FormValues } from './comps/CreateEditAddress';

export default function ProfileAddress() {
  const { openDialog, hideDialog } = dialogStore();

  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  const type =
    query.get('t') === 'create' ? 'create' : query.get('t') === 'edit' ? 'edit' : undefined;
  const id = query.get('id') || '';

  const _handleOpenDialog = (id: number | string) => {
    openDialog({
      type: 'delete-address',
      callback: () => {
        console.log('delete', id);
        hideDialog();
      },
    });
  };

  const _handleCreateAddress = () => {
    router.push(`${pathname}?t=create`);
  };

  const _handleEditAddress = (id: number | string) => {
    router.push(`${pathname}?t=edit&id=${id}`);
  };

  return (
    <div>
      <ProfileNavMobile title={'Address(2)'} isBorder={false} />
      <Show when={!type}>
        <div
          className={classcat([
            'flex items-center',
            'pb-0 pt-7 lg:pb-6 lg:pt-0',
            'lg:border-b lg:border-text-10',
          ])}
        >
          <p className="hidden text-h4 lg:block">Address(2)</p>
          <Button className="btnsm ml-auto w-max lg:btnlg" onClick={_handleCreateAddress}>
            Add new Address
          </Button>
        </div>
        <div className="mt-7 grid gap-5 md:mt-10 lg:grid-cols-2 lg:gap-6">
          {MOCK_DATA.map((item, i) => (
            <div
              key={i}
              className="flex flex-col rounded-[10px] border border-text-10 bg-secondary-200 px-6 pt-6"
            >
              <div>
                <p className="mb-2.5 text-body2">{item.name}</p>
                <ul
                  className={classcat([
                    '[&_p]:max-w-[180px]',
                    '[&_p]:text-body3 [&_p]:text-text-60 [&_span]:text-body3 [&_span]:text-text-30',
                    '[&_li:not(:last-child)]:mb-1.75 [&_li]:grid [&_li]:grid-cols-[108px_1fr] [&_li]:gap-[175px]',
                  ])}
                >
                  <li>
                    <span>Country Name:</span>
                    <p className="text-left">{item.country}</p>
                  </li>
                  <li>
                    <span>State:</span>
                    <p className="text-left">{item.state}</p>
                  </li>
                  <li>
                    <span>Street Address:</span>
                    <p className="text-left">{item.streetAddress}</p>
                  </li>
                </ul>
                <Show when={item.isDefault}>
                  <p className="mb-6 mt-2 text-body3 text-success lg:mb-4">Default address</p>
                </Show>
              </div>
              <div className="-mx-3 mt-auto flex items-center border-t border-text-10 px-3 pb-4 pt-5">
                {item.isDefault ? (
                  <p>DEFAULT ADDRESS</p>
                ) : (
                  <button className="text-primary">SET AS DEFAULT</button>
                )}
                <div className="ml-auto flex items-center">
                  <button className="mr-4" onClick={() => _handleEditAddress(item.id)}>
                    <PenIcon width={15} height={15} />
                  </button>
                  <button onClick={() => _handleOpenDialog(item.id)}>
                    <TrashCanIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Show>

      <Show when={!!type}>
        <ModalAddress id={id} type={type} />
      </Show>
    </div>
  );
}

export const MOCK_DATA: FormValues[] = [
  {
    id: 1,
    name: 'Syed Asad Hussain',
    country: 'United Arab Emirates',
    state: 'Abu Dabi',
    streetAddress: '9540 N. Marconi CourtDes Plaines, IL 60016',
    streetAddress2: '9540 N. Marconi CourtDes Plaines, IL 60016',
    isDefault: true,
    apartmentNumber: 'Apartment 7',
    postcode: '581234',
    contactNumber: '34535464454',
    additionalInfo: 'Info..',
  },
  {
    id: 2,
    name: 'Syed Asad Hussain',
    country: 'United Arab Emirates',
    state: 'Abu Dabi',
    streetAddress: '9540 N. Marconi CourtDes Plaines, IL 60016',
    isDefault: false,
    apartmentNumber: 'data',
    postcode: '123',
    contactNumber: '123',
    additionalInfo: 'Info',
  },
];
