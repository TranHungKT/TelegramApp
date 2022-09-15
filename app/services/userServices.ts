import axios from 'axios';

import { BASE_URL } from '@Configs/index';
import { User } from '@Models/index';

export const fetchUserData = async (token: string): Promise<Omit<User, 'accessToken'>> => {
  try {
    console.log(token);

    const response = await axios.get(`${BASE_URL}user-data`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
