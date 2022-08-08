import { useEffect } from 'react';
import { View, Linking, Alert, Image, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { URLSearchParams } from 'react-native-url-polyfill';

import { IMAGES } from '@Themes/images';

import { styles } from './LoginStyles';

// TODO: MOVE TO ENV
const AUTH_URL = 'http://localhost:3000/auth/facebook';
const URL_TYPE = 'url';

const ALERT_OPEN_URL = 'Can not open this url';

export const LoginScreen = () => {
  useEffect(() => {
    Linking.addEventListener(URL_TYPE, (payload: { url: string }) => handleOpenURL(payload.url));
    if (AUTH_URL) {
      console.log(AUTH_URL);
    }
    return () => {
      Linking.removeAllListeners(URL_TYPE);
    };
  }, []);

  const handleOpenURL = (url: string) => {
    const userParams = new URLSearchParams(url);
    console.log({ userParams });
    for (const userInfo of userParams) {
      // TODO: SAVE TO MOBX
      // SAMPLE RETURN, WILL BE REMOVE IN MOBX TAST
      // ['telegram://app/login?firstName', 'Trần']
      // ['email', 'tranhung_2612@yahoo.com.vn']
      console.log(userInfo);
    }
  };

  const openUrl = async () => {
    const isSupportedURL = await Linking.canOpenURL(AUTH_URL);
    if (isSupportedURL) {
      return Linking.openURL(AUTH_URL);
    }
    Alert.alert(ALERT_OPEN_URL);
  };

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
