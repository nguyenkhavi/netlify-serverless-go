//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import DecentralizedFinanceVenturesIcon from '_@shared/icons/DecentralizedFinanceVenturesIcon';

export default function FinanceVenturesSection() {
  return (
    <section id="finance-ventures" className={classcat(['items-center xl:flex'])}>
      <div className={classcat(['grid grow place-items-center'])}>
        <DecentralizedFinanceVenturesIcon
          data-sal="zoom-in"
          data-sal-duration="800"
          data-sal-delay="300"
          className="ow:h-[219px] ow:w-[219px] xl:h-[422px] xl:w-[422px]"
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
          Transform your financial future with our Web3-era Decentralized Finance Ventures.
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
          Empower yourself as an entrepreneur or innovator in the web3 space with our Ventures
          platform, which enables you to launch your projects using community-driven funding and
          DeFi integration. Our platform offers a unique opportunity to tokenize your assets, create
          your own governance structure, and connect with a global network of like-minded
          individuals who share your vision for the future of the decentralized web.
        </div>

        <Button
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay="100"
          as={Link}
          href="/finance-ventures"
          className="btnlg mt-10 lg:ow:w-62.5"
        >
          Go to ventures
        </Button>
      </div>
    </section>
  );
}
