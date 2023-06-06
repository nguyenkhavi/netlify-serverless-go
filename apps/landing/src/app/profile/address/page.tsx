'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useRouter } from 'next/navigation';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//RELATIVE MODULES
import ProfileNavMobile from '../comps/ProfileNavMobile';

export default function ProfileAddress() {
  const router = useRouter();

  const _goToCreate = () => {
    router.push('/profile/address/create');
  };
  return (
    <div>
      <ProfileNavMobile title={'Address(2)'} />
      <div
        className={classcat([
          'flex items-center',
          'py-7 lg:pb-5 lg:pt-0',
          'lg:border-b lg:border-text-10',
        ])}
      >
        <p className="hidden text-h4 lg:block">Address(2)</p>
        <Button className="btnsm ml-auto w-max lg:btnlg" onClick={_goToCreate}>
          Add new Address
        </Button>
      </div>
    </div>
  );
}
