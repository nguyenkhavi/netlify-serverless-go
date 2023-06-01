//RELATIVE MODULES
import Search from '../comps/Search';

export default function WithoutBannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Search />
      {children}
    </div>
  );
}
