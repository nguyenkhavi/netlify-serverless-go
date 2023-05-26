//THIRD PARTY MODULES
import classcat from 'classcat';
//RELATIVE MODULES
import HomeAdvVertical from './HomeAdvVertical';

const partnerSquareClasses = [
  'grid place-items-center',
  'aspect-square w-[103.82px] rounded-[7.41538px] bg-[#0E0E0E]',
  '[&>img]:w-[91.95px] [&>img]:h-auto',
  'xlg:w-[140px] xlg:rounded-[10px] xlg:[&>img]:w-[124px]',
];

const PARTNER_LIST = [
  {
    id: 'partner-1',
    src: '/images/home/partner-1.webp',
  },
  {
    id: 'partner-2',
    src: '/images/home/partner-2.webp',
  },
  {
    id: 'partner-3',
    src: '/images/home/partner-3.webp',
  },
  {
    id: 'partner-4',
    src: '/images/home/partner-4.webp',
  },
  {
    id: 'partner-5',
    src: '/images/home/partner-5.webp',
  },
  {
    id: 'partner-6',
    src: '/images/home/partner-6.webp',
  },
  {
    id: 'partner-7',
    src: '/images/home/partner-7.webp',
  },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="mx-[calc(-1*var(--px))] 2xl:relative 2xl:mx-0">
      <HomeAdvVertical className="left-0" />
      <HomeAdvVertical className="right-0" />

      <div className="grid justify-items-center">
        <div
          className={classcat([
            'relative text-h4',
            'before:absolute before:left-0 before:top-[calc(100%-2px)]',
            'before:h-0.5 before:w-full before:rounded-full before:bg-primary',
            'xlg:text-h3 xlg:before:top-[calc(100%-4px)] xlg:before:h-1',
          ])}
        >
          Our Partners
        </div>
      </div>

      <div
        className={classcat([
          'hidden xlg:grid',
          'mx-auto mt-[59px] w-fit justify-items-center gap-25',
        ])}
      >
        <div className="grid auto-cols-max grid-flow-col gap-25">
          {PARTNER_LIST.map((partner, index) => {
            if (index > 3) return null;
            return (
              <div key={partner.id} className={classcat(partnerSquareClasses)}>
                <img src={partner.src} alt={partner.id} />
              </div>
            );
          })}
        </div>
        <div className="grid auto-cols-max grid-flow-col gap-25">
          {PARTNER_LIST.map((partner, index) => {
            if (index <= 3) return null;
            return (
              <div key={partner.id} className={classcat(partnerSquareClasses)}>
                <img src={partner.src} alt={partner.id} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-7.5 grid w-fit max-w-[100vw] auto-cols-max grid-flow-col overflow-hidden xlg:hidden">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={classcat([
                'grid w-fit auto-cols-max grid-flow-col',
                'animate-slide-right gap-7 pl-7',
              ])}
            >
              {PARTNER_LIST.map((partner) => (
                <div key={partner.id} className={classcat(partnerSquareClasses)}>
                  <img src={partner.src} alt={partner.id} />
                </div>
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}
