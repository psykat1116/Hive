"use client";
import { Loader } from "lucide-react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { usePanel } from "@/hook/usePanel";
import Thread from "@/components/thread/Thread";
import ToolBar from "@/components/toolbar/ToolBar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Id } from "@/convex/_generated/dataModel";
import Profile from "@/components/profile/Profile";
import WorkSpaceSidebar from "@/components/workspace/WorkSpaceSidebar";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkSpaceIdLayout = ({ children }: WorkSpaceIdLayoutProps) => {
  const { parentMessageId, onClose, memberProfileId } = usePanel();
  const showPanel = !!parentMessageId || !!memberProfileId;

  return (
    <div className="h-full">
      <ToolBar />
      <div className="flex h-[calc(100vh-52px)]">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal" autoSaveId="hive-workspace">
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={25}
            className="bg-[#5e2c5f]"
          >
            <WorkSpaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20} defaultSize={80}>
            {children}
          </ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={20} maxSize={25}>
                {parentMessageId ? (
                  <Thread
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : memberProfileId ? (
                  <Profile
                    memberId={memberProfileId as Id<"members">}
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
