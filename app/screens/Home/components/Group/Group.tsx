import moment from 'moment';
import { View } from 'react-native';
import { Text, Avatar } from 'react-native-paper';

import { Group as IGroup } from '@Models/index';

import { styles } from './GroupStyles';

interface GroupProps {
  group: IGroup;
  avatarUrl: string;
}

export const Group = (props: GroupProps) => {
  const { group, avatarUrl } = props;
  const { _id, name, lastUpdatedAt } = group;

  return (
    <View key={_id} style={styles.container}>
      <>
        <Avatar.Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View style={styles.groupView}>
          <Text numberOfLines={1} style={styles.groupName}>
            {name}
          </Text>
          <Text numberOfLines={1} style={styles.chat}>
            Me: How are you?
          </Text>
        </View>

        <View style={styles.rightCol}>
          <Text style={styles.lastUpdatedTime}>{moment(lastUpdatedAt).format('HH:MM')}</Text>
        </View>
      </>
    </View>
  );
};
