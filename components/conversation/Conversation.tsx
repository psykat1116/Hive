import { Loader } from "lucide-react";

import MessageList from "@/components/chat/MessageList";
import ConversationInput from "@/components/conversation/ConversationInput";
import ConversationHeader from "@/components/conversation/ConversationHeader";

import { Id } from "@/convex/_generated/dataModel";

import { usePanel } from "@/hook/usePanel";
import { useMemberId } from "@/hook/params/useMemberId";
import { useGetMember } from "@/hook/member/useGetMember";
import { useGetMessages } from "@/hook/message/useGetMessages";

interface ConversationProps {
  id: Id<"conversations">;
}

const Conversation = ({ id }: ConversationProps) => {
  const memberId = useMemberId();
  const { onOpenProfile } = usePanel();
  const { data: member, isLoading: memberLoading } = useGetMember({
    id: memberId,
  });
  const { results, status, loadMore } = useGetMessages({ conversationId: id });

  if (memberLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="text-muted-foreground text-sm animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ConversationHeader
        memberName={member?.user.name}
        memberImage={member?.user.image}
        onClick={() => onOpenProfile(memberId)}
      />
      <MessageList
        data={results}
        variant="conversation"
        memberImage={member?.user.image}
        memberName={member?.user.name}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ConversationInput
        placeholder={`Message ${member?.user.name}`}
        conversationId={id}
      />
    </div>
  );
};

export default Conversation;
