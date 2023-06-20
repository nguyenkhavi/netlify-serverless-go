//THIRD PARTY MODULES
import classcat from 'classcat';
//SHARED
import NoDataIcon from '_@shared/icons/NoDataIcon';

export default function NoData({ className }: { className?: string }) {
  return (
    <div className={classcat(['grid justify-center gap-15 px-[--px] md:gap-18', className])}>
      <NoDataIcon />
      <p className="text-center text-h3">No data available</p>
    </div>
  );
}
