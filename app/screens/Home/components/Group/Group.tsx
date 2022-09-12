import moment from 'moment';
import { View, ImageSourcePropType } from 'react-native';
import { Text, Avatar } from 'react-native-paper';

import { Group as IGroup } from '@Models/index';

import { styles } from './GroupStyles';

interface GroupProps {
  group: IGroup;
  avatarUrl: ImageSourcePropType | string;
}

export const Group = (props: GroupProps) => {
  const { group, avatarUrl } = props;
  const { _id, name, lastUpdatedAt } = group;

  const is2Members = () => group.members.length === 2;

  return (
    <View key={_id} style={styles.container}>
      <>
        <Avatar.Image
          source={is2Members() ? { uri: avatarUrl as string } : (avatarUrl as ImageSourcePropType)}
          style={styles.avatar}
        />
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
