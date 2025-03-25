import React from "react";
import UserButton from "../auth/UserButton";
import WorkSpaceSwitcher from "../workspace/WorkSpaceSwitcher";
import SidebarButton from "./SidebarButton";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[60px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9] pb-4">
      <WorkSpaceSwitcher />
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton icon={MessagesSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
