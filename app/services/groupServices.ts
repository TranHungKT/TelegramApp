import axios from 'axios';

import { Group } from '@Models/index';

export const fetchListGroups = async (token: string): Promise<{ list: Group[]; count: number }> => {
  try {
    const response = await axios.get(
      'http://localhost:3000/get-list-groups?pageNumber=1&pageSize=10',
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
