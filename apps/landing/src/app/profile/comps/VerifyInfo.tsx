//THIRD PARTY MODULES
import Link from 'next/link'
import classcat from 'classcat'
import useAuthStore from '_@landing/stores/auth/useAuthStore'
//LAYOUT, COMPONENTS
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover'
//SHARED
import VerifyIcon from '_@shared/icons/VerifyIcon'
import QuestionCircleIcon from '_@shared/icons/QuestionCircleIcon'
//RELATIVE MODULES
import VerificationStep from './VerificationStep'

export default function VerifyInfo() {
  const { user } = useAuthStore();
  const { personaInquiryId, personaAddressInquiryId } = user?.profile ?? {};
  const verificationLevel = [true, personaInquiryId, personaAddressInquiryId].filter(
    Boolean,
  ).length;
  return (
    <section className="mb-8 hidden justify-center lg:flex">
      <div
        className={classcat([
          'grid place-items-center justify-center py-6',
          'rounded-[10px] border border-text-10',
          'mr-4 max-w-[330px] grow',
        ])}
      >
        <p className="mb-1 text-h6">Verification Level : {verificationLevel}</p>
        <Popover>
          <PopoverTrigger>
            <div className="grid place-items-center">
              <QuestionCircleIcon className="mb-1 h-10 w-10" />
              <p className="text-subtitle2 text-primary">Upgrade</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <VerificationStep />
          </PopoverContent>
        </Popover>
      </div>
      <div
        className={classcat([
          'rounded-[10px] border border-text-10 p-6',
          'flex max-w-[330px] items-center',
        ])}
      >
        <VerifyIcon className="mr-4 h-10 w-10 shrink-0" />
        <div>
          <p className="mb-[2px] text-h6">2FA Not Enabled</p>
          <p className="mb-[2px] text-body3 text-text-50">
            Enabling two-factor authentication is great way to secure your account
          </p>
          <Link href="/profile/security" className="block text-subtitle2 text-primary">
            Setup 2FA Now
          </Link>
        </div>
      </div>
    </section>
  );
}
