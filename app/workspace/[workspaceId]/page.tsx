"use client";
import { useCurrentMember } from "@/hook/useCurrentMember";
import { useGetChannels } from "@/hook/useGetChannels";
import { useGetWorkSpace } from "@/hook/useGetWorkSpace";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";
import { useCreateChannelModal } from "@/store/useCreateChannelModal";
import { AlertTriangle, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const WorkSpaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkSpaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkSpace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => {
    return channels?.[0]?._id;
  }, [channels]);
  const isAdmin = useMemo(() => {
    return member?.role === "admin";
  }, [member]);

  useEffect(() => {
    if (
      workspaceLoading ||
      channelsLoading ||
      !workspace ||
      memberLoading ||
      !member
    )
      return;
    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    channelId,
    workspace,
    workspaceLoading,
    channelsLoading,
    open,
    setOpen,
    router,
    workspaceId,
    member,
    memberLoading,
    isAdmin,
  ]);

  if (workspaceLoading || channelsLoading || memberLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <AlertTriangle className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace Not Found
        </span>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Channel Not Found</span>
    </div>
  );
};

export default WorkSpaceIdPage;
