import axios from 'axios';
import { IMessage } from 'react-native-gifted-chat';

import { BASE_URL } from '@Configs/index';
import { GetListGroupResponse, UnReadMessage } from '@Models/index';

interface GetListPayload {
  token: string;
  pageSize: number;
  pageNumber: number;
}

interface GetListPayloadWithGroupId extends GetListPayload {
  groupId?: string;
}

interface GetNumberUnReadMessagePayload {
  token: string;
  groupIds: string[];
}

export const fetchListGroups = async ({
  pageNumber,
  pageSize,
  token,
}: GetListPayload): Promise<GetListGroupResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}get-list-groups?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

export const fetchListMessages = async ({
  token,
  pageSize,
  pageNumber,
  groupId,
}: GetListPayloadWithGroupId): Promise<{ groupId: string; list: IMessage[]; count: number }> => {
  try {
    const response = await axios.get(
      `${BASE_URL}list-message?groupId=${groupId}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
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

export const fetchNumberOfUnReadMessages = async ({
  token,
  groupIds,
}: GetNumberUnReadMessagePayload): Promise<UnReadMessage[]> => {
  try {
    const response = await axios.post(
      `${BASE_URL}get-unread-messages`,
      {
        groupIds,
      },
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
