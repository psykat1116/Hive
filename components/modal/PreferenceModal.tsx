import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useUpdateWorkSpace } from "@/hook/workspace/useUpdateWorkSpace";
import { useDeleteWorkSpace } from "@/hook/workspace/useDeleteWorkSpace";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
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
    "You are about to delete this workspace. This action cannot be undone."
  );

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkSpace(
      { id: workspaceId, name: value },
      {
        onSuccess: () => {
          setEditOpen(false);
          toast.success("Workspace updated successfully");
        },
        onError: () => {
          toast.error("Failed to update workspace");
        },
      }
    );
  };

  const handleRemove = async () => {
    setOpen(false);
    const ok = await confirm();
    if (!ok) {
      setOpen(true);
      return;
    }

    deleteWorkSpace(
      { id: workspaceId },
      {
        onSuccess: () => {
          router.replace("/");
          toast.success("Workspace deleted successfully");
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
            <div className="relative px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
              <div className="flex items-start justify-between gap-y-1.5 flex-col">
                <div className="flex justify-between items-center gap-2 w-full">
                  <p className="text-sm font-semibold">Workspace name</p>
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
                      disabled={isUpdatingWorkSpace}
                      onChange={(e) => setValue(e.target.value)}
                      required
                      autoFocus
                      maxLength={80}
                      minLength={3}
                      placeholder="Workspace name"
                    />
                    <div className="flex justify-end gap-x-2">
                      <div>
                        <Button
                          variant="outline"
                          disabled={isUpdatingWorkSpace}
                          onClick={() => setEditOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                      <Button disabled={isUpdatingWorkSpace} type="submit">
                        Update
                      </Button>
                    </div>
                  </form>
                ) : (
                  <p className="text-sm">{value}</p>
                )}
              </div>
            </div>
            <button
              disabled={isDeletingWorkSpace}
              onClick={handleRemove}
              className="flex items-center justify-between gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
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
