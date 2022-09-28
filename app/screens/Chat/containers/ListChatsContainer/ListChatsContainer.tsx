import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PAGE_SIZE } from '@Constants/index';
import { fetchListMessages } from '@Services/index';
import { getCurrentGroupIdSelector } from '@Stores/groups';
import { messagesActions, getMessagesForGroupSelector } from '@Stores/messages';
import { userDataSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { SendAndDisplayMessageContainer } from '../SendAndDisplayMessageContainer';

export const ListChatsContainer = () => {
  const dispatch = useDispatch();

  const [shouldFetchMessage, setShouldFetchMessage] = useState(false);

  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const { accessToken } = useSelector(userDataSelector);
  const groupMessages = useSelector(getMessagesForGroupSelector);

  const { data } = useQuery(
    ['getListMessages', accessToken, currentGroupId],
    () =>
      fetchListMessages({
        token: accessToken,
        pageNumber: 1,
        pageSize: PAGE_SIZE,
        groupId: currentGroupId,
      }),
    { enabled: shouldFetchMessage },
  );

  useEffect(() => {
    if (data && currentGroupId) {
      dispatch(
        messagesActions.setMessages({
          count: data.count,
          list: data.list,
          groupId: currentGroupId,
        }),
      );
    }
  }, [currentGroupId, data, dispatch]);

  useEffect(() => {
    setShouldFetchMessage(!groupMessages);
  }, [groupMessages]);

  return <SendAndDisplayMessageContainer messages={groupMessages?.messages} />;
};
