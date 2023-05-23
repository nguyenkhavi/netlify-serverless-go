//THIRD PARTY MODULES
import classcat from 'classcat';

const ACHIEVEMENT_LIST = [
  {
    title: 'Total Volume',
    value: '$500 Million',
  },
  {
    title: 'Projects',
    value: '67',
  },
  {
    title: 'Global Partners',
    value: '10+',
  },
  {
    title: 'Total Users',
    value: '830,071',
  },
];

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className={classcat([
        'rounded-[10px] border-[.5px] border-white/[.22] bg-achievement',
        'px-[27.5px] py-[43px]',
        'xlg:px-[53px] xlg:pb-[58px] xlg:pt-[28px]',
      ])}
    >
      <div
        className={classcat([
          'grid justify-items-center gap-12.5',
          'xlg:justify-items-stretch xlg:gap-11.5',
        ])}
      >
        <div
          className={classcat([
            'grid justify-items-center gap-1.25',
            'xlg:justify-items-stretch xlg:gap-1',
          ])}
        >
          <div
            className={classcat([
              'text-[24px] font-bold leading-[36px]',
              'xl:text-[32px] xl:leading-[48px]',
            ])}
          >
            Achievements
          </div>
          <div
            className={classcat([
              'text-center font-medium text-white/50',
              'xlg:text-left',
              'xl:text-[18px] xl:leading-[28px]',
            ])}
          >
            We onboarded over $500 million worth of goods onto our marketplaces
          </div>
        </div>

        <div
          className={classcat([
            'grid justify-items-center gap-10',
            'xlg:auto-cols-max xlg:grid-flow-col xlg:gap-32.5',
          ])}
        >
          {ACHIEVEMENT_LIST.map(({ title, value }) => (
            <div
              key={title}
              className={classcat([
                'grid justify-items-center gap-1.25',
                'xlg:justify-items-stretch xlg:gap-3.75',
              ])}
            >
              <div
                className={classcat([
                  'text-[24px] font-bold leading-[36px]',
                  'xl:text-[32px] xl:leading-[48px]',
                ])}
              >
                {value}
              </div>
              <div
                className={classcat([
                  'font-semibold text-white/50',
                  'xl:text-[15px] xl:leading-[20px]',
                ])}
              >
                {title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
