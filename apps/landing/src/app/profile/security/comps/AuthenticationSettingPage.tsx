//THIRD PARTY MODULES
import classcat from 'classcat';
//SHARED
import MailFilledIcon from '_@shared/icons/MailFilledIcon';
import MobilePhone2Icon from '_@shared/icons/MobilePhone2Icon';

export default function AuthenticationSettingPage() {
  return (
    <section>
      <h1 className="mb-4 text-h5-bold text-primary">Two-factor authentication (2FA) settings</h1>
      <div
        className={classcat([
          'rounded-[10px] border border-text-10',
          'bg-secondary-200 px-6 py-9',
          'grid gap-5',
          'md:px-36.25',
        ])}
      >
        {AUTHENTICATION_SETTING_NAV.map((nav, i) => (
          <div key={i} className="flex items-center">
            <div
              className={classcat([
                'flex items-center justify-center',
                'text-body1 text-text-50',
                'h-12.5 w-45 rounded-3xl bg-black',
              ])}
            >
              {nav.icon}
              {nav.label}
            </div>
            {nav.isActive ? (
              <p className="ml-auto mr-3 text-body2 text-primary">Active</p>
            ) : (
              <p className="ml-auto text-body2 text-text-50">Inactive</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const AUTHENTICATION_SETTING_NAV = [
  {
    label: 'Phone number',
    icon: <MobilePhone2Icon className="mr-3 text-current" />,
    isActive: true,
  },
  {
    label: 'Email',
    icon: <MailFilledIcon className="mr-3 text-current" />,
    isActive: true,
  },
  {
    label: 'Google 2FA',
    icon: <MobilePhone2Icon className="mr-3 text-current" />,
    isActive: false,
  },
];
