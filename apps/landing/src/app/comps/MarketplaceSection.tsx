//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import DecentralizedCartIcon from '_@shared/icons/DecentralizedCartIcon';

export default function MarketplaceSection() {
  return (
    <section id="marketplace" className={classcat(['items-center xl:flex'])}>
      <div className={classcat(['grid grow place-items-center xl:order-2'])}>
        <DecentralizedCartIcon
          data-sal="zoom-in"
          data-sal-duration="800"
          data-sal-delay="300"
          className="ow:h-[168px] ow:w-[169px] xl:h-[336px] xl:w-[337px]"
        />
      </div>

      <div
        className={classcat([
          'mt-10 grid w-full justify-items-center xl:order-1',
          'xl:mt-0 xl:max-w-[724px] xl:justify-items-start',
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
            'mt-6 text-center text-body1 text-text-60',
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
          className="btnlg mt-10 lg:ow:w-62.5"
        >
          Enter Marketplace
        </Button>
      </div>
    </section>
  );
}
