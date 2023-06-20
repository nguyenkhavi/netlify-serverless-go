//LAYOUT, COMPONENTS
import Banner from './components/Banner';
import NavBar from './components/NavBar';
import Projects from './components/Projects';
import WhatIsLive from './components/WhatIsLive';
import LaunchVenture from './components/LaunchVenture';
//RELATIVE MODULES
import HomeAdvHorizontal from '../comps/HomeAdvHorizontal';

export default function VenturePage() {
  return (
    <main>
      <NavBar />
      <Banner />
      <div className="px-[--px]">
        <HomeAdvHorizontal />
      </div>
      <Projects />
      <WhatIsLive />
      <div className="hidden px-[--px] xl:block">
        <HomeAdvHorizontal />
      </div>
      <LaunchVenture />
      <div className="mt-10 px-[--px] xl:hidden">
        <HomeAdvHorizontal />
      </div>
    </main>
  );
}
