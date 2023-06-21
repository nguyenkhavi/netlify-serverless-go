//RELATIVE MODULES
import MainRight from './comps/MainRight';
import CommunityNav from './comps/CommunityNav';

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-10 md:px-8 lg:grid-cols-[17.5rem_1fr_17.5rem] lg:px-15">
      <div className="hidden lg:block">
        <CommunityNav />
      </div>
      <div className="">{children}</div>
      <div className="hidden lg:block">
        <MainRight />
      </div>
    </div>
  );
}
