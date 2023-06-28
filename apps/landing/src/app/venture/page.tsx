//RELATIVE MODULES
import Banner from './comps/Banner';
import NavBar from './comps/NavBar';
import Projects from './comps/Projects';
import WhatIsLive from './comps/WhatIsLive';
import LaunchVenture from './comps/LaunchVenture';
import HomeAdvHorizontal from '../comps/HomeAdvHorizontal';

export default function VenturePage() {
  return (
    <main className="pb-10 xlg:pb-24">
      <NavBar />
      {/* @ts-expect-error Server Component */}
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
