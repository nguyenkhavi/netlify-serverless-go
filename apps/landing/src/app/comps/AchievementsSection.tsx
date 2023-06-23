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
        'mb-22 px-6 py-4 xl:mb-20',
        'lg:py-12.5',
      ])}
    >
      <div
        className={classcat([
          'grid justify-items-center gap-4',
          'xlg:justify-items-stretch xlg:gap-8',
        ])}
      >
        <div
          className={classcat([
            'grid justify-items-center gap-1',
            'xlg:justify-items-stretch xlg:gap-1',
          ])}
        >
          <div className="text-h4 xl:text-h3">Achievements</div>
          <div className="text-center text-body2 text-text-50 xlg:text-left xl:text-h6">
            We onboarded over $500 million worth of goods onto our marketplaces
          </div>
        </div>

        <div
          className={classcat([
            'grid justify-items-center gap-4',
            'xlg:auto-cols-max xlg:grid-flow-col xlg:gap-37.5',
          ])}
        >
          {ACHIEVEMENT_LIST.map(({ title, value }) => (
            <div
              key={title}
              className={classcat([
                'grid justify-items-center gap-1',
                'xlg:justify-items-stretch xlg:gap-3.75',
              ])}
            >
              <div className="text-h4 xl:text-h3">{value}</div>
              <div className="text-subtitle2 text-text-50 xl:text-subtitle1">{title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
