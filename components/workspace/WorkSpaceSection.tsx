import { PlusIcon } from "lucide-react";

import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex px-2 flex-col mt-1">
      <div className="flex items-center group mb-1">
        <Button
          variant="transparent"
          size="sm"
          className="group p-1.5 h-[28px] justify-start overflow-hidden text-sm text-[#f9edfc] hover:bg-none"
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
      {children}
    </div>
  );
};

export default WorkSpaceSection;
