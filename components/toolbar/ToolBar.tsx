"use client";
import { Button } from "../ui/button";
import { Info, Search } from "lucide-react";
import { useGetWorkSpace } from "@/hook/workspace/useGetWorkSpace";
import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
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
import { useGetChannels } from "@/hook/channel/useGetChannels";
import { useGetMembers } from "@/hook/member/useGetMembers";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import UserButton from "../auth/UserButton";
import Link from "next/link";
import { useCurrentMember } from "@/hook/member/useCurrentMember";

const ToolBar = () => {
  const router = useRouter();
  const workspaceId = useWorkSpaceId();
  const [open, setOpen] = useState(false);
  const { data } = useGetWorkSpace({ id: workspaceId });
  const { data: channels } = useGetChannels({ workspaceId });
  const { data: members } = useGetMembers({ workspaceId });
  const { data: member } = useCurrentMember({
    workspaceId,
  });

  const onChannelClick = (id: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/channel/${id}`);
  };

  const onMemberClick = (id: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/member/${id}`);
  };

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-13 p-1.5 px-3.5 gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-xl font-semibold text-white"
      >
        <Image src="/logo.svg" alt="Logo" height={30} width={30} />
      </Link>
      <div className="min-w-[100px] max-w-[642px] grow-[2] shrink">
        <Button
          size="sm"
          onClick={() => setOpen(true)}
          className="bg-accent/25 hover:bg-accent/25 w-full justify-between items-center h-8 px-2"
        >
          <div className="flex items-center">
            <Search className="size-4 text-white mr-2" />
            <span className="text-white text-xs">Search {data?.name}</span>
          </div>
          <kbd>
            <span className="text-[10px] text-white">⌘</span>
            <span className="text-[13px] text-white ml-1">S</span>
          </kbd>
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={`Search in ${data?.name}...`} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Channels">
            {channels?.map((c) => (
              <CommandItem key={c._id} onSelect={() => onChannelClick(c._id)}>
                # {c.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Members">
            {members?.map((m) => {
              const fallback = m.user.name?.[0].toUpperCase() ?? "M";
              return (
                <CommandItem key={m._id} onSelect={() => onMemberClick(m._id)}>
                  <Avatar>
                    <AvatarImage src={m.user.image} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                  </Avatar>
                  {m.user.name}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <div className="flex items-center justify-end">
        <UserButton
          align="end"
          data={data}
          isAdmin={member?.role === "admin"}
        />
      </div>
    </nav>
  );
};

export default ToolBar;
