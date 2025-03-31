import { usePathname } from "next/navigation";
import { AlertTriangle, HashIcon, Loader } from "lucide-react";

import UserItem from "@/components/sidebar/UserItem";
import SidebarItem from "@/components/sidebar/SidebarItem";
import WorkSpaceHeader from "@/components/workspace/WorkSpaceHeader";
import WorkSpaceSection from "@/components/workspace/WorkSpaceSection";

import { useCreateChannelModal } from "@/store/useCreateChannelModal";

import { useMemberId } from "@/hook/params/useMemberId";
import { useChannelId } from "@/hook/params/useChannelId";
import { useGetMembers } from "@/hook/member/useGetMembers";
import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
import { useGetChannels } from "@/hook/channel/useGetChannels";
import { useCurrentMember } from "@/hook/member/useCurrentMember";
import { useGetWorkSpace } from "@/hook/workspace/useGetWorkSpace";

const WorkSpaceSidebar = () => {
  const memberId = useMemberId();
  const pathname = usePathname();
  const channelId = useChannelId();
  const workspaceId = useWorkSpaceId();
  const { openModal } = useCreateChannelModal();
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

  if (memberLoading || worksapceLoading || channelsLoading || membersLoading) {
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
      <div className="flex-1">
        {pathname.includes("/channel") && (
          <WorkSpaceSection
            label="Channels"
            hint="New Channel"
            onNew={member.role === "admin" ? openModal : undefined}
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
        )}
        {pathname.includes("/member") && (
          <WorkSpaceSection label="Direct Messages" hint="New Direct Messages">
            {members?.map((item) => (
              <UserItem
                key={item._id}
                id={item._id}
                label={item.user.name}
                image={item.user.image}
                variant={item._id === memberId ? "active" : "default"}
              />
            ))}
          </WorkSpaceSection>
        )}
      </div>
      <WorkSpaceHeader workspace={workspace} />
    </div>
  );
};

export default WorkSpaceSidebar;
