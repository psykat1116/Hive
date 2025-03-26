import React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Copy, RefreshCcw } from "lucide-react";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";
import { toast } from "sonner";
import { useUpdateCode } from "@/hook/useUpdateCode";
import { useConfirm } from "@/hook/useConfirm";

interface InviteModalProps {
  open: boolean;
  setInviteOpen: (open: boolean) => void;
  name: string;
  code: string;
}

const InviteModal = ({ open, setInviteOpen, name, code }: InviteModalProps) => {
  const workspaceId = useWorkSpaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to generate a new invite code?",
    "This will deaactivate the current invite code and generate a new one."
  );
  const { mutate, isPending } = useUpdateCode();

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Link copied to clipboard");
    });
  };

  const handleNewCode = async () => {
    const ok = await confirm();
    if (!ok) return;
    mutate(
      { workspaceId },
      {
        onSuccess: () => {
          toast.success("Invite code generated");
        },
        onError: () => {
          toast.error("Failed to generate Invite Code");
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite People To {name}</DialogTitle>
            <DialogDescription>
              Share this code with others to invite them to this workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            <p className="text-4xl tracking-widest font-bold">{code}</p>
            <Button
              disabled={isPending}
              onClick={handleCopy}
              variant="ghost"
              size="sm"
            >
              Copy Link
              <Copy className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex itemsc-center justify-between w-full">
            <Button
              disabled={isPending}
              onClick={handleNewCode}
              variant="outline"
            >
              New Code
              <RefreshCcw className="size-4 ml-2" />
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InviteModal;
