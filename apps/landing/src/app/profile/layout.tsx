//RELATIVE MODULES
import ProfileNav from './comps/ProfileNav';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <ProfileNav />
      <div className="grow p-[--px] lg:p-10">{children}</div>
    </main>
  );
}
