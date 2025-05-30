"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import VerificationInput from "react-verification-input";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useJoin } from "@/hook/workspace/useJoin";
import { useWorkSpaceId } from "@/hook/params/useWorkSpaceId";
import { useGetWorkSpaceInfo } from "@/hook/workspace/useGetWorkSpaceInfo";

const JoinPage = () => {
  const router = useRouter();
  const workspaceId = useWorkSpaceId();
  const { data, isLoading } = useGetWorkSpaceInfo({ id: workspaceId });
  const { mutate, isPending } = useJoin();
  const isMember = useMemo(() => data?.isMember, [data]);

  const handleComplete = (value: string) => {
    mutate(
      { workspaceId, joinCode: value },
      {
        onSuccess: (id) => {
          toast.success("Successfully joined workspace");
          router.replace(`/workspaces/${id}`);
        },
        onError: () => {
          toast.error("Failed to join workspace");
        },
      }
    );
  };

  useEffect(() => {
    if (isMember) {
      router.replace(`/workspace/${workspaceId}`);
    }
  }, [isMember, router, workspaceId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
      <Image src="/logo.svg" width={60} height={60} alt="Logo" />
      <div className="flex flex-col gap-y-4 items-center justofy-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join {data?.name}</h1>
          <p className="text-md text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <VerificationInput
          classNames={{
            container: cn(
              "flex gap-x-2",
              isPending && "opacity-50 cursor-not-allowed"
            ),
            character:
              "h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
          length={6}
          onComplete={handleComplete}
        />
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back To Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
