import { useCurrentMember } from "@/hook/useCurrentMember";
import { useGetWorkSpace } from "@/hook/useGetWorkSpace";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import React from "react";
import WorkSpaceHeader from "./WorkSpaceHeader";
import SidebarItem from "../sidebar/SidebarItem";
import { useGetChannels } from "@/hook/useGetChannels";
import WorkSpaceSection from "./WorkSpaceSection";
import { useGetMembers } from "@/hook/useGetMembers";
import UserItem from "../sidebar/UserItem";
import { useCreateChannelModal } from "@/store/useCreateChannelModal";
import { useChannelId } from "@/hook/useChannelId";

const WorkSpaceSidebar = () => {
  const channelId = useChannelId();
  const workspaceId = useWorkSpaceId();
  const [_open, setOpen] = useCreateChannelModal();
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: worksapceLoading } = useGetWorkSpace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  if (memberLoading || worksapceLoading) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] h-full justify-center items-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!member || !workspace) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5e2c5f] h-full justify-center items-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5e2c5f] h-full">
      <WorkSpaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-3 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts and Sent" icon={SendHorizonal} id="drafts" />
      </div>
      <WorkSpaceSection
        label="Channels"
        hint="New Channel"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((c) => (
          <SidebarItem
            key={c._id}
            icon={HashIcon}
            label={c.name}
            id={c._id}
            variant={channelId === c._id ? "active" : "default"}
          />
        ))}
      </WorkSpaceSection>
      <WorkSpaceSection
        label="Direct Messages"
        hint="New Direct Messages"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
          />
        ))}
      </WorkSpaceSection>
    </div>
  );
};

export default WorkSpaceSidebar;
