//THIRD PARTY MODULES
import classcat from 'classcat';
import { StreamClient } from 'getstream';
import { StreamType } from '_@rpc/services/getstream/type';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import Switch from '_@shared/components/conditions/Switch';
//HOOK
import { useCheckFollowUser } from '_@landing/hooks/useCheckFollowUser';

const classBtnNotFollow = classcat([
  'ow:border-text-30 ow:bg-text-30 ow:text-primary-700',
  'ow:disabled:bg-text-30 ow:disabled:text-primary-700',
  'hover:border-text-30 hover:bg-text-30 ow:hover:text-primary-700',
]);

function FollowStatus({ id, client }: { client?: StreamClient<StreamType>; id?: string }) {
  const { followed, loading } = useCheckFollowUser(client, id);

  const onFollowUser = () => {
    console.log('🚀 ~ followUser ~ followUser:');
  };

  const onUnFollowUser = () => {
    console.log('🚀 ~ unFollowUser ~ unFollowUser:');
  };

  return (
    <Switch.Root>
      <Switch.Case when={followed}>
        <Button
          onClick={onUnFollowUser}
          isLoading={loading}
          className={classcat(['ow:h-10 ow:w-29.25 ow:rounded-[theme(spacing.10)]'])}
        >
          Following
        </Button>
      </Switch.Case>
      <Switch.Case when={!followed}>
        <Button
          onClick={onFollowUser}
          isLoading={loading}
          className={classcat([
            'ow:h-10 ow:w-29.25 ow:rounded-[theme(spacing.10)]',
            classBtnNotFollow,
          ])}
        >
          Follow
        </Button>
      </Switch.Case>
    </Switch.Root>
  );
}

export default FollowStatus;
