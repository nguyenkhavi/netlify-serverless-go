//THIRD PARTY MODULES
import classcat from 'classcat';

export default function WelcomeSection() {
  return (
    <section
      id="welcome"
      className={classcat([
        'px-6.5 pb-9 pt-[67px]',
        'rounded-[20px] border border-[#2E2E2E]',
        'bg-welcome-mobile bg-cover bg-center bg-no-repeat',
        'xlg:h-[793px] xlg:px-10 xlg:py-0',
        'xlg:grid xlg:place-items-center xlg:bg-welcome-desktop',
      ])}
    >
      <div className="grid gap-2.5 xlg:max-w-[1049px] xlg:gap-1">
        <div
          className={classcat([
            'grid justify-items-center text-[40px] font-semibold leading-[46px]',
            'sm:auto-cols-max sm:grid-flow-col sm:justify-center sm:justify-items-start sm:gap-2',
            'xlg:text-[60px] xlg:leading-[65px]',
          ])}
        >
          <span>Welcome to</span>
          <span className="font-extrabold text-primary">Fleamint!</span>
        </div>

        <div
          className={classcat([
            'text-center text-[18px] leading-[32px] text-white/80',
            'xlg:text-[24px] xlg:leading-[36px] xlg:text-white',
          ])}
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
