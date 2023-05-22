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
      <DecentralizedExchangeIcon
        className={classcat([
          'h-auto w-[200px]',
          'xl:absolute xl:bottom-1/2 xl:translate-y-1/2',
          'xl:left-0 xl:w-[327px] 2xl:left-[145px]',
        ])}
      />

      <div
        className={classcat([
          'mt-10 grid w-full justify-items-center',
          'xl:ml-auto xl:mt-0 xl:max-w-[590px] xl:justify-items-start',
        ])}
      >
        <div
          className={classcat([
            'text-center text-[24px] font-semibold leading-[36px]',
            'xl:text-left xl:text-[40px] xl:leading-[50px]',
          ])}
        >
          Trade Crypto Assets with Trust and Security in Our Decentralized Exchange
        </div>

        <div
          className={classcat([
            'mt-5 text-center text-[18px] font-light leading-[36px] text-white/60',
            'xl:text-left xl:text-[20px] xl:leading-[40px]',
          ])}
        >
          Effortlessly trade a wide range of crypto assets with trust and security using our
          non-custodial, decentralized exchange platform, Dex. With decentralized governance and
          cross-chain interoperability, our cutting-edge solution provides a seamless and advanced
          way to trade in the Web 3.0 era.
        </div>

        <Button
          as={Link}
          href="/exchange"
          className={classcat([
            '[&>span]:text-[18px] [&>span]:font-semibold [&>span]:leading-[19.58px]',
            'mt-[18px] h-[70px] ow:w-[260px]',
            'xl:mt-[38px]',
          ])}
        >
          Try Dex
        </Button>
      </div>
    </section>
  );
}
