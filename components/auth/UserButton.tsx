"use client";
import { useCurrentUser } from "@/hook/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, LogOut, Settings, UserPlus } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import PreferenceModal from "../modal/PreferenceModal";
import InviteModal from "../modal/InviteModal";

interface UserButtonProps {
  align?: "end" | "start" | "center";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  data?: Doc<"workspaces"> | null;
  isAdmin: boolean;
}

const UserButton = ({
  align = "start",
  side = "top",
  sideOffset = 10,
  data,
  isAdmin,
}: UserButtonProps) => {
  const { signOut } = useAuthActions();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [preferenceOpen, setPreferenceOpen] = useState(false);
  const { data: currentUser, isLoading: isMemberLoading } = useCurrentUser();

  if (isMemberLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!currentUser || !data) {
    return null;
  }

  const { image, name, email } = currentUser;
  const avatarFallback = name![0].toUpperCase();

  return (
    <>
      <PreferenceModal
        open={preferenceOpen}
        setOpen={setPreferenceOpen}
        initialValue={data.name}
      />
      <InviteModal
        open={inviteOpen}
        setInviteOpen={setInviteOpen}
        name={data.name}
        code={data.joinCode}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative cursor-pointer">
          <Avatar className="size-8 hover:opacity-75 transition">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-sky-600">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          sideOffset={sideOffset}
          side={side}
          className="w-60 gap-2 px-2"
        >
          <DropdownMenuItem className="flex gap-2 items-center justify-between">
            <Avatar className="size-8 hover:opacity-75 transition">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="bg-sky-600">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-right">
              <span className="font-semibold">{name}</span>
              <span className="text-muted-foreground text-[11px]">{email}</span>
            </div>
          </DropdownMenuItem>
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setPreferenceOpen(true)}
                className="cursor-pointer h-8 flex justify-between items-center"
              >
                <Settings className="size-3 ml-2" />
                <p className="text-xs">Settings</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setInviteOpen(true)}
                className="cursor-pointer h-8 flex justify-between items-center"
              >
                <UserPlus className="size-3 ml-2" />
                <p className="text-xs">Invite</p>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={signOut}
            className="cursor-pointer h-8 flex justify-between items-center"
          >
            <LogOut className="size-3 ml-2" />
            <p className="text-xs">Log out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserButton;
