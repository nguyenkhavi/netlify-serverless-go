'use client';
//THIRD PARTY MODULES
import Persona from 'persona';
import { useCallback } from 'react';
import { nextApi } from '_@landing/utils/api';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';
import { ContactCardShieldIcon } from '_@shared/icons/ContactCardIcon';
//RELATIVE MODULES
import ProfileNavMobile from '../comps/ProfileNavMobile';

export default function VerifyPage() {
  const { mutateAsync } = nextApi.userSetKYC.useMutation({});

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

  return (
    <>
      <ProfileNavMobile title="Compete KFC" isBorder={false} />
      <div className="md:flex">
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
      </div>
    </>
  );
}
