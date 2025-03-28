import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight } from "lucide-react";

interface ThreadbarProps {
  count?: number;
  image?: string;
  timeStamp?: number;
  onClick?: () => void;
  name?: string;
}

const Threadbar = ({
  count,
  image,
  timeStamp,
  onClick,
  name = "Member",
}: ThreadbarProps) => {
  if (!count || !timeStamp) return null;

  const fallBack = name[0].toUpperCase();

  return (
    <button
      onClick={onClick}
      className="p-1 rounded-md hover:bg-white border border-transparent hover:border-border flex items-center justify-start group/thread-bar transition max-w-[600px]"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="size-6 shrink-0">
          <AvatarImage src={image} />
          <AvatarFallback>{fallBack}</AvatarFallback>
        </Avatar>
        <span className="text-xs text-sky-700 hover:underline font-bold truncate">
          {count} {count > 1 ? "replies" : "reply"}
        </span>
        <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:hidden block">
          Last Reply {formatDistanceToNow(timeStamp, { addSuffix: true })}
        </span>
        <span className="text-xs text-muted-foreground truncate group-hover/thred-bar:block hidden">
          View Thread
        </span>
      </div>
      <ChevronRight className="size-4 text-muted-foreground ml-auto opacity-0 group-hover/thread-bar:opacity-100 transition shrink-0" />
    </button>
  );
};

export default Threadbar;
