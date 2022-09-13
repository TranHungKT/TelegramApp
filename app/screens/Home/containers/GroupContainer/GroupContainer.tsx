import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { IMAGES } from 'themes';

import { Group as IGroup } from '@Models/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { WebSocketContext } from '@Providers/index';
import { userIdSelector } from '@Stores/user';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Group } from '../../components/Group';

interface GroupContainerProps {
  group: IGroup;
}

export const GroupContainer = (props: GroupContainerProps) => {
  const { group } = props;
  const { members } = group;

  const userId = useSelector(userIdSelector);
  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'HomeScreen'>>();
  const socket = useContext(WebSocketContext);

  const handleClickGroup = () => {
    navigation.navigate('ChatScreen');
    socket.emit('join-room', group._id);
  };

  const generateGroupName = () => {
    let name = '';
    members.forEach((member) => {
      if (member._id !== userId) {
        name = name + `,${member.firstName} ${member.lastName}`;
      }
    });

    return name.substring(1);
  };

  const getAvatarUrl = () => {
    if (members.length === 2) {
      return members.filter((member) => member._id !== userId)[0].avatarUrl;
    }
    return IMAGES.Group;
  };

  return (
    <Group
      group={{ ...group, name: generateGroupName() }}
      avatarUrl={getAvatarUrl()}
      onClickGroup={handleClickGroup}
    />
  );
};
