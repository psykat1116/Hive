import SidebarButton from "./SidebarButton";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Home,
  Loader,
  MessagesSquare,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
import { useGetWorkSpace } from "@/hook/workspace/useGetWorkSpace";
import { useCreateWorkSpaceModal } from "@/store/useCreateWorkSpaceModal";
import { useCurrentMember } from "@/hook/member/useCurrentMember";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const workspaceId = useWorkSpaceId();
  const [_open, setOpen] = useCreateWorkSpaceModal();
  const { data: member } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkSpace({
    id: workspaceId,
  });

  return (
    <aside className="w-[60px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9] pb-4">
      <Button
        className="size-9 relative overflow-hidden bg-muted hover:bg-muted text-muted-foreground text-xl cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Plus className="size-5 shrink-0" />
      </Button>
      <Button
        className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/70 text-slate-800 text-xl cursor-pointer"
        onClick={() => router.push(`/workspace/${workspaceId}`)}
      >
        {workspaceLoading ? (
          <Loader className="size-5 animate-spin shrink-0" />
        ) : (
          workspace?.name.charAt(0).toUpperCase()
        )}
      </Button>
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/channel")}
        onClick={() => router.push(`/workspace/${workspaceId}`)}
      />
      <SidebarButton
        icon={MessagesSquare}
        label="DMs"
        isActive={pathname.includes("/member")}
        onClick={() =>
          router.push(`/workspace/${workspaceId}/member/${member?._id}`)
        }
      />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
    </aside>
  );
};

export default Sidebar;
