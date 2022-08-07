import { useEffect } from 'react';
import { View, Linking, Alert } from 'react-native';
import { Button } from 'react-native-paper';

import { styles } from './LoginStyles';

// TODO: MOVE TO ENV
const AUTH_URL = 'http://localhost:3000/auth/facebook';
const URL_TYPE = 'url';

export const LoginScreen = () => {
  useEffect(() => {
    Linking.addEventListener(URL_TYPE, (payload: { url: string }) => handleOpenURL(payload.url));

    return () => {
      Linking.removeAllListeners(URL_TYPE);
    };
  }, []);

  const handleOpenURL = (url: string) => {
    //TODO: DECODE URL BY "&" : NEED RESEARCH
    const user = decodeURI(url).match(/firstName=([^#]+)\/lastName=([^#]+)\/email=([^#]+)/);
    //TODO: SAVE TO REDUX
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
    <>
      <View style={styles.button}>
        <Button mode="contained" onPress={openUrl}>
          Login With Facebook
        </Button>
      </View>
    </>
  );
};
