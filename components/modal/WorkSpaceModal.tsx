import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCreateWorkSpace } from "@/hook/workspace/useCreateWorkSpace";
import { useCreateWorkSpaceModal } from "@/store/useCreateWorkSpaceModal";

const WorkSpaceModal = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const { isOpen, closeModal } = useCreateWorkSpaceModal();
  const { mutate, isPending } = useCreateWorkSpace();

  const handleClose = () => {
    closeModal();
    setName("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name },
      {
        onSuccess(id) {
          toast.success("Workspace created successfully");
          router.push(`/workspace/${id}`);
          handleClose();
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col max-sm:items-center w-full relative">
            <Header description="Create a workspace" />
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkSpaceModal;
