import { SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { fetchListGroups } from '../../services/groupServices';
import { styles } from './HomeStyles';
import { Header } from './components';
import { GroupContainer } from './containers/GroupContainer';

export const HomeScreen = () => {
  const token = useSelector(userTokenSelector);

  const { data } = useQuery(['todos', token], () => fetchListGroups(token));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          {data?.list.map((group: any, index: number) => (
            <GroupContainer group={group} key={index} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
