import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat, IMessage, BubbleProps } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

import { NewMessageContent } from '@Models/index';
import { getCurrentGroupIdSelector } from '@Stores/groups';
import { userDataSelector } from '@Stores/user';
import { generateName } from '@Utils/index';

import { RenderActionsMessage } from '../../components/RenderActionsMessage';
import { RenderBubbleMessage } from '../../components/RenderBubbleMessage';
import { TypingContainer } from '../TypingContainer';
import { styles } from './DisplayMessageContainerStyles';

interface DisplayMessageContainerProps {
  messages?: IMessage[];
  isTyping: boolean;
  onTextInputChanged: (text: string) => void;
  onSendMessages: (newMess: NewMessageContent[]) => void;
}

export const DisplayMessageContainer = (props: DisplayMessageContainerProps) => {
  const { messages, onTextInputChanged, onSendMessages, isTyping } = props;
  const [customText, setCustomText] = useState('');
  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const { _id, firstName, lastName, avatarUrl } = useSelector(userDataSelector);

  const handleSendMessage = useCallback(
    (newMessages: NewMessageContent[] = []) => {
      onSendMessages(newMessages);
    },
    [onSendMessages],
  );

  const handleTextInputChanged = (text: string) => {
    setCustomText(text);
    onTextInputChanged(text);
  };

  const handleChooseImage = useCallback(
    (fileUrl: string) => {
      handleSendMessage([
        {
          image: fileUrl,
        },
      ]);
    },
    [handleSendMessage],
  );

  const renderFooter = () => {
    return <TypingContainer groupId={currentGroupId || ''} isTyping={isTyping} />;
  };

  const renderBubble = (message: BubbleProps<IMessage>) => {
    return <RenderBubbleMessage bubbleMessage={message} userId={_id} />;
  };

  const renderActions = () => {
    return <RenderActionsMessage onChooseImage={handleChooseImage} />;
  };

  const renderChatFooter = () => {
    return <View style={styles.chatFooter} />;
  };

  return (
    <GiftedChat
      messages={messages}
      text={customText}
      onInputTextChanged={handleTextInputChanged}
      onSend={(newMess) =>
        handleSendMessage(
          newMess.map((message) => ({
            text: message.text,
            image: message.image,
          })),
        )
      }
      user={{
        _id,
        name: generateName({ firstName, lastName }),
        avatar: avatarUrl,
      }}
      renderFooter={renderFooter}
      renderBubble={renderBubble}
      renderActions={renderActions}
      keyboardShouldPersistTaps="never"
      forceGetKeyboardHeight={true}
      renderChatFooter={renderChatFooter}
    />
  );
};
