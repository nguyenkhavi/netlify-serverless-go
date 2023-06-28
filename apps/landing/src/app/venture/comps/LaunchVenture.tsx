//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import DecentralizedFinanceVenturesIcon from '_@shared/icons/DecentralizedFinanceVenturesIcon';

export default function LaunchVenture() {
  return (
    <section
      className={classcat([
        'mx-auto w-[--content-width] items-center xl:mt-10 xl:flex',
        'border border-text-20 p-6 xl:rounded-[10px]',
      ])}
    >
      <div className={classcat(['grid grow place-items-center xl:order-2'])}>
        <DecentralizedFinanceVenturesIcon className="ow:h-[219px] ow:w-[219px] xl:h-[422px] xl:w-[422px]" />
      </div>

      <div
        className={classcat([
          'mt-10 grid w-full justify-items-center xl:order-1',
          'xl:ml-auto xl:mt-0 xl:max-w-[724px] xl:justify-items-start',
        ])}
      >
        <p className="text-center text-h4 xl:text-left xl:text-h2">
          Launch your Venture on fleamint now!
        </p>

        <div
          className={classcat([
            'mt-6 text-center text-body1 text-text-60',
            'xl:text-left xl:text-h5',
          ])}
        >
          Fleamint Ventures is a launchpad offering comprehensive support and guidance to project
          teams in token issuance and launch. Our full-service offering encompasses advisory
          services, from pre-token issuance to post-listing, as well as marketing support. Our
          primary objective is to empower project teams to concentrate on product development while
          we handle marketing, exposure, and building the initial user base. We actively seek out
          projects with strong teams, a distinctive and innovative vision within both web2 and web3
          space. If you believe your project fits this description, apply below!.
        </div>

        <Button as={Link} href="#" className="btnlg mt-10 lg:ow:w-62.5">
          Launch your venture
        </Button>
      </div>
    </section>
  );
}
