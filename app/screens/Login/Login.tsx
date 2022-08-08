import { useEffect } from 'react';
import { View, Linking, Alert, Image, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';

import { IMAGES } from '@Themes/images';

import { styles } from './LoginStyles';

// TODO: MOVE TO ENV
const AUTH_URL = 'http://localhost:3000/auth/facebook';
const URL_TYPE = 'url';

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
    //TODO: DECODE URL BY "&" : NEED RESEARCH
    const user = decodeURI(url).match(/firstName=([^#]+)\/lastName=([^#]+)\/email=([^#]+)/);
    //TODO: SAVE TO MOBX
    console.log('user', user);
  };

  const openUrl = () => async () => {
    const isSupportedURL = await Linking.canOpenURL(AUTH_URL);
    if (isSupportedURL) {
      return Linking.openURL(AUTH_URL);
    }
    Alert.alert('Can not open this url');
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
