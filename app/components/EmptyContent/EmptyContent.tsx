import { View, Image, Text } from 'react-native';

import { IMAGES } from '@Themes/index';

import { styles } from './EmptyContentStyles';

interface EmptyContentProps {
  title?: string;
  subTitle?: string;
}

export const EmptyContent = (props: EmptyContentProps) => {
  const { title, subTitle } = props;
  return (
    <View style={styles.container}>
      <Image source={IMAGES.Empty} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};
