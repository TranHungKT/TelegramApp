import { User } from 'models';
import { useEffect, useCallback } from 'react';
import { View, Linking, Alert, Image, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { URLSearchParams, URL } from 'react-native-url-polyfill';
import { useSelector } from 'react-redux';

import { DEFAULT_USER_DATA } from '@Constants/index';
import { NavigatorParamList } from '@Navigators/index';
import { useAppDispatch } from '@Stores/index';
import { userActions, userDataSelector } from '@Stores/user';
import { IMAGES } from '@Themes/images';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from './LoginStyles';

// TODO: MOVE TO ENV
const AUTH_URL = 'http://localhost:3000/auth/facebook';
const URL_TYPE = 'url';

const ALERT_OPEN_URL = 'Can not open this url';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector(userDataSelector);
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorParamList, 'LoginScreen'>>();

  const handleSaveUserDataToRedux = useCallback(
    (data: User) => {
      dispatch(userActions.setUserData(data));
    },
    [dispatch],
  );

  const decodeCallbackUrl = useCallback(
    (url: string) => {
      const callbackURL = new URL(url);
      const userParams = new URLSearchParams(callbackURL.search);
      let data: User = {
        ...DEFAULT_USER_DATA,
      };

      for (const userInfo of userParams) {
        data[userInfo[0] as keyof User] = userInfo[1];
      }

      handleSaveUserDataToRedux(data);
    },
    [handleSaveUserDataToRedux],
  );

  const openUrl = async () => {
    const isSupportedURL = await Linking.canOpenURL(AUTH_URL);
    if (isSupportedURL) {
      return Linking.openURL(AUTH_URL);
    }
    Alert.alert(ALERT_OPEN_URL);
  };

  useEffect(() => {
    Linking.addEventListener(URL_TYPE, (payload: { url: string }) =>
      decodeCallbackUrl(payload.url),
    );

    return () => {
      Linking.removeAllListeners(URL_TYPE);
    };
  }, [decodeCallbackUrl]);

  useEffect(() => {
    if (userData.id) {
      navigation.navigate('HomeScreen');
    }
  }, [navigation, userData]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={IMAGES.LoginLogo} style={styles.logo} />
      <View style={styles.button}>
        <Button mode="contained" onPress={openUrl}>
          Login With Facebook
        </Button>
      </View>
    </SafeAreaView>
  );
};
