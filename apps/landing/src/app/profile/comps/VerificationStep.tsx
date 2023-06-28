//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//SHARED
import CheckIcon from '_@shared/icons/CheckIcon';
import { Phone2Icon } from '_@shared/icons/PhoneIcon';
import LocationIcon from '_@shared/icons/LocationIcon';
import { UserCircleIcon } from '_@shared/icons/UserIcon';

export default function VerificationStep() {
  const { user } = useAuthStore();
  const { personaInquiryId, personaAddressInquiryId } = user?.profile ?? {};
  const doneList = [true, personaInquiryId, personaAddressInquiryId];
  return (
    <div>
      {VERIFICATION_STEPS.map((value, inx) => {
        return {
          ...value,
          isComplete: doneList[inx],
        };
      }).map((step, index) => (
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
                step.isComplete ? 'check-gradient' : 'bg-text-50',
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
              'relative mb-1 pl-7.5',
              step.isComplete ? '[&_button>svg]:text-primary' : '[&_a>svg]:text-text-50',
            ])}
          >
            <Show when={index != VERIFICATION_STEPS.length - 1}>
              <span
                className={classcat([
                  'absolute left-2.5 top-0 h-full w-[1px]',
                  step.isComplete ? 'check-gradient' : 'bg-text-50',
                ])}
              ></span>
            </Show>
            <div className="pb-8 pt-2">{step.isComplete ? step.contentSuccess : step.content}</div>
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
    contentSuccess: (
      <button className={classcat(['flex items-center rounded', 'h-14 bg-secondary-200 px-6'])}>
        <Phone2Icon className="mr-3" />
        Phone Verified
      </button>
    ),
  },
  {
    title: 'Level 2',
    isComplete: true,
    content: (
      <Link
        href="/profile/verify?t=address"
        className={classcat(['flex items-center rounded', 'h-14 bg-secondary-200 px-6'])}
      >
        <UserCircleIcon className="mr-3" />
        ID Verified
      </Link>
    ),
    contentSuccess: (
      <button
        className={classcat(['flex items-center rounded', 'h-14 w-full bg-secondary-200 px-6'])}
      >
        <UserCircleIcon className="mr-3" />
        ID Verified
      </button>
    ),
  },
  {
    title: 'Level 3',
    isComplete: false,
    content: (
      <Link
        href="/profile/verify?t=address"
        className={classcat(['flex items-center rounded', 'h-14 bg-secondary-200 px-6'])}
      >
        <LocationIcon className="mr-3" />
        Address Verification
      </Link>
    ),
    contentSuccess: (
      <button
        className={classcat(['flex items-center rounded', 'h-14 w-full bg-secondary-200 px-6'])}
      >
        <LocationIcon className="mr-3" />
        Address Verification
      </button>
    ),
  },
];
