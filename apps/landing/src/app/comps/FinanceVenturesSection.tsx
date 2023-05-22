//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import DecentralizedFinanceVenturesIcon from '_@shared/icons/DecentralizedFinanceVenturesIcon';

export default function FinanceVenturesSection() {
  return (
    <section
      id="finance-ventures"
      className={classcat([
        'grid justify-items-center',
        'xlg:px-20 xl:relative xl:justify-items-start xl:py-[34px]',
      ])}
    >
      <DecentralizedFinanceVenturesIcon
        className={classcat([
          'h-auto w-[200px]',
          'xl:absolute xl:bottom-1/2 xl:translate-y-1/2',
          'xl:left-0 xl:w-[327px] 2xl:left-[145px]',
        ])}
      />

      <div
        className={classcat([
          'mt-10 grid w-full justify-items-center',
          'xl:ml-auto xl:mt-0 xl:max-w-[548px] xl:justify-items-start',
        ])}
      >
        <div
          className={classcat([
            'text-center text-[24px] font-semibold leading-[36px]',
            'xl:text-left xl:text-[40px] xl:leading-[50px]',
          ])}
        >
          Transform your financial future with our Web3-era Decentralized Finance Ventures.
        </div>

        <div
          className={classcat([
            'mt-5 text-center text-[18px] font-light leading-[36px] text-white/60',
            'xl:text-left xl:text-[20px] xl:leading-[40px]',
          ])}
        >
          Empower yourself as an entrepreneur or innovator in the web3 space with our Ventures
          platform, which enables you to launch your projects using community-driven funding and
          DeFi integration. Our platform offers a unique opportunity to tokenize your assets, create
          your own governance structure, and connect with a global network of like-minded
          individuals who share your vision for the future of the decentralized web.
        </div>

        <Button
          as={Link}
          href="/finance-ventures"
          className={classcat([
            '[&>span]:text-[18px] [&>span]:font-semibold [&>span]:leading-[19.58px]',
            'mt-[18px] h-[70px] ow:w-[260px]',
            'xl:mt-[38px]',
          ])}
        >
          Go To Ventures
        </Button>
      </div>
    </section>
  );
}
