import { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchListMessages } from 'services';
import { messagesActions } from 'stores/messages';

import { PAGE_SIZE } from '@Constants/index';
import { getGroupsSelector } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { userDataSelector } from '@Stores/user';
import { useQueries } from '@tanstack/react-query';

import { GroupContainer } from '../GroupContainer';

export const ListGroupsContainer = () => {
  const dispatch = useAppDispatch();

  const { accessToken } = useSelector(userDataSelector);
  const groups = useSelector(getGroupsSelector);

  const results = useQueries({
    queries: Object.values(groups).map((group) => ({
      queryKey: [group._id],
      queryFn: () =>
        fetchListMessages({
          token: accessToken,
          pageNumber: 1,
          pageSize: PAGE_SIZE,
          groupId: group._id,
        }),
    })),
  });

  useEffect(() => {
    results.map((result) => {
      if (result.data) {
        dispatch(
          messagesActions.setMessages({
            count: result.data.count,
            list: result.data.list,
            groupId: result.data.groupId,
          }),
        );
      }
    });
  }, [dispatch, results]);

  return (
    <View>
      {Object.values(groups).map((group) => (
        <GroupContainer group={group} key={group._id} />
      ))}
    </View>
  );
};
