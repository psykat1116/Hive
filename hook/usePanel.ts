import { useParentMessageId } from "./useParentMessageId";
import { useMemberProfileId } from "./useMemberProfileId";

export const usePanel = () => {
  const [parentMessageId, setParentMessageId] = useParentMessageId();
  const [memberProfileId, setMemberProfileId] = useMemberProfileId();

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
