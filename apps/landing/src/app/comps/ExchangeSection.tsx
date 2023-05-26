//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import DecentralizedExchangeIcon from '_@shared/icons/DecentralizedExchangeIcon';

export default function ExchangeSection() {
  return (
    <section
      id="exchange"
      className={classcat([
        'grid justify-items-center',
        'xlg:px-20 xl:relative xl:justify-items-start xl:py-[67px]',
      ])}
    >
      <div
        className={classcat([
          'h-auto w-[200px]',
          'xl:absolute xl:bottom-1/2 xl:translate-y-1/2',
          'xl:left-0 xl:w-[327px] 2xl:left-[145px]',
        ])}
      >
        <DecentralizedExchangeIcon
          data-sal="zoom-in"
          data-sal-duration="800"
          data-sal-delay="300"
          className="h-full w-full"
        />
      </div>

      <div
        className={classcat([
          'mt-10 grid w-full justify-items-center',
          'xl:ml-auto xl:mt-0 xl:max-w-[590px] xl:justify-items-start',
        ])}
      >
        <div
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay="500"
          className="text-center text-h4 xl:text-left xl:text-h2"
        >
          Trade Crypto Assets with Trust and Security in Our Decentralized Exchange
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
          Effortlessly trade a wide range of crypto assets with trust and security using our
          non-custodial, decentralized exchange platform, Dex. With decentralized governance and
          cross-chain interoperability, our cutting-edge solution provides a seamless and advanced
          way to trade in the Web 3.0 era.
        </div>

        <Button
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay="100"
          as={Link}
          href="/exchange"
          className="btnlg mt-7 ow:w-62.5 xl:mt-10"
        >
          Try Dex
        </Button>
      </div>
    </section>
  );
}
