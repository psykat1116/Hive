"use client";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader } from "lucide-react";
import { useGetChannels } from "@/hook/channel/useGetChannels";
import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
import { useGetWorkSpace } from "@/hook/workspace/useGetWorkSpace";
import { useCurrentMember } from "@/hook/member/useCurrentMember";
import { useCreateChannelModal } from "@/store/useCreateChannelModal";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

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
    open,
    router,
    member,
    isAdmin,
    setOpen,
    channelId,
    workspace,
    workspaceId,
    memberLoading,
    workspaceLoading,
    channelsLoading,
  ]);

  if (workspaceLoading || channelsLoading || memberLoading) {
    return <Loading />;
  }

  if (!workspace || !member) {
    return <Error content="Workspace not found" />;
  }

  return (
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Channel Not Found</span>
    </div>
  );
};

export default WorkSpaceIdPage;
