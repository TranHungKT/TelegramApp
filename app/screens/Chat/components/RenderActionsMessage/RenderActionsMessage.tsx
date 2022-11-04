import { useEffect } from 'react';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { UploadImagePayload } from '@Models/index';
import { uploadImages } from '@Services/imageServices';
import { userTokenSelector } from '@Stores/user';
import { palette, sizes } from '@Themes/index';
import { useMutation } from '@tanstack/react-query';

interface RenderActionsMessageProps {
  onChooseImage: (fileUrl: string) => void;
}

export const RenderActionsMessage = (props: RenderActionsMessageProps) => {
  const accessToken = useSelector(userTokenSelector);
  const { onChooseImage } = props;

  const mutation = useMutation({
    mutationFn: (payload: UploadImagePayload) => uploadImages({ ...payload }),
  });

  const handleLaunchImagePicker = async () => {
    try {
      await launchImageLibrary(
        { mediaType: 'photo', maxHeight: 360, maxWidth: 360, quality: 1 },
        (response: ImagePickerResponse) => {
          if (response.assets) {
            mutation.mutate({ images: response.assets, accessToken });
          }
        },
      );
    } catch (error) {
      console.error('Can not get image');
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      onChooseImage(mutation.data.data.fileUrl);
    }
  }, [mutation.data, mutation.isSuccess, onChooseImage]);

  return (
    <IconButton
      icon="image"
      color={palette.blue}
      onPress={handleLaunchImagePicker}
      size={sizes.very_large}
    />
  );
};
