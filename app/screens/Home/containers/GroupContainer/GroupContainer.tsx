import { useSelector } from 'react-redux';

import { Group as IGroup } from '@Models/index';
import { userIdSelector } from '@Stores/user';

import { Group } from '../../components/Group';

interface GroupContainerProps {
  group: IGroup;
}

export const GroupContainer = (props: GroupContainerProps) => {
  const { group } = props;
  const { members } = props.group;

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
    return members.filter((member) => member._id !== userId)[0].avatarUrl;
  };

  return <Group group={{ ...group, name: generateGroupName() }} avatarUrl={getAvatarUrl()} />;
};
