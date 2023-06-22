'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
//HOOK
import useSal from '_@landing/hooks/useSal';

export default function WelcomeSection() {
  useSal();

  return (
    <section
      id="welcome"
      className={classcat([
        'mb-10.5 px-4 py-6.75 xl:mb-4',
        'rounded-[20px] border border-[#2E2E2E]',
        'bg-welcome-mobile bg-cover bg-center bg-no-repeat',
        'xlg:h-[793px] xlg:px-10 xlg:py-0',
        'xlg:grid xlg:place-items-center xlg:bg-welcome-desktop',
      ])}
    >
      <div className="grid gap-6 xlg:max-w-[1208px]">
        <div
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay="100"
          className={classcat([
            'grid justify-items-center text-h2 xlg:text-h1',
            'sm:auto-cols-max sm:grid-flow-col sm:justify-center sm:justify-items-start sm:gap-2',
          ])}
        >
          <span>Welcome to</span>
          <span className="text-primary">Fleamint!</span>
        </div>

        <div
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay="500"
          className="text-center text-h6 text-text-80 xlg:text-h5"
        >
          Join Fleamint's dynamic NFT ecosystem! Explore our DEX for seamless swapping, Ventures for
          lucrative project staking, our thriving community for social interactions, and an NFT
          marketplace to buy and sell unique digital and real-world assets. Revolutionize your
          ownership experience in the decentralized web and proudly showcase your diverse
          collections!
        </div>
      </div>
    </section>
  );
}
