import { useCallback, useState } from 'react';
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
  const [customText, setCustomText] = useState('');
  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const { _id, firstName, lastName, avatarUrl } = useSelector(userDataSelector);

  const handleSendMessage = useCallback(
    (newMessages: IMessage[] = []) => {
      onSendMessages(newMessages);
    },
    [onSendMessages],
  );

  const handleTextInputChanged = (text: string) => {
    setCustomText(text);
    onTextInputChanged(text);
  };

  const handleChooseImage = (fileUrl: string) => {
    handleSendMessage([
      {
        _id: Math.random(),
        text: '',
        createdAt: new Date(),
        user: {
          _id: _id,
          name: generateName({ firstName, lastName }),
          avatar: avatarUrl,
        },
        image: fileUrl,
      },
    ]);
  };

  const renderFooter = () => {
    return <TypingContainer groupId={currentGroupId || ''} isTyping={isTyping} />;
  };

  const renderBubble = (message: BubbleProps<IMessage>) => {
    return <RenderBubbleMessage bubbleMessage={message} userId={_id} />;
  };

  const renderActions = () => {
    return <RenderActionsMessage onChooseImage={handleChooseImage} />;
  };

  return (
    <GiftedChat
      messages={messages}
      text={customText}
      onInputTextChanged={handleTextInputChanged}
      onSend={(newMess) => handleSendMessage(newMess)}
      user={{
        _id,
        name: generateName({ firstName, lastName }),
        avatar: avatarUrl,
      }}
      renderFooter={renderFooter}
      renderBubble={renderBubble}
      renderActions={renderActions}
    />
  );
};
