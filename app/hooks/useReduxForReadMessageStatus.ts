import { ReadMessagePayload } from '@Models/index';
import { groupsActions } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';

export const useReduxForReadMessageStatus = () => {
  const dispatch = useAppDispatch();

  const handleMessageRead = (payload: ReadMessagePayload) => {
    dispatch(
      groupsActions.updateLastMessageToSeenStatus({
        groupId: payload.groupId,
      }),
    );
  };

  return [handleMessageRead];
};
