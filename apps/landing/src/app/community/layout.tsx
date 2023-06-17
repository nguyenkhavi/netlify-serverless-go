//RELATIVE MODULES
import CommunityNav from './comps/CommunityNav';

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[17.5rem_1fr] gap-6 px-15 py-10">
      <div>
        <CommunityNav />
      </div>
      <div>{children}</div>
    </div>
  );
}
