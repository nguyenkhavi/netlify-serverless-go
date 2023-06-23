//THIRD PARTY MODULES
import classcat from 'classcat';
import 'stream-chat-react/dist/css/v2/index.css';
//SHARED
import LoadingIcon from '_@shared/icons/LoadingIcon';
//RELATIVE MODULES

function Loading() {
  return (
    <div className={classcat(['flex h-full items-center justify-center py-10'])}>
      <LoadingIcon className="animate-spin" />
    </div>
  );
}

export default Loading;
