import { createStandaloneToast } from '@chakra-ui/react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { i18n } from 'next-i18next';
import _ from 'lodash';
import Router from 'next/router';

import { getTokenCookie, removeTokenCookie } from './cookies';
import { checkRedirectRouter } from './redirectRouter';

import { PATH } from '@/constants/path';

const { toast } = createStandaloneToast();

const IGNORE_MESSAGES = ['Not enough NA cards', 'nft_not_found'];
const IGNORE_URLS = ['/kyc/automatic-verify'];

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30 * 1000,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'brackets' }),
  withCredentials: true,
});

// request interceptor
request.interceptors.request.use((axiosConfig: AxiosRequestConfig) => {
  axiosConfig.headers = {
    ...axiosConfig.headers,
    Authorization: `Bearer ${getTokenCookie()}`,
  };

  return axiosConfig;
});

request.interceptors.response.use(
  (response: AxiosResponse) => deepConvertResponse(response.data),
  (error) => {
    const status = _.get(error, 'response.status');
    const message = _.get(error, 'response.data.message');

    const url = _.get(error, 'response.config.url', '');

    if (status === 401) {
      removeTokenCookie();
      return Router.push(PATH.SIGNIN);
    }

    if (status === 400) {
      const isRedirectRouter = checkRedirectRouter();
      if (isRedirectRouter) {
        return;
      }

      if (IGNORE_MESSAGES.includes(message)) {
        return;
      }

      if (!IGNORE_URLS.includes(url)) {
        toast({
          title: i18n?.t('message:error') as string,
          description: i18n?.t(`message:${_.snakeCase(message)}`) as string,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }

    return Promise.reject(error);
  }
);

const deepConvertResponse = (response: any): any => {
  if (Array.isArray(response)) {
    // If the response is an array, loop through its items
    return response.map((item: any) => deepConvertResponse(item));
  } else if (typeof response === 'object' && response !== null) {
    // If the response is an object, create a new object and map its properties
    const convertedResponse: any = {};
    for (const key in response) {
      if (key === '_id') {
        // Clone _id to id
        convertedResponse.id = response[key];
      }
      convertedResponse[key] = deepConvertResponse(response[key]);
    }
    return convertedResponse;
  } else {
    // If the response is neither an object nor an array, return it as is
    return response;
  }
};

export default request;
