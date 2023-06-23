//THIRD PARTY MODULES
import classcat from 'classcat';
import * as Tabs from '@radix-ui/react-tabs';
import { useChatContext } from 'stream-chat-react';
import React, { Dispatch, SetStateAction } from 'react';
//SHARED
import SearchIcon from '_@shared/icons/SearchIcon';
import AddChatIcon from '_@shared/icons/AddChatIcon';
import SettingIcon from '_@shared/icons/SettingIcon';
//RELATIVE MODULES
import AddChatModal from './modal/AddChatModal';
import ChatSettingModal from './modal/ChatSettingModal';
import { useModalContext } from '../context/ModalProvider';
import { TAB_INBOX, TAB_MESSAGES } from '../constants/constant';

type Props = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  onCreateChat: () => void;
};

function CustomSearchBar({ search, setSearch, tab, setTab, onCreateChat }: Props) {
  const { setActiveChannel } = useChatContext();
  const { setOpenSetting, setOpenAddChat } = useModalContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onChangeTab = (value: string) => {
    setTab(value);
    setActiveChannel(undefined);
  };

  const onCreateChatSuccess = () => {
    setTab(TAB_INBOX);
    onCreateChat();
  };

  return (
    <div className={classcat(['grid grid-flow-row'])}>
      <div
        className={classcat([
          'grid grid-flow-col grid-cols-[1fr_theme(spacing[17])] gap-6 border-b border-solid border-text-10 bg-secondary-200 p-4',
          'md:gap-10 md:px-6',
        ])}
      >
        <div
          className={classcat([
            'grid grid-flow-col grid-cols-[theme(spacing[6])_1fr] items-center gap-2 p-2',
            'rounded-[theme(spacing[2])] border-none bg-black/70 ',
            'md:px-4',
          ])}
        >
          <SearchIcon className="h-6 w-6 text-primary-700 [&>g]:opacity-100" />
          <input
            placeholder="Search"
            className={classcat([
              'w-full bg-transparent text-body1 text-text-50 placeholder:text-text-20 focus:outline-none',
            ])}
            value={search}
            onChange={onChange}
          />
        </div>
        <div className={classcat(['grid grid-flow-col justify-end gap-5'])}>
          <button onClick={() => setOpenSetting(true)}>
            <SettingIcon />
          </button>
          <button onClick={() => setOpenAddChat(true)}>
            <AddChatIcon />
          </button>
        </div>
      </div>
      <Tabs.Root
        className="border-b border-solid border-text-10 bg-secondary-200 px-4 pt-3 md:p-0"
        defaultValue="inbox"
        orientation="vertical"
        value={tab}
        onValueChange={onChangeTab}
      >
        <Tabs.List aria-label="tabs message">
          {TAB_MESSAGES.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              className={classcat([
                'px-4 pb-2 text-body3 text-text-50 md:px-6 md:py-3 md:text-h5 ',
                'data-[state=active]:text-gradient-pr data-[state=active]:text-subtitle2 md:data-[state=active]:text-h5-bold',
                'border-solid data-[state=active]:border-b-[3px] data-[state=active]:border-primary-200',
              ])}
              value={tab.value}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
      <AddChatModal onSuccess={onCreateChatSuccess} />
      <ChatSettingModal />
    </div>
  );
}

export default CustomSearchBar;
