import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { IconButton } from 'react-native-paper';

import { palette, sizes } from '@Themes/index';

export const RenderActionsMessage = () => {
  const handleLaunchImagePicker = async () => {
    try {
      await launchImageLibrary(
        { mediaType: 'mixed', selectionLimit: 0 },
        (response: ImagePickerResponse) => {
          console.log(response);
        },
      );
    } catch (error) {
      console.error('Can not get image');
    }
  };

  return (
    <IconButton
      icon="image"
      color={palette.blue}
      onPress={handleLaunchImagePicker}
      size={sizes.very_large}
    />
  );
};
