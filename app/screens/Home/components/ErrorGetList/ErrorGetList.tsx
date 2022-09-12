import { IMAGES } from 'themes';

import { EmptyOrErrorContent, SnackBarError } from '@Components/index';

export const ErrorGetList = () => {
  return (
    <>
      <EmptyOrErrorContent
        source={IMAGES.Error}
        title="We found some errors when trying get your chats"
        subTitle="Please try again later"
      />
      <SnackBarError isError />
    </>
  );
};
