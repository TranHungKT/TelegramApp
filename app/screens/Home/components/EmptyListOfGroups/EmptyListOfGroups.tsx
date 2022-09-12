import { IMAGES } from 'themes';

import { EmptyOrErrorContent } from '@Components/index';

export const EmptyListOfGroups = () => {
  return (
    <EmptyOrErrorContent
      source={IMAGES.Empty}
      title="You haven't chat yet"
      subTitle="Let's start new chat"
    />
  );
};
