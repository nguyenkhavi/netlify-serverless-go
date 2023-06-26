//THIRD PARTY MODULES
import classcat from 'classcat';
import { UserResponse } from 'stream-chat';
import { Combobox } from '@headlessui/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Avatar, useChatContext } from 'stream-chat-react';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { createRequestChannel1vs1 } from '_@landing/utils/roomChat1vs1';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import { Modal } from '_@shared/components/dialog/Modal';
//SHARED
import { debounce } from '_@shared/utils/func';
import CheckIcon from '_@shared/icons/CheckIcon';
import SearchIcon from '_@shared/icons/SearchIcon';
import ChevronLeftIcon from '_@shared/icons/ChevronLeftIcon';
//RELATIVE MODULES
import './popup.css';
import Loading from '../Loading';
import { useModalContext } from '../../context/ModalProvider';

type Props = {
  onSuccess: () => void;
};

type UserState = {
  data: UserResponse<DefaultStreamChatGenerics>[];
  isLoading: boolean;
  lastId: string;
  isHaveMore: boolean;
  query: string;
};

const defaultUserState = {
  data: [],
  isLoading: false,
  lastId: '',
  isHaveMore: true,
  query: '',
};

function AddChatModal({ onSuccess }: Props) {
  const { openAddChat, setOpenAddChat } = useModalContext();
  const [value, setValue] = useState<string | undefined>(undefined);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [userState, setUserState] = useState<UserState>(defaultUserState);
  const { user } = useAuthStore();
  const { client, setActiveChannel } = useChatContext();

  const onChange = (value: string) => {
    setValue(value);
  };

  const onScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, offsetHeight } = e.currentTarget;
    if (!userState.isLoading && scrollTop + offsetHeight >= scrollHeight && userState.isHaveMore) {
      setUserState((prev) => ({ ...prev, lastId: prev.data?.[prev.data.length - 1]?.id }));
    }
  };

  const onClose = () => {
    setOpenAddChat(false);
    setUserState(defaultUserState);
    setValue('');
  };

  const onCreateChat = () => {
    if (!value || !user?.profile.getstreamId) return;
    if (value === user.profile.getstreamId) return;
    setIsCreating(true);
    createRequestChannel1vs1(client, user.profile.getstreamId, value)
      .then((result) => {
        if (result) {
          setActiveChannel(result);
          onSuccess();
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsCreating(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _fetchData = useCallback(
    debounce((open: boolean, query: string, lastId: string, userGetstreamId = '') => {
      if (!open) return;
      setUserState((prev) => ({ ...prev, isLoading: true, data: [] }));
      client
        .queryUsers(
          {
            ...(query
              ? {
                  name: {
                    $autocomplete: query,
                  },
                }
              : {}),
            id: {
              $nin: [userGetstreamId],
            },
          },
          {},
          //stupid type
          {
            limit: 100,
            ...(lastId ? { id_lt: lastId } : {}),
          } as any,
        )
        .then((rp) => {
          setUserState((prev) => ({
            ...prev,
            data: [...prev.data, ...rp.users],
            isHaveMore: rp.users.length > 0,
          }));
        })
        .catch((error) => console.log(error))
        .finally(() => setUserState((prev) => ({ ...prev, isLoading: false })));
    }, 500),
    [],
  );

  useEffect(() => {
    _fetchData(openAddChat, userState.query, userState.lastId, user?.profile.getstreamId);
  }, [_fetchData, openAddChat, user?.profile.getstreamId, userState.lastId, userState.query]);

  return (
    <Modal.Root open={openAddChat}>
      <Modal.Overlay className="fixed inset-0 z-overlay bg-secondary-200 opacity-60" />
      <Modal.Content
        className={classcat([
          'rounded-lg border border-solid border-text-30 bg-secondary will-change-[transform,opacity]',
          'w-90 md:w-150',
          'fixed left-1/2 top-1/2 z-toast -translate-x-1/2 -translate-y-1/2',
        ])}
      >
        <div className="flex flex-col">
          <div
            className={classcat([
              'grid grid-flow-col items-center justify-between gap-2 border-b border-text-10 p-4 md:p-6',
            ])}
          >
            <div className={classcat(['grid grid-flow-col items-center justify-start gap-2'])}>
              <button onClick={onClose}>
                <ChevronLeftIcon />
              </button>
              <p className={classcat(['text-h6 text-primary-700'])}>New message</p>
            </div>
            <Button
              isLoading={isCreating}
              onClick={onCreateChat}
              className={classcat([
                'border-none bg-secondary-300 md:btnmd ow:w-[100px] ow:rounded-[theme(spacing[7.5])] ow:md:w-[138px] [&>span]:text-primary-700',
              ])}
            >
              Next
            </Button>
          </div>
          <div className={classcat(['grid grid-flow-row gap-4 md:gap-6'])}>
            <Combobox value={value} onChange={onChange}>
              {() => (
                <Fragment>
                  <div className="px-4 pt-4 md:px-6 md:pt-6">
                    <div
                      className={classcat([
                        'grid grid-flow-col grid-cols-[theme(spacing[6])_1fr] items-center gap-2 px-4 py-5',
                        'rounded-[theme(spacing[2])] border-none bg-secondary-200',
                      ])}
                    >
                      <SearchIcon className="h-6 w-6 text-primary-700 [&>g]:opacity-100" />
                      <Combobox.Input
                        className={classcat([
                          'bg-transparent text-body1 text-text-50 placeholder:text-text-20 focus:outline-none',
                        ])}
                        autoComplete="off"
                        onChange={(event) =>
                          setUserState((prev) => ({
                            ...prev,
                            ...defaultUserState,
                            data: prev.data,
                            query: event.target.value,
                          }))
                        }
                        placeholder="Search"
                        displayValue={() => ''}
                      />
                    </div>
                  </div>
                  <ScrollArea.Root
                    type="auto"
                    className="h-auto max-h-48 min-h-[theme(spacing[18.5])] w-full px-6 pb-6"
                  >
                    <ScrollArea.Viewport className="h-full overflow-auto" onScroll={onScroll}>
                      <Combobox.Options className="grid grid-flow-row gap-6" static>
                        {userState.data.map((item) => {
                          return (
                            <Combobox.Option as="div" key={item.id + item.name} value={item.id}>
                              {({ selected }) => (
                                <div
                                  className={classcat([
                                    'grid cursor-pointer grid-flow-col items-center justify-between gap-2',
                                  ])}
                                >
                                  <div
                                    className={classcat([
                                      'grid grid-flow-col items-center justify-start gap-2',
                                    ])}
                                  >
                                    <Avatar
                                      name={item.name}
                                      image={item.image}
                                      size={40}
                                      shape="circle"
                                    />
                                    <span
                                      className={classcat(['truncate text-body2 text-primary-700'])}
                                    >
                                      {item.name}
                                    </span>
                                  </div>
                                  {selected ? (
                                    <CheckIcon className={classcat(['h-6 w-6'])} />
                                  ) : (
                                    <div className="w-6" />
                                  )}
                                </div>
                              )}
                            </Combobox.Option>
                          );
                        })}
                      </Combobox.Options>
                      <Show when={userState.isLoading}>
                        <Loading />
                      </Show>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar className=" w-2 bg-secondary-400" orientation="vertical">
                      <ScrollArea.Thumb className="w-2 rounded-[theme(spacing[7.5])] bg-text-20" />
                    </ScrollArea.Scrollbar>
                  </ScrollArea.Root>
                </Fragment>
              )}
            </Combobox>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}

export default AddChatModal;
