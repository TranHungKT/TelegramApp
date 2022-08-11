import { UserData } from 'models';
import { useEffect, useCallback } from 'react';
import { View, Linking, Alert, Image, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { URLSearchParams } from 'react-native-url-polyfill';

import { useAppDispatch } from '@Stores/index';
import { userActions } from '@Stores/user';
import { IMAGES } from '@Themes/images';

import { styles } from './LoginStyles';

// TODO: MOVE TO ENV
const AUTH_URL = 'http://localhost:3000/auth/facebook';
const URL_TYPE = 'url';

const ALERT_OPEN_URL = 'Can not open this url';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const handleSaveUserDataToRedux = useCallback(
    (userData: UserData) => {
      dispatch(userActions.setUserData(userData));
    },
    [dispatch],
  );

  const decodeCallbackUrl = useCallback(
    (url: string) => {
      const userParams = new URLSearchParams(url);

      let userData: UserData = {
        firstName: '',
        lastName: '',
        email: '',
        accessToken: '',
        id: '',
      };
      for (const userInfo of userParams) {
        userData[userInfo[0] as keyof UserData] = userInfo[1];
      }

      handleSaveUserDataToRedux(userData);
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
