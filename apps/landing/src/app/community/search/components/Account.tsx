//THIRD PARTY MODULES
import classcat from 'classcat';
import { useMemo, useState } from 'react';
import { api } from '_@landing/utils/api';
import { Avatar } from 'react-activity-feed';
import { getstreamStore } from '_@landing/stores/getstreamStore';
//RELATIVE MODULES
import { DEFAULT_AVATAR } from '../../constants/constants';

type AccountProps = {
  name: string;
  getstreamId: string;
  aboutMe: string | null;
  avatar: string | null;
  following: boolean;
};

export default function Account({ name, aboutMe, avatar, following, getstreamId }: AccountProps) {
  const { feedClient } = getstreamStore();
  const [follow, setFollow] = useState(following);

  const timelineFeed = useMemo(() => feedClient?.feed('timeline'), [feedClient]);

  const avtUrl = avatar ?? DEFAULT_AVATAR;

  const followUser = () => {
    if (!timelineFeed) return;

    api.communityFollowUser.mutate({ targetGetstreamId: getstreamId }).then((data) => {
      if (data.success) {
        setFollow(true);
      }
    });
  };

  const unfollowUser = () => {
    if (!timelineFeed) return;

    api.communityUnfollowUser.mutate({ targetGetstreamId: getstreamId }).then((data) => {
      if (data.success) {
        setFollow(false);
      }
    });
  };

  const toggleFollow = (follow: boolean) => () => {
    if (follow) return unfollowUser();
    return followUser();
  };

  return (
    <div className="mb-6 flex items-start border-b-[1px] border-solid border-text-10 pb-8">
      <Avatar image={avtUrl} size={46} circle className="mr-2 rounded-full" />
      <div className="flex grow flex-col justify-between md:flex-row">
        <div className=" mb-8 w-[273px] md:mb-0">
          <p className="mb-2 text-lg">@{name}</p>
          <p className="text-sm text-text-50">{aboutMe ?? ''}</p>
        </div>
        <button
          className={classcat([
            'border-green-gradient relative z-[1] mr-auto h-fit rounded-full px-[33.5px] py-[9.5px] text-body1 font-bold md:ml-auto md:mr-0',
          ])}
        >
          <span onClick={toggleFollow(follow)} className="text-gradient-pr">
            {follow ? 'Following' : 'Follow'}
          </span>
        </button>
      </div>
    </div>
  );
}
