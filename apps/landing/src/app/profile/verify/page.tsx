'use client';
//THIRD PARTY MODULES
import Persona from 'persona';
import classcat from 'classcat';
import { nextApi } from '_@landing/utils/api';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
import { toastStore } from '_@shared/stores/toast/toastStore';
import ArrowRightAltIcon from '_@shared/icons/ArrowRightAltIcon';
import LocationIcon, { LocationCardShieldIcon } from '_@shared/icons/LocationIcon';
import ContactCardIcon, { ContactCardShieldIcon } from '_@shared/icons/ContactCardIcon';
//HOOK
import useFilterQueryString from '_@landing/hooks/useFilterQueryString';
//RELATIVE MODULES
import ProfileNavMobile from '../comps/ProfileNavMobile';

type TSelectValue = 'id' | 'address';

export default function VerifyPage() {
  const { user } = useAuthStore();
  const { openToast } = toastStore();

  const { personaInquiryId, personaAddressInquiryId } = user?.profile ?? {};
  const filter = useFilterQueryString();
  const params = useSearchParams();

  const [open, setOpen] = useState(false);
  const selectedValue = params.get('t') || 'id';

  const { mutateAsync } = nextApi.userSetKYC.useMutation();
  const { mutateAsync: mutateAsyncAddress } = nextApi.userSetAddressKYC.useMutation();

  const _startKYCId = useCallback(() => {
    const client = new Persona.Client({
      templateId: process.env.NEXT_PUBLIC_PERSONA_TEMPLATE_ID,
      environmentId: process.env.NEXT_PUBLIC_PERSONA_ENVIRONMENT_ID,
      onLoad: () => {},
      onReady: () => {
        client.open();
      },
      onComplete: ({ inquiryId }) => {
        mutateAsync({ inquiryId });
        console.log(`Sending finished inquiry ${inquiryId} to backend`);
      },
    });
  }, [mutateAsync]);

  const _startKYCAddress = useCallback(() => {
    const client = new Persona.Client({
      templateId: process.env.NEXT_PUBLIC_PERSONA_TEMPLATE_ADDRESS,
      environmentId: process.env.NEXT_PUBLIC_PERSONA_ENVIRONMENT_ID,
      onLoad: () => {},
      onReady: () => {
        client.open();
      },
      onComplete: ({ inquiryId }) => {
        mutateAsyncAddress({ inquiryId });
        console.log(`Sending finished inquiry ${inquiryId} to backend`);
      },
    });
  }, [mutateAsyncAddress]);

  const _handleSelectChange = (value: TSelectValue) => {
    if (!personaInquiryId) {
      openToast('Please verify your identity first', 'error');
      return;
    }
    filter({ t: value });
    setOpen(false);
  };

  useEffect(() => {
    // Verify identity first
    if (!personaInquiryId && selectedValue === 'address') {
      filter({ t: 'id' });
    }
  }, [filter, personaInquiryId, selectedValue]);

  return (
    <>
      <ProfileNavMobile title="Compete KFC" isBorder={false} />
      <div className="md:flex">
        <div className="mr-7 hidden md:block">
          <div className="w-68 rounded-[10px] border border-text-10 bg-secondary-200">
            <h1 className="border-b border-text-10 p-5 text-h5-bold">Select KYC partner</h1>
            <div className="py-5">
              <button
                className={classcat([btnClasses])}
                data-active={selectedValue === 'id'}
                onClick={() => _handleSelectChange('id')}
              >
                <ContactCardIcon color="currentColor" className="mr-3" />
                ID Verification
                <ArrowRightAltIcon color="currentColor" className="ml-3 rotate-180" />
              </button>
              <button
                className={classcat([btnClasses])}
                data-active={selectedValue === 'address'}
                onClick={() => _handleSelectChange('address')}
              >
                <LocationIcon className="mr-3 text-current" />
                Address Verification
              </button>
            </div>
          </div>
        </div>
        <div className="py-5 md:hidden">
          <Popover open={open} onOpenChange={(value) => setOpen(value)}>
            <PopoverTrigger
              className={classcat([
                'h-15 w-full pl-3 pr-6',
                'flex items-center',
                'rounded-[10px] border border-text-10',
                'text-text-80',
              ])}
            >
              {selectedValue === 'id' ? 'ID Verification' : 'Address Verification'}
              <ChevronDownIcon className="ml-auto" />
            </PopoverTrigger>
            <PopoverContent className="w-[--content-width] border-none bg-secondary-300">
              <button
                className={classcat([itemSelectClasses, 'mb-5'])}
                data-active={selectedValue === 'id'}
                onClick={() => _handleSelectChange('id')}
              >
                <ContactCardIcon color="currentColor" className="mr-3" />
                ID Verification
              </button>
              <button
                className={classcat([itemSelectClasses])}
                data-active={selectedValue === 'address'}
                onClick={() => _handleSelectChange('address')}
              >
                <LocationIcon className="mr-3 text-current" />
                Address Verification
              </button>
            </PopoverContent>
          </Popover>
        </div>
        <Show when={selectedValue === 'id'}>
          <div className="rounded-[10px] bg-secondary-200 px-9.5 pb-10 pt-14 md:w-89">
            <p className="mb-1.5 text-center text-h6">Verify your account</p>
            <span className="mb-12.5 text-center text-body1 text-text-50">
              To access all the features of fleamint Please verify your ID + Phone number + Selfie
              verification
            </span>
            <ContactCardShieldIcon className="mx-auto mb-31" />
            {!personaInquiryId ? (
              <Button
                trailingIcon={<ArrowRightAltIcon color="currentColor" className="rotate-180" />}
                className="btnlg mx-auto max-w-[250px]"
                onClick={_startKYCId}
              >
                Verify your Identity
              </Button>
            ) : null}
          </div>
        </Show>
        <Show when={selectedValue === 'address'}>
          <div className="rounded-[10px] bg-secondary-200 px-9.5 pb-10 pt-14 md:w-89">
            <p className="mb-1.5 text-center text-h6">Verify your Address</p>
            <span className="mb-12.5 text-center text-body1 text-text-50">
              To access all the features of fleamint Please verify your Address
            </span>
            <LocationCardShieldIcon className="mx-auto mb-31" />
            {!personaAddressInquiryId ? (
              <Button
                trailingIcon={<ArrowRightAltIcon color="currentColor" className="rotate-180" />}
                className="btnlg mx-auto max-w-[250px]"
                onClick={_startKYCAddress}
              >
                Verify your Address
              </Button>
            ) : null}
          </div>
        </Show>
      </div>
    </>
  );
}

const btnClasses = [
  'h-13.75 w-full',
  'text-body2 text-text-50',
  'flex items-center justify-center',
  'hover:bg-primary hover:text-black',
  'data-[active=true]:bg-primary data-[active=true]:text-black',
];
const itemSelectClasses = [
  'hover:text-primary data-[active=true]:text-primary text-text-50',
  'h-6 text-body2',
  'flex items-center',
];
