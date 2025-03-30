import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { ChevronUpIcon, Plus } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateWorkSpaceModal } from "@/store/useCreateWorkSpaceModal";
import { useGetWorkSpaces } from "@/hook/workspace/useGetWorkSpaces";

interface WorkSpaceHeaderProps {
  workspace: Doc<"workspaces">;
}

const WorkSpaceHeader = ({ workspace }: WorkSpaceHeaderProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: workspaces } = useGetWorkSpaces();
  const { openModal } = useCreateWorkSpaceModal();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex items-center justify-between px-2 h-[49px] gap-0.5">
      <Button
        onClick={() => setIsOpen(true)}
        variant="transparent"
        className="font-semibold text-lg w-full p-1 overflow-hidden justify-between rounded-sm"
      >
        <span className="truncate">{workspace.name}</span>
        <ChevronUpIcon className="size-4 shrink-0 ml-2" />
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No Workspace found.</CommandEmpty>
          <CommandGroup heading="Workspace">
            {workspaces?.map((w) => {
              return (
                <CommandItem
                  key={w._id}
                  onSelect={() => router.push(`/workspace/${w._id}`)}
                  disabled={w._id === workspace._id}
                >
                  <div className="size-7 relative overflow-hidden bg-[#616061] text-white font-semibold text-md rounded-md flex items-center justify-center">
                    {w.name[0].toUpperCase()}
                  </div>
                  <p className="truncate">{w.name}</p>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                openModal();
                setIsOpen(false);
              }}
            >
              <div className="size-9 relative overflow-hidden  bg-[#F2F2F2] text-slate-800 font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                <Plus />
              </div>
              Create a new workspace
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default WorkSpaceHeader;
