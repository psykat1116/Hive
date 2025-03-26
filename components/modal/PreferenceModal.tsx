import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Trash } from "lucide-react";
import { useUpdateWorkSpace } from "@/hook/useUpdateWorkSpace";
import { useDeleteWorkSpace } from "@/hook/useDeleteWorkSpace";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hook/useConfirm";

interface PreferenceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

const PreferenceModal = ({
  open,
  setOpen,
  initialValue,
}: PreferenceModalProps) => {
  const router = useRouter();
  const workspaceId = useWorkSpaceId();
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkSpace, isPending: isUpdatingWorkSpace } =
    useUpdateWorkSpace();
  const { mutate: deleteWorkSpace, isPending: isDeletingWorkSpace } =
    useDeleteWorkSpace();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are You Sure?",
    "This Action Is Irreversible"
  );

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkSpace(
      { id: workspaceId, name: value },
      {
        onSuccess: () => {
          toast.success("Workspace updated successfully");
          setEditOpen(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) return;

    deleteWorkSpace(
      { id: workspaceId },
      {
        onSuccess: () => {
          toast.success("Workspace deleted successfully");
          setOpen(false);
          router.replace("/");
        },
        onError: () => {
          toast.error("Failed to delete workspace");
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Workspace name</p>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm">{value}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleEdit}>
                  <Input
                    value={value}
                    disabled={isUpdatingWorkSpace}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    autoFocus
                    maxLength={80}
                    minLength={3}
                    placeholder="Workspace name"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isUpdatingWorkSpace}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingWorkSpace} type="submit">
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button
              disabled={isDeletingWorkSpace}
              onClick={handleRemove}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
            >
              <Trash className="size-4" />
              <p className="text-sm font-semibold">Delete Workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreferenceModal;
