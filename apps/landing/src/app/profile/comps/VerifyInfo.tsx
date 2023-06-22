//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import CheckIcon from '_@shared/icons/CheckIcon';
import VerifyIcon from '_@shared/icons/VerifyIcon';
import { Phone2Icon } from '_@shared/icons/PhoneIcon';
import LocationIcon from '_@shared/icons/LocationIcon';
import { MailCheckIcon } from '_@shared/icons/MailIcon';
import { UserCircleIcon } from '_@shared/icons/UserIcon';
import QuestionCircleIcon from '_@shared/icons/QuestionCircleIcon';

export default function VerifyInfo() {
  return (
    <section className="mb-8 hidden justify-center lg:flex">
      <div
        className={classcat([
          'grid place-items-center justify-center py-6',
          'rounded-[10px] border border-text-10',
          'mr-4 max-w-[330px] grow',
        ])}
      >
        <p className="mb-1 text-h6">Verification Level : 2</p>
        <Popover>
          <PopoverTrigger>
            <div className="grid place-items-center">
              <QuestionCircleIcon className="mb-1 h-10 w-10" />
              <p className="text-subtitle2 text-primary">Upgrade</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <VerificationStepContent />
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

function VerificationStepContent() {
  return (
    <div>
      {VERIFICATION_STEPS.map((step, index) => (
        <div key={index}>
          <p
            className={classcat([
              'flex items-center text-h6',
              step.isComplete ? '' : 'text-text-50',
            ])}
          >
            <span
              className={classcat([
                'mr-2.5 h-5 w-5 rounded-full',
                'grid place-items-center',
                step.isComplete ? 'bg-primary' : 'bg-text-50',
              ])}
            >
              <Show when={step.isComplete}>
                <CheckIcon className="text-black" />
              </Show>
            </span>
            {step.title}
          </p>
          <div
            className={classcat([
              'relative py-8 pl-7.5',
              step.isComplete ? '[&>button_svg]:text-primary' : '[&>button_svg]:text-text-50',
            ])}
          >
            <Show when={index != VERIFICATION_STEPS.length - 1}>
              <span
                className={classcat([
                  'absolute left-2.5 top-0 h-full w-[1px]',
                  step.isComplete ? 'bg-primary' : 'bg-text-50',
                ])}
              ></span>
            </Show>
            {step.content}
          </div>
        </div>
      ))}
    </div>
  );
}

const VERIFICATION_STEPS = [
  {
    title: 'Level 1',
    isComplete: true,
    content: (
      <>
        <button
          className={classcat(['flex items-center rounded', 'h-11.25 bg-secondary-200 px-6'])}
        >
          <MailCheckIcon className="mr-3" />
          Email Verified
        </button>
        <button
          className={classcat(['flex items-center rounded', 'mt-2 h-11.25 bg-secondary-200 px-6'])}
        >
          <Phone2Icon className="mr-3" />
          Phone Verified
        </button>
      </>
    ),
  },
  {
    title: 'Level 2',
    isComplete: true,
    content: (
      <Link
        href="/profile/verify"
        className={classcat(['flex items-center rounded', 'h-11.25 bg-secondary-200 px-6'])}
      >
        <UserCircleIcon className="mr-3" />
        ID Verified
      </Link>
    ),
  },
  {
    title: 'Level 3',
    isComplete: false,
    content: (
      <Link
        href="/profile/verify?t=address"
        className={classcat(['flex items-center rounded', 'h-11.25 bg-secondary-200 px-6'])}
      >
        <LocationIcon className="mr-3" />
        Address Verification
      </Link>
    ),
  },
];
