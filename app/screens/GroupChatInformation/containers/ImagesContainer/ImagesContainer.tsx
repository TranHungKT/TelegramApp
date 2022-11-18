import { FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { fetchImagesOfGroups } from '@Services/index';
import { currentGroupSelector } from '@Stores/groups';
import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { styles } from './ImagesContainerStyles';

export const ImagesContainer = () => {
  const currentGroup = useSelector(currentGroupSelector);
  const token = useSelector(userTokenSelector);
  const { data, isFetching } = useQuery(['getImages', token], () =>
    // TODO: PAGINATION HERE
    fetchImagesOfGroups({ token, groupId: currentGroup?._id || '' }),
  );

  const renderItem = ({ item }: { item: { id: string; image: string } }) => {
    return (
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
        resizeMode="cover"
      />
    );
  };

  if (isFetching) {
    return <></>;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      style={styles.container}
      numColumns={3}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};
