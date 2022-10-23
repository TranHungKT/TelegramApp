import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import { styles } from './UnReadMessageStyles';

interface UnReadMessageProps {
  numberOfUnReadMessage: number;
}
export const UnReadMessage = (props: UnReadMessageProps) => {
  const { numberOfUnReadMessage } = props;

  const getTextUnReadMessages = () => {
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
