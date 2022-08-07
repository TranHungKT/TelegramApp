import { useEffect } from 'react';
import { View, Linking } from 'react-native';
import { Button } from 'react-native-paper';

import { styles } from './LoginStyles';

export const LoginScreen = () => {
  useEffect(() => {
    Linking.addEventListener('url', (url) => handleOpenURL(url.url));
    Linking.getInitialURL().then((url: any) => {
      if (url) {
        handleOpenURL({ url });
      }
    });
    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  const handleOpenURL = (url: any) => {
    const endcodedURL = encodeURI(url);

    const user = decodeURI(endcodedURL);

    console.log('user', user);
  };

  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <>
      <View style={styles.button}>
        <Button mode="contained" onPress={() => openUrl('http://localhost:3000/auth/facebook')}>
          Login With Facebook
        </Button>
      </View>
    </>
  );
};
