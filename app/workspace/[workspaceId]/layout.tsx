"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import ToolBar from "@/components/toolbar/ToolBar";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkSpaceIdLayout = ({ children }: WorkSpaceIdLayoutProps) => {
  const workspaceId = useWorkSpaceId();
  return (
    <div className="h-full">
      <ToolBar workspaceId={workspaceId} />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default WorkSpaceIdLayout;
