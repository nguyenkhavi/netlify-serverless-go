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
        'grid justify-items-center py-3',
        'xlg:px-20 xl:relative xl:justify-items-start xl:py-16',
      ])}
    >
      <div
        className={classcat([
          'h-auto w-[225px]',
          'xl:absolute xl:bottom-1/2 xl:translate-y-1/2',
          'xl:right-0 xl:w-[360px] 2xl:right-[130px]',
        ])}
      >
        <DecentralizedCartIcon
          data-sal="zoom-in"
          data-sal-duration="800"
          data-sal-delay="300"
          className="h-full w-full"
        />
      </div>

      <div
        className={classcat([
          'mt-10 grid w-full justify-items-center',
          'xl:mt-0 xl:max-w-[623px] xl:justify-items-start',
        ])}
      >
        <div
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay="500"
          className="text-center text-h4 xl:text-left xl:text-h2"
        >
          Buy and Sell Digital Assets in Our Decentralized Marketplace
        </div>

        <div
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay="300"
          className={classcat([
            'mt-5 text-center text-body1 text-text-60',
            'xl:text-left xl:text-h5',
          ])}
        >
          Experience the power of NFTs like never before and empower yourself with our peer-to-peer,
          decentralized Marketplace platform. Our platform offers a seamless and secure way for you
          to buy and sell NFTs, featuring decentralized escrow and integration with multiple
          blockchain networks to ensure reliability and security in every transaction.
        </div>

        <Button
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay="100"
          as={Link}
          href="/marketplace"
          className="btnlg mt-7.5 ow:w-62.5 xl:mt-10"
        >
          Enter Marketplace
        </Button>
      </div>
    </section>
  );
}
