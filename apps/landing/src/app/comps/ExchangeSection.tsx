//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import DecentralizedExchangeIcon from '_@shared/icons/DecentralizedExchangeIcon';

export default function ExchangeSection() {
  return (
    <section id="exchange" className={classcat(['items-center xl:flex'])}>
      <div className={classcat(['grid grow place-items-center'])}>
        <DecentralizedExchangeIcon
          data-sal="zoom-in"
          data-sal-duration="800"
          data-sal-delay="300"
          className="h-[196px] w-[196px] xl:h-[393px] xl:w-[393px]"
        />
      </div>

      <div
        className={classcat([
          'mt-10 grid w-full justify-items-center',
          'xl:ml-auto xl:mt-0 xl:max-w-[724px] xl:justify-items-start',
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
            'mt-6 text-center text-body1 text-text-60',
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
          className="btnlg mt-10 lg:ow:w-62.5"
        >
          Try Dex
        </Button>
      </div>
    </section>
  );
}
