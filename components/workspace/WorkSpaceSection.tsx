import React from "react";
import { Button } from "../ui/button";
import { FaCaretDown } from "react-icons/fa";
import Hint from "../Hint";
import { PlusIcon } from "lucide-react";
import { useToggle } from "react-use";
import { cn } from "@/lib/utils";

interface WorkSpaceSectionProps {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
}

const WorkSpaceSection = ({
  children,
  label,
  hint,
  onNew,
}: WorkSpaceSectionProps) => {
  const [on, toggle] = useToggle(false);
  return (
    <div className="flex px-3 flex-col mt-3">
      <div className="flex items-center group">
        <Button
          variant="transparent"
          className="text-sm text-[#f9edfc] p-0 size-6"
          onClick={toggle}
        >
          <FaCaretDown
            className={cn("size-4 transition-transform", !on && "-rotate-90")}
          />
        </Button>
        <Button
          variant="transparent"
          size="sm"
          className="group p-1.5 h-[28px] justify-start overflow-hidden text-sm text-[#f9edfc]"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              size="iconSm"
              variant="transparent"
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edfc] size-6 shrink-0"
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
};

export default WorkSpaceSection;
