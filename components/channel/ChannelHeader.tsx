import { toast } from "sonner";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useConfirm } from "@/hook/useConfirm";
import { useChannelId } from "@/hook/params/useChannelId";
import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
import { useCurrentMember } from "@/hook/member/useCurrentMember";
import { useUpdateChannel } from "@/hook/channel/useUpdateChannel";
import { useDeleteChannel } from "@/hook/channel/useDeleteChannel";

interface ChannelHeaderProps {
  name: string;
}

const ChannelHeader = ({ name }: ChannelHeaderProps) => {
  const router = useRouter();
  const channelId = useChannelId();
  const workspaceId = useWorkSpaceId();
  const [value, setValue] = useState(name);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { data: member } = useCurrentMember({ workspaceId });
  const { mutate: updateChannel, isPending: isChannelUpdating } =
    useUpdateChannel();
  const { mutate: deleteChannel, isPending: isChannelDeleting } =
    useDeleteChannel();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are You Sure To Delete This Channel?",
    "You are about to delete the channel and its conversations. This Action Is Irreversible"
  );

  const handleOpen = (value: boolean) => {
    if (member?.role !== "admin") return;
    setOpen(value);
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateChannel(
      { channelId, name: value },
      {
        onSuccess: () => {
          toast.success("Channel updated successfully");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update channel");
        },
      }
    );
  };

  const handleRemove = async () => {
    setOpen(false);
    setEditOpen(false);

    const ok = await confirm();
    if (!ok) {
      setOpen(true);
      return;
    }

    deleteChannel(
      { id: channelId },
      {
        onSuccess: () => {
          toast.success("Chamnel deleted successfully");
          router.replace(`/workspace/${workspaceId}`);
        },
        onError: () => {
          toast.error("Failed to delete channel");
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-");
    setValue(value);
  };

  return (
    <>
      <ConfirmDialog />
      <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
        <Dialog open={open} onOpenChange={handleOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-lg font-semibold px-2 overflow-hidden w-auto"
              size="sm"
            >
              <span># {name}</span>
              <FaChevronDown className="size-2.5 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-gray-50 overflow-hidden">
            <DialogHeader className="p-4 border-b bg-white">
              <DialogTitle># {name}</DialogTitle>
            </DialogHeader>
            <div className="px-4 pb-4 flex flex-col gap-y-2">
              <div className="relative px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-start justify-between gap-y-1.5 flex-col">
                  <div className="flex justify-between items-center gap-2 w-full">
                    <p className="text-sm font-semibold">Channel name</p>
                    <p
                      className="text-sm text-[#1264a3] hover:underline font-semibold"
                      onClick={() => setEditOpen(true)}
                    >
                      Edit
                    </p>
                  </div>
                  {editOpen ? (
                    <form className="space-y-4 w-full" onSubmit={handleEdit}>
                      <Input
                        value={value}
                        disabled={isChannelUpdating}
                        onChange={handleChange}
                        required
                        autoFocus
                        maxLength={80}
                        minLength={3}
                        placeholder="Channel name"
                      />
                      <div className="flex justify-end gap-x-2">
                        <div>
                          <Button
                            variant="outline"
                            disabled={isChannelUpdating}
                            onClick={() => setEditOpen(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                        <Button disabled={isChannelUpdating} type="submit">
                          Update
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-sm">{value}</p>
                  )}
                </div>
              </div>
              {member?.role === "admin" && (
                <button
                  disabled={isChannelDeleting}
                  onClick={handleRemove}
                  className="flex items-center justify-between gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
                >
                  <Trash className="size-4" />
                  <p className="text-sm font-semibold">Delete Workspace</p>
                </button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ChannelHeader;
