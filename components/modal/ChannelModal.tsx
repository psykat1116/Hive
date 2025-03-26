import { useCreateChannelModal } from "@/store/useCreateChannelModal";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateChannel } from "@/hook/useCreateChannel";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";

const ChannelModal = () => {
  const workspaceId = useWorkSpaceId();
  const router = useRouter();
  const [name, setName] = useState("");
  const [open, setOpen] = useCreateChannelModal();
  const { mutate, isPending } = useCreateChannel();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name, workspaceId },
      {
        onSuccess(id) {
          toast.success("Channel created successfully");
          router.push(`/workspace/${workspaceId}/channel/${id}`);
          handleClose();
        },
        onError() {
          toast.error("Failed to create channel");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col max-sm:items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              height={40}
              width={40}
              className="mb-2"
            />
            Create a Channel
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
            placeholder="Channel name e.g. 'plan-budget'"
            onChange={(e) => handleChange(e)}
          />
          <div className="flex justify-end">
            <Button disabled={isPending} type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelModal;
