//THIRD PARTY MODULES
import classcat from 'classcat';
//SHARED
import LoadingIcon from '_@shared/icons/LoadingIcon';
//RELATIVE MODULES

function Loading() {
  return (
    <div className={classcat(['flex h-full items-center justify-center py-2'])}>
      <LoadingIcon className="animate-spin" />
    </div>
  );
}

export default Loading;
