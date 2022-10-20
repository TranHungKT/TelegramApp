import { UpdateMessageStatusPayload } from '@Models/index';
import { useAppDispatch } from '@Stores/index';
import { messagesActions } from '@Stores/messages';

export const useReduxToUpdateMessageStatus = () => {
  const dispatch = useAppDispatch();

  const handleMessageReceived = (payload: UpdateMessageStatusPayload) => {
    dispatch(messagesActions.updateMessageToReceivedStatus(payload));
  };

  return [handleMessageReceived];
};
