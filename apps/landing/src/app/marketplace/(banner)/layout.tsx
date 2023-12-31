//RELATIVE MODULES
import Banner from '../comps/Banner';
import Search from '../comps/Search';

export default function WithBannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Search />
      <Banner />
      {children}
    </main>
  );
}
