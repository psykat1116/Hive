import { Id } from "@/convex/_generated/dataModel";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { AlertTriangle, Loader, X } from "lucide-react";
import { useGetMessage } from "@/hook/useGetMessage";
import Message from "../chat/Message";
import { useCurrentMember } from "@/hook/useCurrentMember";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useUpload } from "@/hook/useUpload";
import { useCreateMessage } from "@/hook/useCreateMessage";
import { useChannelId } from "@/hook/useChannelId";
import { toast } from "sonner";
import { useGetMessages } from "@/hook/useGetMessages";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";

interface ThreadProps {
  messageId: Id<"messages">;
  onClose: () => void;
}

const TIME_THRESHOLD = 5;

const Editor = dynamic(() => import("@/components/chat/Editor"), {
  ssr: false,
});

type CreateMessageValue = {
  channelId: Id<"channels">;
  workspaceId: Id<"workspaces">;
  parentMessageId: Id<"messages">;
  body: string;
  image?: Id<"_storage">;
};

const Thread = ({ messageId, onClose }: ThreadProps) => {
  const channelId = useChannelId();
  const workspaceId = useWorkSpaceId();
  const [pending, setPending] = useState(false);
  const editorRef = useRef<Quill | null>(null);
  const { mutate: generateURL } = useUpload();
  const { mutate: createMessage } = useCreateMessage();
  const { data: currentMember } = useCurrentMember({ workspaceId });
  const { data: message, isLoading: messageLoading } = useGetMessage({
    id: messageId,
  });
  const [editingId, setEditingId] = React.useState<Id<"messages"> | null>(null);
  const { results, status, loadMore } = useGetMessages({
    channelId,
    parentMessageId: messageId,
  });

  const canLoadMore = status === "CanLoadMore";
  const isLoadingMore = status === "LoadingMore";

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

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    console.log(body, image);
    try {
      setPending(true);
      editorRef.current?.setContents([{ insert: "\n" }]);
      editorRef.current?.enable(false);

      const values: CreateMessageValue = {
        channelId,
        workspaceId,
        parentMessageId: messageId,
        body,
        image: undefined,
      };

      if (image) {
        const url = await generateURL({}, { throwError: true });
        if (!url) {
          throw new Error("Failed To Generate Upload Url");
        }

        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        });

        if (!result.ok) {
          throw new Error("Failed To Upload Image");
        }

        const { storageId } = await result.json();
        values.image = storageId;
      }

      createMessage(values, { throwError: true });
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setPending(false);
      editorRef.current?.enable(true);
    }
  };

  const groupedMessages = results?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
      return groups;
    },
    {} as Record<string, typeof results>
  );

  if (messageLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center px-4 h-[49px] border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <X className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="h-full flex justify-center items-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center px-4 h-[49px] border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <X className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="h-full flex flex-col gap-y-2 justify-center items-center">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Message not found. It may have been deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center px-4 h-[49px] border-b">
        <p className="text-lg font-bold">Thread</p>
        <Button onClick={onClose} size="iconSm" variant="ghost">
          <X className="size-5 stroke-[1.5]" />
        </Button>
      </div>
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
                  hideThreadButton
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
        <Message
          hideThreadButton
          memberId={message.memberId}
          authorImage={message.user.image}
          authorName={message.user.name}
          body={message.body}
          image={message.image}
          createdAt={message._creationTime}
          updatedAt={message.updatedAt}
          id={message._id}
          reactions={message.reactions}
          isEditing={editingId === message._id}
          isAuthor={message.memberId === currentMember?._id}
          setEditingId={setEditingId}
        />
      </div>
      <div className="px-4">
        <Editor
          onSubmit={handleSubmit}
          disabled={pending}
          innerRef={editorRef}
          placeholder="Reply..."
        />
      </div>
    </div>
  );
};

export default Thread;
