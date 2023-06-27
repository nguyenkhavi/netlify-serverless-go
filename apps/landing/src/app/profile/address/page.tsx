'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import { getQueryKey } from '@trpc/react-query';
import { Country, State } from 'country-state-city';
import { useQueryClient } from '@tanstack/react-query';
import { dialogStore } from '_@landing/stores/dialogStore';
import { RouterOutputs, nextApi } from '_@landing/utils/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import NoData from '_@landing/components/NoData';
import { DialogConfirm } from '_@landing/components/dialog/DialogConfirm';
//SHARED
import PenIcon from '_@shared/icons/PenIcon';
import LoadingIcon from '_@shared/icons/LoadingIcon';
import TrashCanIcon from '_@shared/icons/TrashCanIcon';
//RELATIVE MODULES
import ModalAddress from './comps/CreateEditAddress';
import ProfileNavMobile from '../comps/ProfileNavMobile';

export default function ProfileAddress() {
  const [loadingOfDelete, setLoadingOfDelete] = useState(false);
  const [loadingOfSetDefault, setLoadingOfSetDefault] = useState(false);
  const { openDialog, hideDialog } = dialogStore();
  const queryClient = useQueryClient();
  const { data } = nextApi.userGetAllShippingAddress.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  const { mutateAsync: updateAddress } = nextApi.userUpdateShippingAddressById.useMutation({});
  const { mutateAsync: deleteAddress } = nextApi.userDeleteShippingAddress.useMutation({});
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const [idSelected, setIdSelected] = useState<number | string | undefined>(undefined);

  const type =
    query.get('t') === 'create' ? 'create' : query.get('t') === 'edit' ? 'edit' : undefined;
  const id = query.get('id') || '';
  const itemSelected = data?.find((item) => item.id === Number(id));

  const _handleOpenDialog = (id: number | string) => {
    openDialog({
      type: 'delete-address',
      callback: () => {
        _handleDeleteAddress(id);
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

  const _handleSetDefault =
    (data: RouterOutputs['userGetAllShippingAddress'][number]) => async () => {
      try {
        setIdSelected(data.id);
        setLoadingOfSetDefault(true);
        await updateAddress({
          id: data.id,
          isDefault: true,
          apartmentNumber: data.apartmentNumber,
          contactNumber: data.contactNumber,
          additionalInformation: data.additionalInformation ?? undefined,
          street: data.street,
          secondStreet: data.secondStreet,
          postalCode: data.postalCode,
          dialCode: data.dialCode,
          country: data.country,
          state: data.state,
        });

        await queryClient.invalidateQueries(getQueryKey(nextApi.userGetAllShippingAddress));
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingOfSetDefault(false);
        setIdSelected(undefined);
      }
    };

  const _handleDeleteAddress = async (id: number | string) => {
    try {
      setIdSelected(id);
      setLoadingOfDelete(true);
      await deleteAddress({ id: Number(id) });
      await queryClient.invalidateQueries(getQueryKey(nextApi.userGetAllShippingAddress));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOfDelete(false);
      setIdSelected(undefined);
    }
  };

  return (
    <div>
      <ProfileNavMobile title={`Address(${data?.length || 0})`} isBorder={false} />
      <Show when={!type}>
        <div
          className={classcat([
            'flex items-center',
            'pb-0 pt-7 lg:px-6 lg:pb-6 lg:pt-0',
            'lg:border-b lg:border-text-10',
          ])}
        >
          <p className="hidden text-h4 lg:block">Address({data?.length || 0})</p>
          <Button className="btnsm ml-auto w-max lg:btnlg" onClick={_handleCreateAddress}>
            Add new Address
          </Button>
        </div>
        <div className="mt-7 grid gap-5 md:mt-10 lg:grid-cols-2 lg:gap-6">
          {data?.map((item, i) => (
            <div
              key={i}
              className={classcat([
                'min-h-[theme(spacing[77.5])] lg:min-h-[theme(spacing[77])]',
                'flex flex-col bg-secondary-200',
                'rounded-[10px] border border-text-10',
              ])}
            >
              <div className="flex grow flex-col p-6">
                <div className="grow">
                  <ul
                    className={classcat([
                      '[&_p]:max-w-[180px] [&_p]:md:max-w-full',
                      '[&_p]:text-body3 [&_p]:text-text-60 [&_span]:text-body3 [&_span]:text-text-30',
                      'grid gap-2',
                      '[&_li]:flex [&_li]:items-start [&_li]:justify-between',
                    ])}
                  >
                    <li>
                      <span>Country Name:</span>
                      <p className="line-clamp-5 w-33.25 text-right lg:w-38.25 lg:text-left">
                        {Country.getCountryByCode(item.country)?.name}
                      </p>
                    </li>
                    <li>
                      <span>State:</span>
                      <p className="line-clamp-5 w-33.25 text-right lg:w-38.25 lg:text-left">
                        {State.getStateByCodeAndCountry(item.state, item.country)?.name}
                      </p>
                    </li>
                    <li>
                      <span>Street Address:</span>
                      <p className="line-clamp-5 w-33.25 text-right lg:w-38.25 lg:text-left">
                        {item.street}
                      </p>
                    </li>
                  </ul>
                </div>

                <Show when={item.isDefault}>
                  <p className="text-body3 text-success">Default address</p>
                </Show>
              </div>
              <div className="mt-auto flex items-center border-t border-text-10 p-6 pt-5.75">
                {item.isDefault ? (
                  <p className="font-medium text-text-50">DEFAULT ADDRESS</p>
                ) : (
                  <button onClick={_handleSetDefault(item)} className="font-medium text-primary">
                    {loadingOfSetDefault && idSelected === item.id ? (
                      <LoadingIcon />
                    ) : (
                      'Set as default'
                    )}
                  </button>
                )}
                <div className="ml-auto flex items-center">
                  <button className="mr-4" onClick={() => _handleEditAddress(item.id)}>
                    <PenIcon width={15} height={15} />
                  </button>
                  <button onClick={() => _handleOpenDialog(item.id)}>
                    {loadingOfDelete && idSelected === item.id ? <LoadingIcon /> : <TrashCanIcon />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Show>
      <Show when={data?.length === 0 && !type}>
        <NoData />
      </Show>
      <Show when={!!type}>
        <ModalAddress id={id} type={type} defaultData={itemSelected} />
      </Show>
      <DialogConfirm />
    </div>
  );
}
