"use client";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGetWorkSpaces } from "@/hook/useGetWorkSpaces";
import { useCreateWorkSpaceModal } from "@/store/useCreateWorkSpaceModal";

const Home = () => {
  const router = useRouter();
  const { data, isLoading } = useGetWorkSpaces();
  const [open, setOpen] = useCreateWorkSpaceModal();

  const workspaceId = useMemo(() => {
    return data?.[0]?._id;
  }, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div className="flex items-center flex-col justify-center h-full bg-gradient-to-br from-rose-300 to-pink-200 shadow-[8px_8px_16px_rgba(0,0,0,0.2),-8px_-8px_16px_rgba(255,255,255,0.5)]">
      <div className="flex flex-col w-[460px] gap-y-4 bg-muted p-6 rounded-md shadow-md">
        <div className="flex items-center justify-center gap-5">
          <Image src="/logo.svg" alt="Logo" width={75} height={75} />
          <div>
            <h1 className="font-bold text-2xl">Welcome To Hive</h1>
            <p className="text-sm text-muted-foreground">
              Your all-in-one workspace for managing your projects, tasks, and
              teams.
            </p>
          </div>
        </div>
        <p className="text-accent-foreground">
          <span className="font-bold">
            You will be redirected to your workspace once it is created.
          </span>{" "}
          If not redirected, click the button below.
        </p>
        <Button
          className="w-full group"
          onClick={() => router.replace(`/workspace/${workspaceId}`)}
        >
          Go To Workspaces
          <MoveRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default Home;
