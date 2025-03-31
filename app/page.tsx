"use client";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader, MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetWorkSpaces } from "@/hook/workspace/useGetWorkSpaces";
import { useCreateWorkSpaceModal } from "@/store/useCreateWorkSpaceModal";

const Home = () => {
  const router = useRouter();
  const { data, isLoading } = useGetWorkSpaces();
  const { isOpen, openModal } = useCreateWorkSpaceModal();

  const workspaceId = useMemo(() => {
    return data?.[0]?._id;
  }, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!isOpen) {
      openModal();
    }
  }, [workspaceId, isLoading, isOpen, openModal, router]);

  return (
    <div className="flex items-center flex-col justify-center h-full bg-gradient-to-br from-rose-300 to-pink-200 shadow-[8px_8px_16px_rgba(0,0,0,0.2),-8px_-8px_16px_rgba(255,255,255,0.5)]">
      <div className="flex flex-col w-[460px] gap-y-4 bg-muted p-6 rounded-md shadow-md">
        <div className="flex items-center justify-center gap-4">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          <div>
            <h1 className="font-bold text-2xl">Welcome To Hive</h1>
            <p className="text-sm text-muted-foreground">
              Your all-in-one workspace for managing your projects, tasks, and
              teams.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-accent-foreground text-left">
            <strong>You will be redirected to your workspace</strong>
            <br /> If not redirected, click the button below
          </p>
          <Loader className="animate-spin size-5 text-muted-foreground mr-6" />
        </div>
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
