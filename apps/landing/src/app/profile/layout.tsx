//RELATIVE MODULES
import ProfileNav from './comps/ProfileNav';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <ProfileNav />
      <div className="max-w-full grow px-4 pb-6 pt-4 lg:pb-14 lg:pl-6 lg:pr-15 lg:pt-6">
        {children}
      </div>
    </main>
  );
}
