'use client';

//RELATIVE MODULES
import VerifyInfo from './comps/VerifyInfo';
import ProfileBanner from './comps/ProfileBanner';
import ProfileNavMobile from './comps/ProfileNavMobile';
import { ProfileInfoDetail } from './comps/ProfileInfoDetail';

const Profile = () => {
  return (
    <div>
      <ProfileNavMobile title="Profile View" />
      <VerifyInfo />
      <ProfileBanner />
      <ProfileInfoDetail />
    </div>
  );
};

export default Profile;
