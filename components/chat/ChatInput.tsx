import { Id } from "@/convex/_generated/dataModel";
import { useChannelId } from "@/hook/useChannelId";
import { useCreateMessage } from "@/hook/useCreateMessage";
import { useUpload } from "@/hook/useUpload";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ChatInputProps {
  placeholder: string;
}

type CreateMessageValue = {
  channelId: Id<"channels">;
  workspaceId: Id<"workspaces">;
  body: string;
  image?: Id<"_storage">;
};

const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [pending, setPending] = useState(false);
  const editorRef = useRef<Quill | null>(null);
  const workspaceId = useWorkSpaceId();
  const channelId = useChannelId();

  const { mutate: generateURL } = useUpload();
  const { mutate: createMessage } = useCreateMessage();
  const Editor = dynamic(() => import("@/components/chat/Editor"), {
    ssr: false,
  });

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
      // editorRef.current?.setContents([{ insert: "\n" }]);
      editorRef.current?.enable(false);

      const values: CreateMessageValue = {
        channelId,
        workspaceId,
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
      setEditorKey((prev) => prev + 1);
      editorRef.current?.enable(true);
    }
  };

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        onSubmit={handleSubmit}
        placeholder={placeholder}
        disabled={pending}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
