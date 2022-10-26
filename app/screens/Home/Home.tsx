import { map } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useContext, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { PAGE_SIZE, SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { fetchListGroups, fetchNumberOfUnReadMessages } from '@Services/index';
import { getGroupsSelector, groupsActions } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { userIdSelector, userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { styles } from './HomeStyles';
import { Header } from './components';
import { EmptyListOfGroups } from './components/EmptyListOfGroups';
import { ErrorGetList } from './components/ErrorGetList';
import { ListGroupsContainer } from './containers/ListGroupsContainer/ListGroupsContainer';

export const HomeScreen = () => {
  const token = useSelector(userTokenSelector);
  const userId = useSelector(userIdSelector);
  const groups = useSelector(getGroupsSelector);
  const dispatch = useAppDispatch();
  const socket = useContext(WebSocketContext);

  const {
    data: listGroups,
    isFetching,
    error,
  } = useQuery(['getListGroups', token], () =>
    // TODO: PAGINATION HERE
    fetchListGroups({ token, pageNumber: 1, pageSize: PAGE_SIZE }),
  );

  const { data: unReadMessages } = useQuery(
    ['getNumberOfUnReadMessages', token, listGroups],
    () => fetchNumberOfUnReadMessages({ token, groupIds: map(listGroups?.list, '_id') }),
    { enabled: !!listGroups?.count },
  );

  const renderComponent = () => {
    if (isFetching || (!!listGroups?.list.length && isEmpty(groups))) {
      return <ActivityIndicator animating={true} style={styles.activityIndicator} />;
    }

    if (error) {
      return <ErrorGetList />;
    }

    if (!listGroups?.list.length) {
      return <EmptyListOfGroups />;
    }

    return (
      <View style={styles.content}>
        <ListGroupsContainer />
      </View>
    );
  };

  useEffect(() => {
    if (listGroups) {
      dispatch(groupsActions.setGroups({ data: listGroups, userId }));
      listGroups.list.forEach((group) => socket.emit(SOCKET_EVENTS.JOIN_ROOM, group._id));
    }
  }, [listGroups, dispatch, socket, userId]);

  useEffect(() => {
    if (unReadMessages) {
      dispatch(groupsActions.setInitialUnReadMessages(unReadMessages));
    }
  }, [dispatch, unReadMessages]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />

        {renderComponent()}
      </View>
    </SafeAreaView>
  );
};
