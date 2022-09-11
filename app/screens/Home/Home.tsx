import { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { Group } from '@Models/index';
import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { fetchListGroups } from '../../services/groupServices';
import { styles } from './HomeStyles';
import { Header } from './components';
import { EmptyListOfGroups } from './components/EmptyListOfGroups';
import { GroupContainer } from './containers/GroupContainer';

export const HomeScreen = () => {
  const token = useSelector(userTokenSelector);

  const { data, isFetching, error } = useQuery(['todos', token], () => fetchListGroups(token));

  const [isVisibleError, setIsVisibleError] = useState(false);

  const onDismissSnackBar = () => setIsVisibleError(false);

  useEffect(() => {
    if (error) {
      setIsVisibleError(true);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />

        {isFetching ? (
          <ActivityIndicator animating={true} style={styles.activityIndicator} />
        ) : (
          <View style={styles.content}>
            {data?.list.map((group: Group) => (
              <GroupContainer group={group} key={group._id} />
            ))}
          </View>
        )}

        <EmptyListOfGroups isEmpty={data?.list.length === 0} />

        <Snackbar
          visible={isVisibleError}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: onDismissSnackBar,
          }}
        >
          Something went wrong
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};
