import moment from 'moment';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { getImageSource } from 'utils';

import { Group as IGroup } from '@Models/index';

import { LastMessageContainer } from '../../containers/LastMessageContainer';
import { UnReadMessageContainer } from '../../containers/UnReadMessageContainer';
import { styles } from './GroupStyles';

interface GroupProps {
  group: IGroup;
  onClickGroup: () => void;
  numberOfUnReadMessage?: number;
}

export const Group = (props: GroupProps) => {
  const { group, onClickGroup, numberOfUnReadMessage } = props;
  const { _id, name, lastUpdatedAt, groupAvatar } = group;

  const isMoreThan2Member = () => group.members.length > 2;

  return (
    <TouchableOpacity key={_id} style={styles.container} onPress={onClickGroup}>
      <>
        <Image
          source={getImageSource(groupAvatar, isMoreThan2Member())}
          style={styles.avatar}
          resizeMode="contain"
        />
        <View style={styles.groupView}>
          <Text numberOfLines={1} style={styles.groupName}>
            {name}
          </Text>

          <LastMessageContainer
            members={group.members}
            message={group.lastMessage}
            hasUnReadMessage={!!numberOfUnReadMessage}
          />
        </View>

        <View style={styles.rightCol}>
          <Text style={styles.lastUpdatedTime}>{moment(lastUpdatedAt).format('HH:MM')}</Text>
          {numberOfUnReadMessage !== undefined && (
            <UnReadMessageContainer
              numberOfUnReadMessage={numberOfUnReadMessage}
              senderOfLastMessage={group.lastMessage?.user}
            />
          )}
        </View>
      </>
    </TouchableOpacity>
  );
};
