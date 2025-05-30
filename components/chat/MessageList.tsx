import { useState } from "react";
import { Loader } from "lucide-react";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";

import { Id } from "@/convex/_generated/dataModel";

import Message from "@/components/chat/Message";
import ChannelHero from "@/components/channel/ChannelHero";
import ConversationHero from "@/components/conversation/ConversationHero";

import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
import { useCurrentMember } from "@/hook/member/useCurrentMember";
import { GetMessagesReturnType } from "@/hook/message/useGetMessages";

interface MessageListProps {
  channelName?: string;
  channelCreationTime?: number;
  memberName?: string;
  memberImage?: string;
  variant?: "channel" | "thread" | "conversation";
  data?: GetMessagesReturnType;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
}

const TIME_THRESHOLD = 5;

const MessageList = ({
  channelName,
  channelCreationTime,
  data,
  loadMore,
  isLoadingMore,
  canLoadMore,
  memberImage,
  memberName,
  variant = "channel",
}: MessageListProps) => {
  const workspaceId = useWorkSpaceId();
  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

  const { data: currentMember } = useCurrentMember({ workspaceId });

  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
      return groups;
    },
    {} as Record<string, GetMessagesReturnType>
  );

  const formatDateLabel = (dateKey: string) => {
    const date = new Date(dateKey);
    if (isToday(date)) {
      return "Today";
    }
    if (isYesterday(date)) {
      return "Yesterday";
    }
    return format(date, "EEEE, MMMM d");
  };

  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="text-center my-2 relative">
            <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {messages.map((message, idx) => {
            const prevMessage = messages[idx - 1];
            const isCompact =
              prevMessage &&
              prevMessage.user._id === message.user._id &&
              differenceInMinutes(
                new Date(message._creationTime),
                new Date(prevMessage._creationTime)
              ) < TIME_THRESHOLD;

            return (
              <Message
                key={message._id}
                id={message._id}
                memberId={message.memberId}
                authorImage={message.user.image}
                authorName={message.user.name}
                reactions={message.reactions}
                body={message.body}
                image={message.image}
                updatedAt={message.updatedAt}
                createdAt={message._creationTime}
                threadCount={message.threadCount}
                threadImage={message.threadImage}
                threadName={message.threadName}
                threadTimestamp={message.threadTimestamp}
                isEditing={editingId === message._id}
                setEditingId={setEditingId}
                isCompact={isCompact}
                hideThreadButton={variant === "thread"}
                isAuthor={message.memberId === currentMember?._id}
              />
            );
          })}
        </div>
      ))}
      <div
        className="h-1"
        ref={(el) => {
          if (el) {
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting && canLoadMore) {
                  loadMore();
                }
              },
              {
                threshold: 1.0,
              }
            );

            observer.observe(el);
            return () => observer.disconnect();
          }
        }}
      />
      {isLoadingMore && (
        <div className="text-center my-2 relative">
          <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
          <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
            <Loader className="size-4 animate-spin text-muted-foreground" />
          </span>
        </div>
      )}
      {variant === "channel" && channelName && channelCreationTime && (
        <ChannelHero name={channelName} creationTime={channelCreationTime} />
      )}
      {variant === "conversation" && (
        <ConversationHero name={memberName} image={memberImage} />
      )}
    </div>
  );
};

export default MessageList;
