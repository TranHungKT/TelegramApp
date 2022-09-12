import { SafeAreaView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { SnackBarError } from '@Components/index';
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

  const renderComponent = () => {
    if (isFetching) {
      return <ActivityIndicator animating={true} style={styles.activityIndicator} />;
    }

    if (error) {
      return <SnackBarError isError />;
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />

        {renderComponent()}
      </View>
    </SafeAreaView>
  );
};
