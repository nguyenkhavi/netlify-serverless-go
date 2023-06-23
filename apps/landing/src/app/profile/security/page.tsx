//RELATIVE MODULES
import CloseAccount from './comps/CloseAccount';
import ActiveSection from './comps/ActiveSection';
import AccountActivity from './comps/AccountActivity';
import ProfileNavMobile from '../comps/ProfileNavMobile';
import AuthenticationSettingPage from './comps/AuthenticationSettingPage';

export default function SecurityPage() {
  return (
    <>
      <ProfileNavMobile title="Security" isBorder={false} />
      <div className="grid gap-6 lg:gap-10">
        <AuthenticationSettingPage />
        <ActiveSection />
        <AccountActivity />
        <CloseAccount />
      </div>
    </>
  );
}
