import { View } from 'react-native';
import { IMessage, BubbleProps, Bubble } from 'react-native-gifted-chat';

import { RenderMessageImage } from '../RenderMessageImage';
import { RenderTicks } from '../RenderTicks';
import { styles } from './RenderBubbleMessageStyles';

interface RenderBubbleMessageProps {
  bubbleMessages: BubbleProps<IMessage>;
  userId: string;
}

export const RenderBubbleMessage = (props: RenderBubbleMessageProps) => {
  const { bubbleMessages, userId } = props;

  const renderBubble = () => {
    if (bubbleMessages.currentMessage && bubbleMessages.currentMessage.image) {
      return (
        <RenderMessageImage
          renderBubbleMessages={{
            ...bubbleMessages,
            renderTicks: () => <></>,
            renderTime: () => <></>,
          }}
        />
      );
    }
    return <Bubble {...bubbleMessages} renderTicks={() => <></>} renderTime={() => <></>} />;
  };

  return (
    <View style={styles.bubbleMessageView}>
      {renderBubble()}
      <RenderTicks bubbleMessages={bubbleMessages} userId={userId} />
    </View>
  );
};
