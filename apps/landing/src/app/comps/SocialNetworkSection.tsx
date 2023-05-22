//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import DecentralizedSocialNetworkIcon from '_@shared/icons/DecentralizedSocialNetworkIcon';

export default function SocialNetworkSection() {
  return (
    <section
      id="social-network"
      className={classcat([
        'grid justify-items-center',
        'xlg:px-20 xl:relative xl:justify-items-start xl:py-[51px]',
      ])}
    >
      <DecentralizedSocialNetworkIcon
        className={classcat([
          'h-auto w-[200px]',
          'xl:absolute xl:bottom-1/2 xl:translate-y-1/2',
          'xl:right-0 xl:w-[392px] 2xl:right-[189px]',
        ])}
      />

      <div
        className={classcat([
          'mt-10 grid w-full justify-items-center',
          'xl:mt-0 xl:max-w-[585px] xl:justify-items-start',
        ])}
      >
        <div
          className={classcat([
            'text-center text-[24px] font-semibold leading-[36px]',
            'xl:text-left xl:text-[40px] xl:leading-[50px]',
          ])}
        >
          Connect and Communicate in Our Decentralized Social Network
        </div>

        <div
          className={classcat([
            'mt-5 text-center text-[18px] font-light leading-[36px] text-white/60',
            'xl:text-left xl:text-[20px] xl:leading-[40px]',
          ])}
        >
          Uniquely connect with others in the web3 ecosystem, share ideas, and collaborate on
          projects using our censorship-resistant, decentralized Socials platform. With
          decentralized identity management and NFT integration, our platform offers a powerful and
          innovative way to interact with others in the decentralized web.
        </div>

        <Button
          as={Link}
          href="/social-network"
          className={classcat([
            '[&>span]:text-[18px] [&>span]:font-semibold [&>span]:leading-[19.58px]',
            'mt-[18px] h-[70px] ow:w-[321px]',
            'xl:mt-[38px]',
          ])}
        >
          Join Everyone In Our Community
        </Button>
      </div>
    </section>
  );
}
