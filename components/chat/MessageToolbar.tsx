import React from "react";
import { Button } from "../ui/button";
import { MessageSquareText, Pencil, Smile, Trash } from "lucide-react";
import Hint from "../Hint";
import EmojiPopover from "./EmojiPopover";

interface MessageToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
  handleThread: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton?: boolean;
}

const MessageToolbar = ({
  isAuthor,
  isPending,
  handleEdit,
  handleDelete,
  handleThread,
  handleReaction,
  hideThreadButton,
}: MessageToolbarProps) => {
  return (
    <div className="absolute top-0 right-5">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
        <EmojiPopover
          hint="React"
          onEmojiSelect={(emoji) => handleReaction(emoji)}
        >
          <Button variant="ghost" size="iconSm" disabled={isPending}>
            <Smile className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="Reply">
            <Button
              onClick={handleThread}
              variant="ghost"
              size="iconSm"
              disabled={isPending}
            >
              <MessageSquareText className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <>
            <Hint label="Edit">
              <Button
                onClick={handleEdit}
                variant="ghost"
                size="iconSm"
                disabled={isPending}
              >
                <Pencil className="size-4" />
              </Button>
            </Hint>
            <Hint label="Delete">
              <Button
                onClick={handleDelete}
                variant="ghost"
                size="iconSm"
                disabled={isPending}
              >
                <Trash className="size-4" />
              </Button>
            </Hint>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageToolbar;
