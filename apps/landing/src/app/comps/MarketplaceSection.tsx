//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import DecentralizedCartIcon from '_@shared/icons/DecentralizedCartIcon';

export default function MarketplaceSection() {
  return (
    <section
      id="marketplace"
      className={classcat([
        'grid justify-items-center',
        'xlg:px-20 xl:relative xl:justify-items-start xl:py-[76px]',
      ])}
    >
      <DecentralizedCartIcon
        className={classcat([
          'h-auto w-[300px]',
          'xl:absolute xl:bottom-1/2 xl:translate-y-1/2',
          'xl:right-0 xl:w-[395px] 2xl:right-[130px]',
        ])}
      />

      <div
        className={classcat([
          'mt-10 grid w-full justify-items-center',
          'xl:mt-0 xl:max-w-[623px] xl:justify-items-start',
        ])}
      >
        <div
          className={classcat([
            'max-w-[296px] sm:max-w-none',
            'text-center text-[24px] font-semibold leading-[36px]',
            'xl:text-left xl:text-[40px] xl:leading-[50px]',
          ])}
        >
          Buy and Sell Digital Assets in Our Decentralized Marketplace
        </div>

        <div
          className={classcat([
            'mt-5 text-center text-[18px] font-light leading-[36px] text-white/60',
            'xl:text-left xl:text-[20px] xl:leading-[40px]',
          ])}
        >
          Experience the power of NFTs like never before and empower yourself with our peer-to-peer,
          decentralized Marketplace platform. Our platform offers a seamless and secure way for you
          to buy and sell NFTs, featuring decentralized escrow and integration with multiple
          blockchain networks to ensure reliability and security in every transaction.
        </div>

        <Button
          as={Link}
          href="/marketplace"
          className={classcat([
            '[&>span]:text-[18px] [&>span]:font-semibold [&>span]:leading-[19.58px]',
            'mt-[18px] h-[70px] ow:w-[260px]',
            'xl:mt-[38px]',
          ])}
        >
          Enter Marketplace
        </Button>
      </div>
    </section>
  );
}
