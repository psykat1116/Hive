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
import { usePanel } from "@/hook/usePanel";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import Thread from "@/components/thread/Thread";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkSpaceIdLayout = ({ children }: WorkSpaceIdLayoutProps) => {
  const { parentMessageId, onClose } = usePanel();
  const showPanel = !!parentMessageId;

  return (
    <div className="h-full">
      <ToolBar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal" autoSaveId="hive-workspace">
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            maxSize={25}
            className="bg-[#5e2c5f]"
          >
            <WorkSpaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                  <Thread
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Loader className="size-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkSpaceIdLayout;
