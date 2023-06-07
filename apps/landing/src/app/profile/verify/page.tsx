'use client';
//THIRD PARTY MODULES
import Persona from 'persona';
import classcat from 'classcat';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import * as Popover from '_@landing/components/ui/popover';
//SHARED
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
import LocationIcon, { LocationCardShieldIcon } from '_@shared/icons/LocationIcon';
import ContactCardIcon, { ContactCardShieldIcon } from '_@shared/icons/ContactCardIcon';
//RELATIVE MODULES
import ProfileNavMobile from '../comps/ProfileNavMobile';

const btnClasses = [
  'h-13.75 w-full',
  'text-body2 text-text-50',
  'flex items-center justify-center',
  'hover:bg-primary hover:text-black',
  'data-[active=true]:bg-primary data-[active=true]:text-black',
];
const itemSelectClasses = [
  'hover:text-primary data-[active=true]:text-primary text-text-50',
  'px-6 h-6 text-body2',
  'flex items-center',
];

type TSelectValue = 'id' | 'address';

export default function VerifyPage() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const selectedValue = params.get('t') || 'id';

  const _handleSelectChange = (value: TSelectValue) => {
    router.push(`${pathname}?t=${value}`);
    setOpen(false);
  };

  const _startKYCId = useCallback(() => {
    const client = new Persona.Client({
      templateId: process.env.NEXT_PUBLIC_PERSONA_TEMPLATE_ID,
      environmentId: process.env.NEXT_PUBLIC_PERSONA_ENVIRONMENT_ID,
      onLoad: () => {},
      onReady: () => {
        client.open();
      },
      onComplete: ({ inquiryId }) => {
        console.log(`Sending finished inquiry ${inquiryId} to backend`);
      },
    });
  }, []);

  const _startKYCAddress = useCallback(() => {
    const client = new Persona.Client({
      templateId: process.env.NEXT_PUBLIC_PERSONA_TEMPLATE_ADDRESS,
      environmentId: process.env.NEXT_PUBLIC_PERSONA_ENVIRONMENT_ID,
      onLoad: () => {},
      onReady: () => {
        client.open();
      },
      onComplete: ({ inquiryId }) => {
        console.log(`Sending finished inquiry ${inquiryId} to backend`);
      },
    });
  }, []);
  return (
    <>
      <ProfileNavMobile title="Compete KFC" />
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
                <ArrowRightIcon color="currentColor" className="ml-3" />
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
          <Popover.Popover open={open} onOpenChange={(value) => setOpen(value)}>
            <Popover.PopoverTrigger
              className={classcat([
                'h-15 w-full pl-3 pr-6',
                'flex items-center',
                'rounded-[10px] border border-text-10',
                'text-text-80',
              ])}
            >
              {selectedValue === 'id' ? 'ID Verification' : 'Address Verification'}
              <ChevronDownIcon className="ml-auto" />
            </Popover.PopoverTrigger>
            <Popover.PopoverContent className="w-[--content-width] border-none bg-secondary-300">
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
            </Popover.PopoverContent>
          </Popover.Popover>
        </div>
        <Show when={selectedValue === 'id'}>
          <div className="rounded-[10px] bg-secondary-200 px-9.5 pb-10 pt-14 md:w-89">
            <p className="mb-1.5 text-center text-h6">Verify your account</p>
            <span className="mb-12.5 text-center text-body1 text-text-50">
              To access all the features of fleamint Please verify your ID + Phone number + Selfie
              verification
            </span>
            <ContactCardShieldIcon className="mx-auto mb-31" />
            <Button
              trailingIcon={<ArrowRightIcon />}
              className="btnlg mx-auto max-w-[250px]"
              onClick={_startKYCId}
            >
              Verify your Identity
            </Button>
          </div>
        </Show>
        <Show when={selectedValue === 'address'}>
          <div className="rounded-[10px] bg-secondary-200 px-9.5 pb-10 pt-14 md:w-89">
            <p className="mb-1.5 text-center text-h6">Verify your Address</p>
            <span className="mb-12.5 text-center text-body1 text-text-50">
              To access all the features of fleamint Please verify your Address
            </span>
            <LocationCardShieldIcon className="mx-auto mb-31" />
            <Button
              trailingIcon={<ArrowRightIcon />}
              className="btnlg mx-auto max-w-[250px]"
              onClick={_startKYCAddress}
            >
              Verify your Address
            </Button>
          </div>
        </Show>
      </div>
    </>
  );
}
