import { View, Text } from 'react-native';
import { IMessage, BubbleProps, Bubble } from 'react-native-gifted-chat';

import { styles } from './RenderBubbleMessageStyles';

interface RenderBubbleMessageProps {
  bubbleMessage: BubbleProps<IMessage>;
  userId: string;
}

export const RenderBubbleMessage = (props: RenderBubbleMessageProps) => {
  const { bubbleMessage, userId } = props;

  const renderTicks = (message: IMessage) => {
    if (message.user._id !== userId) {
      return null;
    }

    return (
      <View style={styles.ticksView}>
        {!!message.sent && <Text style={styles.ticks}>✓</Text>}
        {!!message.received && <Text style={styles.ticks}>✓</Text>}
        {!!message.pending && <Text style={styles.ticks}>🕓</Text>}
        {!!message.seen && <Text style={styles.ticks}>✓</Text>}
      </View>
    );
  };
  return <Bubble {...bubbleMessage} renderTicks={renderTicks} />;
};
