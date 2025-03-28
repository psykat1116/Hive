import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import {
  ChevronDownIcon,
  ListFilter,
  Settings,
  SquarePen,
  UserPlus,
} from "lucide-react";
import Hint from "@/components/Hint";
import PreferenceModal from "@/components/modal/PreferenceModal";
import InviteModal from "../modal/InviteModal";

interface WorkSpaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

const WorkSpaceHeader = ({ workspace, isAdmin }: WorkSpaceHeaderProps) => {
  const [preferenceOpen, setPreferenceOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      <PreferenceModal
        open={preferenceOpen}
        setOpen={setPreferenceOpen}
        initialValue={workspace.name}
      />
      <InviteModal
        open={inviteOpen}
        setInviteOpen={setInviteOpen}
        name={workspace.name}
        code={workspace.joinCode}
      />
      <div className="flex items-center justify-between px-2 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparent"
              className="font-semibold text-lg w-auto p-1 overflow-hidden"
            >
              <span className="truncate">{workspace.name}</span>
              <ChevronDownIcon className="size-4 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-54">
            <DropdownMenuItem className="cursor-pointer capitalize flex items-center justify-between">
              <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center">
                {workspace.name[0].toUpperCase()}
              </div>
              <div className="flex flex-col items-end">
                <p className="font-bold">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active Workspace
                </p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2 flex justify-between items-center"
                  onClick={() => setInviteOpen(true)}
                >
                  <UserPlus className="size-4" />
                  <span className="text-muted-foreground">Invite</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2 flex justify-between items-center"
                  onClick={() => setPreferenceOpen(true)}
                >
                  <Settings className="size-4" />
                  <span className="text-muted-foreground">Settings</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <Hint label="New Message" side="bottom">
            <Button variant="transparent" size="iconSm">
              <SquarePen className="size-4" />
            </Button>
          </Hint>
          <Hint label="Filter Messages" side="bottom">
            <Button variant="transparent" size="iconSm">
              <ListFilter className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};

export default WorkSpaceHeader;
