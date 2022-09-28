import { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { PAGE_SIZE } from '@Constants/index';
import { fetchListGroups } from '@Services/index';
import { getGroupsSelector, groupsActions } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { userIdSelector, userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { styles } from './HomeStyles';
import { Header } from './components';
import { EmptyListOfGroups } from './components/EmptyListOfGroups';
import { ErrorGetList } from './components/ErrorGetList';
import { GroupContainer } from './containers/GroupContainer';

export const HomeScreen = () => {
  const token = useSelector(userTokenSelector);
  const userId = useSelector(userIdSelector);
  const groups = useSelector(getGroupsSelector);
  const dispatch = useAppDispatch();

  const { data, isFetching, error } = useQuery(['getListGroups', token], () =>
    fetchListGroups({ token, pageNumber: 1, pageSize: PAGE_SIZE }),
  );

  const renderComponent = () => {
    if (isFetching || (!!data?.list.length && !groups.length)) {
      return <ActivityIndicator animating={true} style={styles.activityIndicator} />;
    }

    if (error) {
      return <ErrorGetList />;
    }

    if (!data?.list.length) {
      return <EmptyListOfGroups />;
    }

    return (
      <View style={styles.content}>
        {groups.map((group) => (
          <GroupContainer group={group} key={group._id} />
        ))}
      </View>
    );
  };

  useEffect(() => {
    if (data) {
      dispatch(groupsActions.setGroups({ data, userId }));
    }
  }, [data, dispatch, userId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />

        {renderComponent()}
      </View>
    </SafeAreaView>
  );
};
