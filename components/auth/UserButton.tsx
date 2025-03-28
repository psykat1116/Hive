"use client";
import { useCurrentUser } from "@/hook/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!data) {
    return null;
  }

  const { image, name, email } = data;
  const avatarFallback = name![0].toUpperCase();

  return (
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
        align="start"
        sideOffset={10}
        side="top"
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
  );
};

export default UserButton;
