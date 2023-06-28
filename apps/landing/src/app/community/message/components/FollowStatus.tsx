//THIRD PARTY MODULES
import classcat from 'classcat';
import { nextApi } from '_@landing/utils/api';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import Switch from '_@shared/components/conditions/Switch';
//HOOK

const classBtnNotFollow = classcat([
  'ow:border-text-30 ow:bg-text-30 ow:text-primary-700',
  'ow:disabled:bg-text-30 ow:disabled:text-primary-700',
  'hover:border-text-30 hover:bg-text-30 ow:hover:text-primary-700',
]);

function FollowStatus({ id }: { id: string }) {
  const { data, isFetching, isLoading, refetch } =
    nextApi.communityGetFollowingEachOtherInfo.useQuery(
      {
        targetGetstreamId: id,
      },
      {
        refetchOnWindowFocus: false,
      },
    );

  const { mutate: followUser, isLoading: isFollowing } = nextApi.communityFollowUser.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: unFollowUser, isLoading: isUnFollowing } =
    nextApi.communityUnfollowUser.useMutation({
      onSuccess: () => {
        refetch();
      },
    });

  const onFollowUser = () => {
    followUser({ targetGetstreamId: id });
  };

  const onUnFollowUser = () => {
    unFollowUser({ targetGetstreamId: id });
  };

  return (
    <Switch.Root>
      <Switch.Case when={data?.following}>
        <Button
          onClick={onUnFollowUser}
          isLoading={isLoading || isFetching || isUnFollowing}
          className={classcat(['ow:h-10 ow:w-29.25 ow:rounded-[theme(spacing.10)]'])}
        >
          Following
        </Button>
      </Switch.Case>
      <Switch.Case when={!data?.following}>
        <Button
          onClick={onFollowUser}
          isLoading={isLoading || isFetching || isFollowing}
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
