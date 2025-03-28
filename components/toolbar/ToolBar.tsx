"use client";
import { Button } from "../ui/button";
import { Info, Search } from "lucide-react";
import { useGetWorkSpace } from "@/hook/useGetWorkSpace";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";
import { useGetChannels } from "@/hook/useGetChannels";
import { useGetMembers } from "@/hook/useGetMembers";
import { useRouter } from "next/navigation";

const ToolBar = () => {
  const router = useRouter();
  const workspaceId = useWorkSpaceId();
  const [open, setOpen] = useState(false);
  const { data } = useGetWorkSpace({ id: workspaceId });
  const { data: channels } = useGetChannels({ workspaceId });
  const { data: members } = useGetMembers({ workspaceId });

  const onChannelClick = (id: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/channel/${id}`);
  };

  const onMemberClick = (id: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/member/${id}`);
  };

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
        <Button
          size="sm"
          onClick={() => setOpen(true)}
          className="bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">Search {data?.name}</span>
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Channels">
            {channels?.map((c) => (
              <CommandItem key={c._id} onSelect={() => onChannelClick(c._id)}>
                {c.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Members">
            {members?.map((m) => (
              <CommandItem key={m._id} onSelect={() => onMemberClick(m._id)}>
                {m.user.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};

export default ToolBar;
