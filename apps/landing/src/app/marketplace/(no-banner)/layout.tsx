//RELATIVE MODULES
import Search from '../comps/Search';

export default function WithoutBannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Search />
      {children}
    </main>
  );
}
