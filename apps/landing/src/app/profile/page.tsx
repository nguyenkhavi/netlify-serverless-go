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
import { ProfileInfoDetail } from './comps/ProfileInfoDetail';

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      <ProfileNavMobile title={isEdit ? 'Profile Edit' : 'Profile View'} />
      <Show when={!isEdit}>
        <VerifyInfo />
        <ProfileBanner />
        <ProfileInfoDetail />
      </Show>

      <Show when={isEdit}>
        <ProfileEdit setIsEdit={setIsEdit} />
      </Show>

      <Show when={!isEdit}>
        <div className="mt-5 flex justify-center lg:justify-end">
          <Button className="btnsm w-max lg:btnmd" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        </div>
      </Show>
    </div>
  );
};

export default Profile;
