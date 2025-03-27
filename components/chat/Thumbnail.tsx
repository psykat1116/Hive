/* eslint-disable @next/next/no-img-element */

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { X } from "lucide-react";

interface ThumbnailProps {
  url: string | null | undefined;
}

const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
          <img
            src={url}
            alt="Message Image"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle />
      </DialogHeader>
      <DialogContent className="max-w-[800px] bg-transparent shadow-none border-none p-0 cursor-pointer">
        <img
          src={url}
          alt="Message Image"
          className="rounded-md object-cover size-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default Thumbnail;
