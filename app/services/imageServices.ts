import axios from 'axios';
import { BASE_URL } from 'configs';
import { Asset } from 'react-native-image-picker';

export const uploadImages = async ({
  images,
  accessToken,
}: {
  images: Asset[];
  accessToken: string;
}) => {
  const formData = new FormData();

  formData.append('photos', {
    name: images[0].fileName,
    uri: images[0].uri,
    type: images[0].type,
  } as any);

  return axios.post(`${BASE_URL}upload-photo`, formData, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'multipart/form-data',
      authorization: `Bearer ${accessToken}`,
    },
  });
};
