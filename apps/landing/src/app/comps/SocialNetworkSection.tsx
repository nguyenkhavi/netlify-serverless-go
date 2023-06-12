//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import DecentralizedSocialNetworkIcon from '_@shared/icons/DecentralizedSocialNetworkIcon';

export default function SocialNetworkSection() {
  return (
    <section id="social-network" className={classcat(['items-center xl:flex'])}>
      <div className={classcat(['grid grow place-items-center xl:order-2'])}>
        <DecentralizedSocialNetworkIcon
          data-sal="zoom-in"
          data-sal-duration="800"
          data-sal-delay="300"
          className="ow:h-[193px] ow:w-[192px] xl:h-[382px] xl:w-[385px]"
        />
      </div>

      <div
        className={classcat([
          'mt-10 grid w-full justify-items-center',
          'xl:mt-0 xl:max-w-[724px] xl:justify-items-start',
        ])}
      >
        <div
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay="500"
          className="text-center text-h4 xl:text-left xl:text-h2"
        >
          Connect and Communicate in Our Decentralized Social Network
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
          Uniquely connect with others in the web3 ecosystem, share ideas, and collaborate on
          projects using our censorship-resistant, decentralized Socials platform. With
          decentralized identity management and NFT integration, our platform offers a powerful and
          innovative way to interact with others in the decentralized web.
        </div>

        <Button
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay="100"
          as={Link}
          href="/social-network"
          className="btnlg mt-7.5 ow:w-62.5 xl:mt-10 [&>span]:tracking-[-.1px]"
        >
          Join our community
        </Button>
      </div>
    </section>
  );
}
