import { useState } from 'react';
import { FlatList, Image, View, TouchableOpacity } from 'react-native';
import ImageView from 'react-native-image-viewing';
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

  const [currentImage, setCurrentImage] = useState(0);

  const renderItem = ({ item, index }: { item: { id: string; image: string }; index: number }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setCurrentImage(index);
            setIsVisible(true);
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </>
    );
  };

  const [visible, setIsVisible] = useState(false);

  if (isFetching || !data) {
    return <></>;
  }

  return (
    <>
      <View style={styles.blankView} />
      <FlatList
        data={data}
        renderItem={renderItem}
        style={styles.container}
        numColumns={3}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <ImageView
        images={data.map((mes) => ({ uri: mes.image }))}
        imageIndex={currentImage}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
};
