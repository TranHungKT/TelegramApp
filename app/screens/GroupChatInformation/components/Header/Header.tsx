import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { palette } from '@Themes/index';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
  const navigation = useNavigation();

  const handleClickGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleClickGoBack}>
      <Icon name="chevron-left" size={40} color={palette.blue} />
    </TouchableOpacity>
  );
};
