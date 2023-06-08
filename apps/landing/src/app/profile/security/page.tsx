//RELATIVE MODULES
import CloseAccount from './comps/CloseAccount';
import ActiveSection from './comps/ActiveSection';
import ChangePassword from './comps/ChangePassword';
import AccountActivity from './comps/AccountActivity';
import ProfileNavMobile from '../comps/ProfileNavMobile';
import AuthenticationSettingPage from './comps/AuthenticationSettingPage';

export default function SecurityPage() {
  return (
    <>
      <ProfileNavMobile title="Security" />
      <div className="grid gap-6.25">
        <ChangePassword />
        <AuthenticationSettingPage />
        <ActiveSection />
        <AccountActivity />
        <CloseAccount />
      </div>
    </>
  );
}
