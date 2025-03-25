"use client";
import UserButton from "@/components/auth/UserButton";
import { useGetWorkSpaces } from "@/hook/useGetWorkSpaces";
import { useCreateWorkSpaceModal } from "@/store/useCreateWorkSpaceModal";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

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
  }, [workspaceId, isLoading, open, setOpen]);

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default Home;
