import { useState } from "react";
import { Button } from "../ui/button";
import { FaChevronDown } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { Trash } from "lucide-react";
import { Input } from "../ui/input";
import { useConfirm } from "@/hook/useConfirm";
import { useUpdateChannel } from "@/hook/channel/useUpdateChannel";
import { useDeleteChannel } from "@/hook/channel/useDeleteChannel";
import { useChannelId } from "@/hook/params/useChannelId";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
import { useCurrentMember } from "@/hook/member/useCurrentMember";

interface ChannelHeaderProps {
  name: string;
}

const ChannelHeader = ({ name }: ChannelHeaderProps) => {
  const router = useRouter();
  const channelId = useChannelId();
  const workspaceId = useWorkSpaceId();
  const [value, setValue] = useState(name);
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

  const handleOpen = () => {
    if (member?.role !== "admin") return;
    setEditOpen(true);
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
    const ok = await confirm();
    if (!ok) return;

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
        <Dialog>
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
              <Dialog open={editOpen} onOpenChange={handleOpen}>
                <DialogTrigger asChild>
                  <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <p className="test-sm font-semibold">Channel Name</p>
                      {member?.role === "admin" && (
                        <p className="text-sm text-[#126483] hover:underline font-semibold">
                          Edit
                        </p>
                      )}
                    </div>
                    <p className="text-sm"># {name}</p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rename Channel</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4" onSubmit={handleEdit}>
                    <Input
                      value={value}
                      disabled={isChannelUpdating}
                      onChange={handleChange}
                      required
                      autoFocus
                      maxLength={80}
                      minLength={3}
                      placeholder="e.g. 'plan-budget'"
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" disabled={isChannelUpdating}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button disabled={isChannelUpdating} type="submit">
                        Save
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {member?.role === "admin" && (
                <button
                  className="flex items-center justify-between gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600"
                  onClick={handleRemove}
                  disabled={isChannelDeleting}
                >
                  <Trash className="size-4" />
                  <p className="text-sm font-semibold">Delete Channel</p>
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
