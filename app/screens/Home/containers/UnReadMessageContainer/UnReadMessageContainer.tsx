import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

import { userIdSelector } from '@Stores/user';

import { styles } from './UnReadMessageContainerStyles';

interface UnReadMessageContainerProps {
  numberOfUnReadMessage: number;
  senderOfLastMessage?: string;
}
export const UnReadMessageContainer = (props: UnReadMessageContainerProps) => {
  const { numberOfUnReadMessage, senderOfLastMessage } = props;

  const userId = useSelector(userIdSelector);

  const getTextUnReadMessages = () => {
    if (userId === senderOfLastMessage) {
      return '';
    }

    if (numberOfUnReadMessage === 0) {
      return <Icon name="check" size={20} />;
    }

    if (numberOfUnReadMessage < 10) {
      return <Text style={styles.numberOfUnReadMessageText}>{numberOfUnReadMessage}</Text>;
    }

    return <Text style={styles.numberOfUnReadMessageText}>9+</Text>;
  };

  return (
    <View
      style={[
        styles.numberOfUnReadMessageView,
        numberOfUnReadMessage === 0 && styles.numberOfUnReadMessageEqualZeroView,
      ]}
    >
      {getTextUnReadMessages()}
    </View>
  );
};
