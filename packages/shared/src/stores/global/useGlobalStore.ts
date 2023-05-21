//THIRD PARTY MODULES
import { create } from 'zustand';
//SHARED
import { SessionWithActivitiesResource } from '_@shared/stores/global/type';

type State = {
  userSessions: SessionWithActivitiesResource[];
};

type Action = {
  setUserSessions: (userSessions: SessionWithActivitiesResource[]) => void;
};

export const useGlobalStore = create<State & Action>((set) => ({
  userSessions: [],
  user: null,
  setUserSessions: (userSessions) => {
    set({ userSessions });
  },
}));
