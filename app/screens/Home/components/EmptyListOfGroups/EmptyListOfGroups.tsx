import { EmptyContent } from '@Components/index';

interface EmptyListOfGroupsProps {
  isEmpty: boolean;
}
export const EmptyListOfGroups = (props: EmptyListOfGroupsProps) => {
  const { isEmpty } = props;
  return isEmpty ? (
    <EmptyContent title="You haven't chat yet" subTitle="Let's start new chat" />
  ) : (
    <></>
  );
};
