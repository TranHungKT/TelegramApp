import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import { palette, sizes } from '@Themes/index';

import { styles } from './HeaderStyles';

export const Header = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Telegram</Text>
        <View style={styles.listIcon}>
          <IconButton
            icon="plus-thick"
            color={palette.blue}
            onPress={() => {}}
            size={sizes.large}
          />
          <IconButton
            icon="text-search"
            size={sizes.large}
            color={palette.blue}
            onPress={() => {}}
          />
          <IconButton icon="menu" size={sizes.large} color={palette.blue} onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};
