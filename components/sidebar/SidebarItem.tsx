import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { Button } from "../ui/button";
import Link from "next/link";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sidebarItemVariants = cva(
  "flex items-center justify-start h-7 -ml-1 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edfc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarItemProps {
  label: string;
  icon: LucideIcon | IconType;
  id: string;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
}

const SidebarItem = ({ label, icon: Icon, id, variant }: SidebarItemProps) => {
  const workspaceId = useWorkSpaceId();

  return (
    <Button
      variant="transparent"
      size="sm"
      asChild
      className={cn(sidebarItemVariants({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
