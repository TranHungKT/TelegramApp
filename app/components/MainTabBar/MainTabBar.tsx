import { ScrollView } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { TabBarButton } from '../TabBarButton';
import { styles } from './MainTabBarStyles';

export const MainTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
      {state.routes.map((route, index) => (
        <TabBarButton
          route={route}
          options={descriptors[route.key].options}
          navigation={navigation}
          isFocused={state.index === index}
        />
      ))}
    </ScrollView>
  );
};
