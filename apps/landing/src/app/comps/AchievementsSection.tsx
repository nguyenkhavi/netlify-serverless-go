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
        'xlg:px-13.25 xlg:pb-14.5 xlg:pt-7',
      ])}
    >
      <div
        className={classcat([
          'grid justify-items-center gap-10',
          'xlg:justify-items-stretch xlg:gap-11.5',
        ])}
      >
        <div
          className={classcat([
            'grid justify-items-center gap-1.25',
            'xlg:justify-items-stretch xlg:gap-1',
          ])}
        >
          <div className="xl:text-3 text-h4">Achievements</div>
          <div className="text-center text-body2 text-text-50 xlg:text-left xl:text-h6">
            We onboarded over $500 million worth of goods onto our marketplaces
          </div>
        </div>

        <div
          className={classcat([
            'grid justify-items-center gap-10',
            'xlg:auto-cols-max xlg:grid-flow-col xlg:gap-37.5',
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
              <div className="xl:text-3 text-h4">{value}</div>
              <div className="text-subtitle2 text-text-50 xl:text-subtitle1">{title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
