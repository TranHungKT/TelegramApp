import { useCallback } from 'react';
import { GiftedChat, IMessage, BubbleProps } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

import { getCurrentGroupIdSelector } from '@Stores/groups';
import { userDataSelector } from '@Stores/user';
import { generateName } from '@Utils/index';

import { RenderActionsMessage } from '../../components/RenderActionsMessage';
import { RenderBubbleMessage } from '../../components/RenderBubbleMessage';
import { TypingContainer } from '../TypingContainer';

interface DisplayMessageContainerProps {
  messages?: IMessage[];
  isTyping: boolean;
  onTextInputChanged: (text: string) => void;
  onSendMessages: (newMess: IMessage[]) => void;
}

export const DisplayMessageContainer = (props: DisplayMessageContainerProps) => {
  const { messages, onTextInputChanged, onSendMessages, isTyping } = props;

  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const { _id, firstName, lastName, avatarUrl } = useSelector(userDataSelector);

  const appendMessageToGiftedChat = useCallback(
    (newMess: IMessage[]) => GiftedChat.append(messages, newMess),
    [messages],
  );

  const handleSendMessage = useCallback(
    (newMessages: IMessage[] = []) => {
      onSendMessages(newMessages);
      appendMessageToGiftedChat(newMessages);
    },
    [appendMessageToGiftedChat, onSendMessages],
  );

  const renderFooter = () => {
    return <TypingContainer groupId={currentGroupId || ''} isTyping={isTyping} />;
  };

  const renderBubble = (message: BubbleProps<IMessage>) => {
    return <RenderBubbleMessage bubbleMessage={message} userId={_id} />;
  };

  const renderActions = () => {
    return <RenderActionsMessage />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMess) => handleSendMessage(newMess)}
      user={{
        _id,
        name: generateName({ firstName, lastName }),
        avatar: avatarUrl,
      }}
      renderFooter={renderFooter}
      onInputTextChanged={onTextInputChanged}
      renderBubble={renderBubble}
      renderActions={renderActions}
    />
  );
};
