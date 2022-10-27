import { useSelector } from 'react-redux';

import { NewMessageFromSocket } from '@Models/index';
import {
  getCurrentGroupIdSelector,
  getNumberOfUnReadMessagesSelector,
  groupsActions,
} from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { messagesActions } from '@Stores/messages';

export const useReduxToAddNewMessage = () => {
  const dispatch = useAppDispatch();

  const currentGroupId = useSelector(getCurrentGroupIdSelector);

  const unReadMessageSelector = useSelector(getNumberOfUnReadMessagesSelector);

  const handleAddNewUnReadMessage = (groupId: string) => {
    const numberOfUnReadMessage = unReadMessageSelector({ groupId: groupId });

    if (!currentGroupId || currentGroupId !== groupId) {
      dispatch(
        groupsActions.updateUnReadMessages({
          groupId,
          numberOfUnReadMessage: numberOfUnReadMessage + 1,
        }),
      );
    }
  };

  const handleAddNewMessageToGroup = ({ newMessage, groupId }: NewMessageFromSocket) => {
    dispatch(
      groupsActions.setLastMessage({
        message: { ...newMessage, user: newMessage.user._id.toString() },
        groupId: groupId,
      }),
    );

    dispatch(
      messagesActions.addNewMessageToCurrentGroup({
        newMessage,
        groupId,
      }),
    );

    if (groupId) {
      handleAddNewUnReadMessage(groupId);
    }
  };

  return handleAddNewMessageToGroup;
};
