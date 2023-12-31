//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { nextApi } from '_@landing/utils/api';
import { Country, State } from 'country-state-city';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
//SHARED
import PenIcon from '_@shared/icons/PenIcon';
import MailIcon from '_@shared/icons/MailIcon';
import MobilePhoneIcon from '_@shared/icons/MobilePhoneIcon';

const boxClasses = ['p-4 md:p-6 rounded-[10px] border border-text-10 bg-secondary-300'];
const titleClasses = ['mb-2 text-body2'];
const contentClasses = ['text-body3 text-text-50'];

export default function ProfileInfoDetail() {
  const { user } = useAuthStore();
  const phone = `+${user?.profile?.phoneCode}${user?.profile?.phoneNumber}`;

  const { data: [defaultDataAddress] = [] } = nextApi.userGetAllShippingAddress.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      select: (data) => data.filter((item) => item.isDefault),
    },
  );

  return (
    <section className="grid gap-6 md:grid-cols-[1fr_330px] md:px-6 md:pb-6">
      <div className={classcat([boxClasses])}>
        <h2 className={classcat([titleClasses])}>About Me</h2>
        <p className={classcat([contentClasses])}>{user?.profile?.aboutMe || 'No about me'}</p>
      </div>
      <div className={classcat([boxClasses])}>
        <h2 className={classcat([titleClasses])}>Contact Info</h2>
        <p className="text-gradient-pr flex items-center text-sm">
          <MobilePhoneIcon className="mr-1.25" /> {phone}
        </p>
        <p className="text-gradient-pr mt-2.5 flex items-center text-sm">
          <MailIcon className="mr-1.25" color="default" /> {user?.profile.email}
        </p>
      </div>
      <div className={classcat([boxClasses, 'col-start-1 row-start-2'])}>
        <h2 className={classcat([titleClasses])}>Store description</h2>
        <p className={classcat([contentClasses])}>
          {user?.profile?.description || 'No description'}
        </p>
      </div>
      {defaultDataAddress ? (
        <div className={classcat([boxClasses])}>
          <h2 className={classcat([titleClasses, 'flex items-center justify-between'])}>
            Shipping Information{' '}
            <Link
              prefetch={false}
              href="/profile/address"
              className="flex items-center text-sm text-primary"
            >
              Edit <PenIcon className="ml-2" />
            </Link>
          </h2>
          <ul
            className={classcat([
              '[&_p]:text-body3 [&_p]:text-text-60 [&_span]:text-body3  [&_span]:text-text-30',
              '[&_li:not(:last-child)]:mb-2 [&_li]:grid [&_li]:grid-cols-[108px_1fr]',
            ])}
          >
            <li>
              <span>Country Name:</span>
              <p className="text-right">
                {Country.getCountryByCode(defaultDataAddress.country)?.name}
              </p>
            </li>
            <li>
              <span>State:</span>
              <p className="text-right">
                {
                  State.getStateByCodeAndCountry(
                    defaultDataAddress.state,
                    defaultDataAddress.country,
                  )?.name
                }
              </p>
            </li>
            <li>
              <span>Street Address:</span>
              <p className="text-right">{defaultDataAddress.street}</p>
            </li>
          </ul>
        </div>
      ) : null}
    </section>
  );
}
