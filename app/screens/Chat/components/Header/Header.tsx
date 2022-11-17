import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { UserStatus } from '@Models/index';
import { palette } from '@Themes/index';
import { getImageSource } from '@Utils/index';
import { useNavigation } from '@react-navigation/native';

import { styles } from './HeaderStyles';

interface HeaderProps {
  name: string;
  groupAvatar: string | ImageSourcePropType;
  totalMembers: number;
  onClickGoBack?: () => void;
  userStatus: UserStatus;
  onClickName: () => void;
}

export const Header = (props: HeaderProps) => {
  const { name, groupAvatar, totalMembers, onClickGoBack, userStatus, onClickName } = props;

  const navigation = useNavigation();
  const isMoreThan2Member = totalMembers > 2;

  const handleClickGoBack = () => {
    onClickGoBack && onClickGoBack();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstColumn}>
        <TouchableOpacity onPress={handleClickGoBack}>
          <Icon name="chevron-left" size={40} color={palette.blue} />
        </TouchableOpacity>
        <Image source={getImageSource(groupAvatar, isMoreThan2Member)} style={styles.avatar} />
        <TouchableOpacity style={styles.groupNameView} onPress={onClickName}>
          <Text style={styles.groupName}>{name}</Text>

          <Text style={styles.status}>
            {userStatus === UserStatus.ONLINE ? 'Online' : 'Offline'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.profileIconView}>
        <View style={styles.profileIconRow}>
          <Icon name="circle-small" size={35} style={styles.profileIcon} />
          <Icon name="circle-small" size={35} style={styles.profileIcon} />
        </View>
        <View style={styles.profileIconRow}>
          <Icon name="circle-small" size={35} style={styles.profileIcon} />
          <Icon name="circle-small" size={35} style={styles.profileIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
