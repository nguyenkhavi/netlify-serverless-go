'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { ChartDataset, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
//LAYOUT, COMPONENTS
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import EyeFilledIcon from '_@shared/icons/EyeFilledIcon';
import InfoFilledIcon from '_@shared/icons/InfoFilledIcon';
//RELATIVE MODULES
import ProfileNavMobile from '../comps/ProfileNavMobile';

export type PieChartData = {
  labels: string[];
  datasets: ChartDataset[];
};

const colors = ['#27312E', '#68B158', '#19CA9B', '#F2A43A', '#B70FF2', '#FFC700'];

export default function MyPortfolioPage() {
  const [data, setData] = useState<PieChartData>({
    labels: Object.keys(MOCK_DATA),
    datasets: [
      {
        borderWidth: 0,
        data: Object.values(MOCK_DATA),
        backgroundColor: colors,
      },
    ],
  });
  useEffect(() => {
    const portfolioChartCtx = document.getElementById('portfolio-chart') as HTMLCanvasElement;
    new Chart(portfolioChartCtx, {
      type: 'doughnut',
      data: data,
      plugins: [ChartDataLabels],
      options: {
        aspectRatio: 1,
        plugins: {
          legend: { display: false },
          datalabels: {
            color: '#8B8E92',
            anchor: 'end',
            clamp: true,
            offset: 5,
            align: 'end',
            formatter(value, _) {
              return `${value}%`;
            },
          },
        },
        layout: {
          padding: 24,
        },
        cutout: '60%',
      } as ChartOptions,
    });
  }, [data]);
  return (
    <>
      <ProfileNavMobile title="My Portfolio" />
      <h2 className="pt-6 text-h4 lg:pt-0 lg:text-h3">My Portfolio distribution</h2>
      <div
        className={classcat([
          'mt-3 px-10 pb-6 pt-9 lg:mt-5 lg:p-10',
          'flex flex-col items-center lg:flex-row lg:justify-evenly',
          'rounded-[10px] border border-text-50',
        ])}
      >
        <div className="grid place-items-center lg:place-items-start">
          <p className="flex items-center text-h5 text-text-50">
            Total Balance(FLM) <EyeFilledIcon className="ml-2" />
          </p>
          <p className="text-h3">0.0123432</p>
          <div className="flex items-center text-h5 text-text-50">
            <div className="mr-2 flex flex-col leading-none">
              <span className="flex h-2.5 place-items-center">~</span>
              <span className="flex h-2.5 place-items-center">~</span>
            </div>
            <p>$2,3123.24</p>
            <Popover>
              <PopoverTrigger>
                <InfoFilledIcon className="ml-2" />
              </PopoverTrigger>
              <PopoverContent className="rounded-[10px] p-10 ow:border-primary">
                <p className="mb-4 text-center text-h6">Summary:</p>
                <ul className="grid gap-2.5">
                  <li className={classcat([itemListClasses])}>
                    <span>Next payout</span>
                    <p>18/03/2023</p>
                  </li>
                  <li className={classcat([itemListClasses])}>
                    <span>Date invested</span>
                    <p>13/03/2023</p>
                  </li>
                  <li className={classcat([itemListClasses])}>
                    <span>Amount invested</span>
                    <p>$2345</p>
                  </li>
                  <li className={classcat([itemListClasses])}>
                    <span>Duration of lock</span>
                    <p>6 Month</p>
                  </li>
                  <li className={classcat([itemListClasses])}>
                    <span>Pay out due.</span>
                    <p>13/03/2023</p>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-8 h-60 w-60">
          <canvas id="portfolio-chart"></canvas>
        </div>
        <div className="mt-9 grid gap-2.5 lg:gap-5">
          {Object.keys(MOCK_DATA).map((label, i) => (
            <div key={i} className="flex items-center">
              <span
                className={classcat(['mr-3 h-5 w-5 rounded-full lg:h-7.5 lg:w-7.5'])}
                style={{ backgroundColor: colors[i] }}
              ></span>
              <p className="text-h6 lg:text-h5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const itemListClasses = [
  '[&>span]:text-body2 [&>span]:text-text-50 [&>span]:w-31 [&>span]:mr-6',
  'flex',
];

const MOCK_DATA = {
  Volvo: 30,
  'Mint Main': 20,
  Jones: 20,
  'Albert and wand': 40,
  Zanotti: 10,
  ZanottiB: 10,
};
