'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
//LAYOUT, COMPONENTS
import Wrapper from './components/Wrapper';
import Show from '_@shared/components/Show';
import MenuMobile from './components/MenuMobile';
import CustomHeader from './components/CustomHeader';
import RequestAbout from './components/RequestAbout';
import CustomChannel from './components/CustomChannel';
import BlockModal from './components/modal/BlockModal';
import DeleteModal from './components/modal/DeleteModal';
import ReportModal from './components/modal/ReportModal';
import CustomSearchBar from './components/CustomSearchBar';
import CustomChannelList from './components/CustomChannelList';
//HOOK
import useWindowSize from '_@landing/hooks/useWindowSize';
import useDebounceValue from '_@landing/hooks/useDebounceValue';
import { useGetStreamUser } from '_@landing/hooks/useGetStreamUser';
//RELATIVE MODULES
import './style.css';
import ModalContextProvider from './context/ModalProvider';
import { TAB_INBOX, TAB_REQUEST } from './constants/constant';
//HOOK

export default function CommunityPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<string>(TAB_INBOX);
  const [refreshList, setRefreshList] = useState<number>(1);
  const [refreshChannel, setRefreshChannel] = useState<number>(1);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showChannel, setShowChannel] = useState<boolean>(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const debounceSearch = useDebounceValue(search, 500);
  const searchParams = useSearchParams();
  const channelId = searchParams.get('channelId');

  const { client } = useGetStreamUser();
  const isRequest = useMemo(() => tab === TAB_REQUEST, [tab]);

  const onRefreshListChannel = () => {
    setRefreshList((prev) => prev + 1);
  };

  const onAcceptChat = () => {
    setTab(TAB_INBOX);
    setRefreshChannel((prev) => prev + 1);
  };

  const onShowChannel = () => {
    if (width < 768) {
      setShowChat(false);
      setShowChannel(true);
    }
  };

  const onShowChat = () => {
    if (width < 768) {
      setShowChat(true);
      setShowChannel(false);
    }
  };

  const onCreateChat = () => {
    onShowChat();
    onRefreshListChannel();
  };

  const onRejectChat = () => {
    onShowChannel();
    onRefreshListChannel();
  };

  useEffect(() => {
    const checkShowChat = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        setShowChat(true);
        setShowChannel(true);
      } else {
        setShowChat(!!channelId);
        setShowChannel(!channelId);
      }
    };
    checkShowChat();
    window.addEventListener('resize', checkShowChat);
    return () => window.removeEventListener('resize', checkShowChat);
  }, [channelId]);

  useEffect(() => {
    if (showChat && typeof window !== 'undefined')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  }, [showChat]);

  if (!client || !client.userID) return null;

  return (
    <ModalContextProvider>
      <Chat client={client}>
        <div className={classcat(['-m-4 grid grid-cols-1', 'md:m-0 md:grid-cols-[2fr_3fr]'])}>
          <div
            className={classcat([
              'flex flex-col overflow-hidden md:border-r md:border-solid md:border-text-10',
            ])}
          >
            <MenuMobile />
            <Show when={showChannel}>
              <CustomSearchBar
                search={search}
                setSearch={setSearch}
                tab={tab}
                setTab={setTab}
                onCreateChat={onCreateChat}
              />
              <CustomChannelList
                refresh={refreshList.toString()}
                isRequest={isRequest}
                search={debounceSearch}
                onSelectChannel={onShowChat}
              />
            </Show>
          </div>
          <Show when={showChat}>
            <div ref={chatRef} id={tab}>
              <CustomChannel
                refreshChannel={refreshChannel}
                onAcceptChat={onAcceptChat}
                onRejectChat={onRejectChat}
                isRequest={isRequest}
              >
                <Window>
                  <CustomHeader onShowChannel={onShowChannel} />
                  <Wrapper show={isRequest}>
                    <Show when={isRequest}>
                      <RequestAbout />
                    </Show>
                    <MessageList />
                  </Wrapper>
                  <MessageInput />
                  <BlockModal />
                  <DeleteModal />
                  <ReportModal />
                </Window>
                <Thread />
              </CustomChannel>
            </div>
          </Show>
        </div>
      </Chat>
    </ModalContextProvider>
  );
}
