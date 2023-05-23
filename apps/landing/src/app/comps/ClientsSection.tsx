//THIRD PARTY MODULES
import classcat from 'classcat';
//SHARED
import Client1Icon from '_@shared/icons/Client1Icon';
import Client2Icon from '_@shared/icons/Client2Icon';
import Client3Icon from '_@shared/icons/Client3Icon';
import Client4Icon from '_@shared/icons/Client4Icon';

const clientSquareClasses = [
  'grid place-items-center',
  'aspect-square w-[76.84px] rounded-[5.48864px] bg-[#0E0E0E]',
  'xlg:w-[140px] xlg:rounded-[10px]',
];

const CLIENT_LIST = [
  {
    id: 'client-1',
    icon: <Client1Icon className="h-auto w-[42.81px] xlg:w-[78px]" />,
  },
  {
    id: 'client-2',
    icon: <Client2Icon className="h-auto w-[31.29px] xlg:w-[57px]" />,
  },
  {
    id: 'client-3',
    icon: <Client3Icon className="h-auto w-[36.77px] xlg:w-[67px]" />,
  },
  {
    id: 'client-4',
    icon: <Client4Icon className="h-auto w-[37.87px] xlg:w-[69px]" />,
  },
  {
    id: 'client-5',
    icon: <Client1Icon className="h-auto w-[42.81px] xlg:w-[78px]" />,
  },
];

export default function ClientsSection() {
  return (
    <section id="clients" className="mx-[calc(-1*var(--px))]">
      <div className="grid justify-items-center">
        <div
          className={classcat([
            'relative text-[24px] font-bold leading-[36px]',
            'before:absolute before:left-0 before:top-[calc(100%-2px)]',
            'before:h-0.5 before:w-full before:rounded-full before:bg-primary',
            'xlg:text-[32px] xlg:leading-[48px] xlg:before:top-[calc(100%-4px)] xlg:before:h-1',
          ])}
        >
          Our Clients
        </div>
      </div>

      <div
        className={classcat([
          'hidden',
          'xsm:mx-auto xsm:mt-7.5 xsm:grid xsm:w-fit xsm:auto-cols-max xsm:grid-flow-col xsm:gap-7',
          'xlg:mt-[66px] xlg:gap-10 xl:gap-25',
        ])}
      >
        {CLIENT_LIST.map((client) => (
          <div key={client.id} className={classcat(clientSquareClasses)}>
            {client.icon}
          </div>
        ))}
      </div>

      <div className="mt-7.5 grid w-fit max-w-[100vw] auto-cols-max grid-flow-col overflow-hidden xsm:hidden">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={classcat([
                'grid w-fit auto-cols-max grid-flow-col',
                'animate-slide-left gap-7 pr-7',
              ])}
            >
              {CLIENT_LIST.map((client) => (
                <div key={client.id} className={classcat(clientSquareClasses)}>
                  {client.icon}
                </div>
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}
