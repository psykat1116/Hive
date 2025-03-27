"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import ToolBar from "@/components/toolbar/ToolBar";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkSpaceSidebar from "@/components/workspace/WorkSpaceSidebar";

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
        <ResizablePanelGroup direction="horizontal" autoSaveId="hive-workspace">
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            maxSize={30}
            className="bg-[#5e2c5f]"
          >
            <WorkSpaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={60}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkSpaceIdLayout;
