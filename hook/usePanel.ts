import { useQueryState } from "nuqs";

export const usePanel = () => {
  const [parentMessageId, setParentMessageId] =
    useQueryState("parentMessageId");
  const [memberProfileId, setMemberProfileId] =
    useQueryState("memberProfileId");

  const onOpenMessage = (messageId: string) => {
    setParentMessageId(messageId);
    setMemberProfileId(null);
  };

  const onOpenProfile = (memberId: string) => {
    setMemberProfileId(memberId);
    setParentMessageId(null);
  };

  const onClose = () => {
    setParentMessageId(null);
    setMemberProfileId(null);
  };

  return {
    parentMessageId,
    memberProfileId,
    onOpenMessage,
    onOpenProfile,
    onClose,
  };
};
