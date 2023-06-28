'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import Chart from 'chart.js/auto';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChartDataset, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getUserPortfolio } from '_@landing/services/owner';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//SHARED
import EyeFilledIcon from '_@shared/icons/EyeFilledIcon';
//RELATIVE MODULES
import ProfileNavMobile from '../comps/ProfileNavMobile';

export type PieChartData = {
  labels: string[];
  datasets: ChartDataset[];
};

const colors = ['#27312E', '#68B158', '#19CA9B', '#F2A43A', '#B70FF2', '#FFC700'];

export default function MyPortfolioPage() {
  const { db } = useIndexedDBContext();
  const { user } = useAuthStore();

  const { data: userPortfolio } = useQuery({
    enabled: !!db && !!user?.profile.wallet,
    queryKey: ['getUserPortfolio', db, user?.profile.wallet],
    queryFn: async () => {
      if (!db || !user?.profile.wallet) return undefined;
      return getUserPortfolio(db, '0xcf9f977eBa70E819EAf6eD5eE8E2EF6860c0D646');
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const data = useMemo(() => {
    if (!userPortfolio) return undefined;
    return {
      labels: userPortfolio?.data?.map((collection) => collection.name),
      datasets: [
        {
          borderWidth: 0,
          data: userPortfolio?.data?.map((collection) => collection.percent),
          backgroundColor: colors,
        },
      ],
    };
  }, [userPortfolio]);

  useEffect(() => {
    if (!userPortfolio || !data) return;
    const portfolioChartCtx = document.getElementById('portfolio-chart') as HTMLCanvasElement;
    new Chart(portfolioChartCtx, {
      type: 'doughnut',
      data: data,
      plugins: [ChartDataLabels],
      options: {
        aspectRatio: 1.3,
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
  }, [data, userPortfolio]);

  return (
    <>
      <ProfileNavMobile title="My Portfolio" isBorder={false} />
      <h2 className="pt-6 text-h4 lg:pt-0 lg:text-h3">My Portfolio distribution</h2>
      <div
        className={classcat([
          'mt-5 p-6 lg:mt-4 lg:p-10',
          'flex flex-col items-center lg:flex-row lg:justify-between',
          'rounded-[10px] border border-text-50',
        ])}
      >
        <div className="flex flex-col items-center lg:items-start">
          <p className="flex items-center text-h5 text-text-50">
            Total Balance(FLM) <EyeFilledIcon className="ml-2" />
          </p>
          <p className="my-1 text-h3">{0}</p>
          <div className="flex items-center text-h5 text-text-50">
            <div className="mr-2 flex flex-col leading-none">
              <span className="flex h-2.5 place-items-center">~</span>
              <span className="flex h-2.5 place-items-center">~</span>
            </div>
            <p>{`$${userPortfolio?.total || 0}`}</p>
            {/* <Popover>
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
            </Popover> */}
          </div>
        </div>
        <div className="my-10 lg:my-0">
          <canvas id="portfolio-chart"></canvas>
        </div>
        <div className="mt-9 grid gap-6">
          {userPortfolio?.data?.map((label, i) => (
            <div key={i} className="flex items-center">
              <span
                className={classcat(['mr-2 h-6 w-6 shrink-0 rounded-full'])}
                style={{ backgroundColor: colors[i] }}
              ></span>
              <p className="text-h5">{label.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Comment for info popover
// const itemListClasses = [
//   '[&>span]:text-body2 [&>span]:text-text-50 [&>span]:w-31 [&>span]:mr-6',
//   'flex',
// ];
