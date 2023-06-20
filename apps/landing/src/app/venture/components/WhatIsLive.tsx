//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';

export default function WhatIsLive() {
  return (
    <section className={classcat(['my-10 px-[--px]'])}>
      <h2 className={classcat(['relative w-max text-h4 xlg:text-h3', dotClasses])}>What is live</h2>
      <TableWhatIsLive />
      <div className="mt-5 grid gap-5 md:hidden">
        {dataWhatIsLive.map((item) => (
          <WhatIsLiveCard key={item.id} value={item} />
        ))}
      </div>
    </section>
  );
}

function WhatIsLiveCard({ value }: { value: TWhatIsLiveCard }) {
  return (
    <div className="rounded bg-secondary-200 px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="grid grid-cols-[auto_1fr] items-center justify-start gap-2">
          <img
            className="h-8 w-8 overflow-hidden rounded-full object-cover"
            src={value.image || ''}
            alt=""
          />
          <span>{value.token}</span>
        </p>
        <div className="grid place-items-center items-start gap-1">
          <span className="block text-subtitle2 text-text-60">EST.APR</span>
          <p>{value.estApr}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <span className="block text-subtitle2 text-text-60">Duration(day)</span>
          <div className="mt-1 grid grid-flow-col gap-3">
            {value.duration.map((item, index) => (
              <p
                key={index}
                className="grid h-10 w-10 place-items-center rounded border-[0.5px] border-primary/[.69]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="grid place-items-center items-start gap-1">
          <span className="block text-subtitle2 text-text-60">Join Us</span>
          <p>{`${value.prices} ${value.token}`}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="grid items-start gap-1">
          <span className="block text-subtitle2 text-text-60">Minimum Buy-in Amount</span>
          <p>{`${value.prices} ${value.token}`}</p>
        </div>
        <Button className="btnsm w-max ow:px-6.75">Participate</Button>
      </div>
    </div>
  );
}

function TableWhatIsLive() {
  return (
    <table className="mt-6 hidden w-full md:table">
      <thead>
        <tr className={classcat([headerTableClasses])}>
          <th className="text-left">Token</th>
          <th>EST.APR</th>
          <th>Duration(day)</th>
          <th>Minimum Buy-in Amount</th>
          <th>Join Us</th>
        </tr>
      </thead>
      <tbody>
        {dataWhatIsLive.map((item) => (
          <tr key={item.id} className={classcat([cellClasses])}>
            <td>
              <div className="flex items-center">
                <img
                  className="mr-2 h-8 w-8 overflow-hidden rounded-full object-cover"
                  src={item.image || ''}
                  alt=""
                />
                <span>{item.token}</span>
              </div>
            </td>
            <td className="text-center text-body3 text-primary">{item.estApr}</td>
            <td>
              <div className="flex justify-center">
                {item.duration.map((item, index) => (
                  <p
                    key={index}
                    className={classcat([
                      'not-first:ml-2 place-items-center rounded',
                      'grid h-10 w-10 border-[0.5px] border-primary/[.69] text-btnmd',
                    ])}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </td>
            <td className="text-center">
              <p className="text-text-70">{`${item.prices} ${item.token}`}</p>{' '}
            </td>
            <td>
              <div className="flex justify-center">
                <Button className="btnsm w-max ow:px-6.75">Participate</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type TWhatIsLiveCard = {
  id: number;
  image: string;
  token: string;
  estApr: string;
  duration: number[];
  prices: string;
};
const dotClasses = [
  'after:absolute after:-right-1 after:top-0 after:rounded-full after:translate-x-full',
  'after:h-2.5 after:w-2.5 after:bg-[#08EA55] xlg:after:bg-[#33B469]',
  'xlg:after:h-3.75 xlg:after:w-3.75',
];
const headerTableClasses = ['[&>th]:py-5.5 [&>th]:px-6 [&>th]:text-subtitle1 [&>th]:bg-[#1A1A1A]'];
const cellClasses = ['[&>td]:py-5.75 [&>td]:px-6 bg-secondary-200'];

const dataWhatIsLive: TWhatIsLiveCard[] = [
  {
    id: 1,
    image: '/images/venture/ethereum.png',
    token: 'FLM',
    estApr: '1.4%',
    duration: [30],
    prices: '0.001',
  },
  {
    id: 2,
    image: '/images/venture/volvo.png',
    token: 'VOLVO',
    estApr: '1.4%',
    duration: [30],
    prices: '0.001',
  },
  {
    id: 3,
    image: '/images/venture/benz.png',
    token: 'BENZ',
    estApr: '1.4%',
    duration: [30],
    prices: '0.001',
  },
  {
    id: 4,
    image: '/images/venture/henry.png',
    token: 'HENNY',
    estApr: '1.4%',
    duration: [30],
    prices: '0.001',
  },
  {
    id: 5,
    image: '/images/venture/DYDX.png',
    token: 'DYDX',
    estApr: '1.4%',
    duration: [30, 120],
    prices: '0.001',
  },
];
