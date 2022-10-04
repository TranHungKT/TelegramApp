import { IMessage } from 'react-native-gifted-chat';

import { groupsActions } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { messagesActions } from '@Stores/messages';

export const useReduxToAddNewMessage = () => {
  const dispatch = useAppDispatch();

  const handleAddNewMessageToGroup = ({
    newMessage,
    groupId,
  }: {
    newMessage: IMessage;
    groupId?: string;
  }) => {
    dispatch(
      messagesActions.addNewMessageToCurrentGroup({
        message: newMessage,
        currentGroupId: groupId,
      }),
    );

    dispatch(groupsActions.setLastMessage({ ...newMessage, user: newMessage.user._id.toString() }));
  };

  return handleAddNewMessageToGroup;
};
