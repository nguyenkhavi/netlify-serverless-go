//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//SHARED
import VerifyIcon from '_@shared/icons/VerifyIcon';
import QuestionCircleIcon from '_@shared/icons/QuestionCircleIcon';

export default function VerifyInfo() {
  return (
    <section className="mb-10 hidden justify-center lg:flex">
      <div
        className={classcat([
          'grid h-30 place-items-center justify-center py-2.5',
          'rounded-[10px] border border-text-10',
          'mr-6.25 max-w-[330px] grow',
        ])}
      >
        <p className="text-h6">Verification Level : 2</p>
        <QuestionCircleIcon className="h-8 w-8" />
        <p className="text-subtitle2 text-primary">Upgrade</p>
      </div>
      <div
        className={classcat([
          'h-30 rounded-[10px] border border-text-10 px-5 py-2.5',
          'flex max-w-[330px] items-center',
        ])}
      >
        <VerifyIcon className="mr-4 h-10 w-9 shrink-0" />
        <div>
          <p className="text-h6">2FA Not Enabled</p>
          <p className="text-body3 text-text-50">
            Enabling two-factor authentication is great way to secure your account
          </p>
          <Link href="/profile/security" className="text-subtitle2 text-primary">
            Setup 2FA Now
          </Link>
        </div>
      </div>
    </section>
  );
}
