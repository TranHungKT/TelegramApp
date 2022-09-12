import { useSelector } from 'react-redux';
import { IMAGES } from 'themes';

import { Group as IGroup } from '@Models/index';
import { userIdSelector } from '@Stores/user';

import { Group } from '../../components/Group';

interface GroupContainerProps {
  group: IGroup;
}

export const GroupContainer = (props: GroupContainerProps) => {
  const { group } = props;
  const { members } = group;

  const userId = useSelector(userIdSelector);

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

  return <Group group={{ ...group, name: generateGroupName() }} avatarUrl={getAvatarUrl()} />;
};
