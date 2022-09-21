import { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { Group } from '@Models/index';
import { fetchListGroups } from '@Services/index';
import { groupsActions } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { styles } from './HomeStyles';
import { Header } from './components';
import { EmptyListOfGroups } from './components/EmptyListOfGroups';
import { ErrorGetList } from './components/ErrorGetList';
import { GroupContainer } from './containers/GroupContainer';

export const HomeScreen = () => {
  const token = useSelector(userTokenSelector);
  const dispatch = useAppDispatch();

  const { data, isFetching, error } = useQuery(['getListGroups', token], () =>
    fetchListGroups({ token, pageNumber: 1, pageSize: 10 }),
  );

  const renderComponent = () => {
    if (isFetching) {
      return <ActivityIndicator animating={true} style={styles.activityIndicator} />;
    }

    if (error) {
      return <ErrorGetList />;
    }

    if (data?.list.length === 0) {
      return <EmptyListOfGroups />;
    }

    return (
      <View style={styles.content}>
        {data?.list.map((group: Group) => (
          <GroupContainer group={group} key={group._id} />
        ))}
      </View>
    );
  };

  useEffect(() => {
    if (data) {
      dispatch(groupsActions.setGroups(data));
    }
  }, [data, dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />

        {renderComponent()}
      </View>
    </SafeAreaView>
  );
};
