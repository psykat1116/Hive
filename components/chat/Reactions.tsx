import { MdOutlineAddReaction } from "react-icons/md";

import { cn } from "@/lib/utils";
import { Doc, Id } from "@/convex/_generated/dataModel";

import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
import { useCurrentMember } from "@/hook/member/useCurrentMember";

import Hint from "@/components/Hint";
import EmojiPopover from "@/components/chat/EmojiPopover";

interface ReactionsProps {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onChange: (reaction: string) => void;
}

const Reactions = ({ data, onChange }: ReactionsProps) => {
  const workspaceId = useWorkSpaceId();
  const { data: currentMember } = useCurrentMember({ workspaceId });
  const currentMemberId = currentMember?._id;

  if (data.length === 0 || !currentMemberId) return null;

  return (
    <div className="flex items-center gap-1 mt-1 mb-1">
      {data.map((r) => (
        <Hint
          key={r._id}
          label={`${r.count} ${r.count === 1 ? "Person" : "Peple"} reacted with ${r.value}`}
        >
          <button
            className={cn(
              "h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
              r.memberIds.includes(currentMemberId) &&
                "bg-blue-100/70 border-blue-500"
            )}
            onClick={() => onChange(r.value)}
          >
            {r.value}
            <span
              className={cn(
                "text-xs font-semibold text-muted-foreground",
                r.memberIds.includes(currentMemberId) && "text-blue-500"
              )}
            >
              {r.count}
            </span>
          </button>
        </Hint>
      ))}
      <EmojiPopover
        hint="Add Reactions"
        onEmojiSelect={(emoji) => onChange(emoji)}
      >
        <button className="h-6 px-3 bg-slate-200/70 rounded-full border border-transparent hover:border-slate-500 text-slate-800 flex items-center gap-x-1">
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};

export default Reactions;
