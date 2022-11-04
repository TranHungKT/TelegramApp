import { Asset } from 'react-native-image-picker';

export interface UploadImagePayload {
  images: Asset[];
  accessToken: string;
}
