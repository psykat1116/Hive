import { Id } from "@/convex/_generated/dataModel";
import { useGetMember } from "@/hook/useGetMember";
import { useGetMessages } from "@/hook/useGetMessages";
import { useMemberId } from "@/hook/useMemberId";
import { Loader } from "lucide-react";
import React from "react";
import ConversationHeader from "./ConversationHeader";
import ConversationInput from "./ConversationInput";
import MessageList from "../chat/MessageList";

interface ConversationProps {
  id: Id<"conversations">;
}

const Conversation = ({ id }: ConversationProps) => {
  const memberId = useMemberId();
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
        onClick={() => {}}
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
