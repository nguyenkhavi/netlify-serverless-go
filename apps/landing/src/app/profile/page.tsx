'use client';

//THIRD PARTY MODULES
import { useState } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
//RELATIVE MODULES
import VerifyInfo from './comps/VerifyInfo';
import ProfileEdit from './comps/ProfileEdit';
import ProfileBanner from './comps/ProfileBanner';
import ProfileNavMobile from './comps/ProfileNavMobile';
import ProfileInfoDetail from './comps/ProfileInfoDetail';

export default function Page() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <ProfileNavMobile
        className="mb-6"
        title={isEdit ? 'Profile Edit' : 'Profile View'}
        isBorder={false}
      />

      <Show when={!isEdit}>
        <VerifyInfo />
        <div className="md:rounded-b-lg md:bg-secondary-200">
          <ProfileBanner />
          <ProfileInfoDetail />
        </div>
      </Show>

      <Show when={isEdit}>
        <ProfileEdit setIsEdit={setIsEdit} />
      </Show>

      <Show when={!isEdit}>
        <div className="mt-6 flex justify-center sm:justify-end lg:mt-8">
          <Button className="sm:btnmd sm:w-fit" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        </div>
      </Show>
    </div>
  );
}
