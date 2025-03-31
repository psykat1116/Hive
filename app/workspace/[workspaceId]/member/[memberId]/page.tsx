"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AlertTriangle, Loader } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import { useMemberId } from "@/hook/params/useMemberId";
import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
import Conversation from "@/components/conversation/Conversation";
import { useCreateOrGetConversation } from "@/hook/conversation/useCreateOrGetConversation";

const MemberIdPage = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkSpaceId();

  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);

  const { mutate, isPending } = useCreateOrGetConversation();

  console.log("conversationId", conversationId);
  console.log("memberId", memberId);
  console.log("workspaceId", workspaceId);

  useEffect(() => {
    mutate(
      { workspaceId, memberId },
      {
        onError: (error) => {
          toast.error(error.message);
        },
        onSuccess: (data) => {
          setConversationId(data);
        },
      }
    );
  }, [memberId, workspaceId, mutate]);

  if (isPending) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="text-muted-foreground text-sm animate-spin" />
      </div>
    );
  }

  if (!conversationId) {
    return (
      <div className="h-full flex flex-col gap-2 items-center justify-center">
        <AlertTriangle className="text-muted-foreground text-sm" />
        <span className="text-muted-foreground text-sm">
          Conversation Not Found
        </span>
      </div>
    );
  }

  return <Conversation id={conversationId} />;
};

export default MemberIdPage;
