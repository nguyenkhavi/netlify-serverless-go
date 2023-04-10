import Banner from './comps/Banner'
import FAQ from './comps/FAQ'
import Membership from './comps/Membership'
import OurPartner from './comps/OurPartner'
import PreSZN from './comps/PreSZN'
import Roadmap from './comps/Roadmap'
import StartJourney from './comps/StartJourney'
import WhatIsSZNOne from './comps/WhatIsSZNOne'

export default function Home() {
  return (
    <main className="relative before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-[url('/images/background-footer-light.png')] before:bg-top before:bg-repeat before:opacity-20 before:mix-blend-overlay">
      <Banner />
      <OurPartner />
      <WhatIsSZNOne />
      <PreSZN />
      <Membership />
      <Roadmap />
      <FAQ />
      <StartJourney />
    </main>
  )
}
