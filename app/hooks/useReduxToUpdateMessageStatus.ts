import { UpdateMessageStatusPayload } from '@Models/index';
import { useAppDispatch } from '@Stores/index';
import { messagesActions } from '@Stores/messages';

export const useReduxToUpdateMessageStatus = () => {
  const dispatch = useAppDispatch();

  const handleMessageReceived = (payload: UpdateMessageStatusPayload) => {
    dispatch(messagesActions.updateMessageStatus(payload));
  };

  const handleMessageRead = (payload: UpdateMessageStatusPayload) => {
    dispatch(messagesActions.updateMessageStatus(payload));
  };
  return [handleMessageReceived, handleMessageRead];
};
