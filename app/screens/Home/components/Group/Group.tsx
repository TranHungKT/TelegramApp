import moment from 'moment';
import { View, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';

import { Group as IGroup } from '@Models/index';

import { styles } from './GroupStyles';

interface GroupProps {
  group: IGroup;
  onClickGroup: () => void;
}

export const Group = (props: GroupProps) => {
  const { group, onClickGroup } = props;
  const { _id, name, lastUpdatedAt, groupAvatar } = group;

  const is2Members = () => group.members.length === 2;

  return (
    <TouchableOpacity key={_id} style={styles.container} onPress={onClickGroup}>
      <>
        <Image
          source={
            is2Members() ? { uri: groupAvatar as string } : (groupAvatar as ImageSourcePropType)
          }
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
    </TouchableOpacity>
  );
};
