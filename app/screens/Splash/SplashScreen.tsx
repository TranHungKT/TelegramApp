import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { IMAGES } from 'themes';

import { ACCESS_TOKEN_KEY } from '@Constants/index';
import { NavigatorParamList } from '@Navigators/index';
import { useAppDispatch } from '@Stores/index';
import { userActions } from '@Stores/user';
import { getAsyncStorageData } from '@Utils/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { fetchUserData } from '../../services/userServices';
import { styles } from './SplashScreenStyles';

export const SplashScreen = () => {
  const [accessToken, setAccesToken] = useState<string | null | undefined>(undefined);

  const navigation = useNavigation<NativeStackNavigationProp<NavigatorParamList, 'SplashSreen'>>();
  const dispatch = useAppDispatch();

  const { data } = useQuery(
    ['getUserData', accessToken],
    () => fetchUserData(accessToken as string),
    { enabled: accessToken ? true : false },
  );

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await getAsyncStorageData(ACCESS_TOKEN_KEY);
      if (token) {
        setAccesToken(JSON.parse(token));
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken && data) {
      dispatch(userActions.setUserData({ ...data, accessToken }));
      return navigation.navigate('MainTobTab');
    }
    if (accessToken === null) {
      return navigation.navigate('LoginScreen');
    }
  }, [accessToken, navigation, data, dispatch]);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.LoginLogo} style={styles.image} />
      <ActivityIndicator />
    </View>
  );
};
