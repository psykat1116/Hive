"use client";
import { useEffect, useState } from "react";
import WorkSpaceModal from "@/components/modal/WorkSpaceModal";
import ChannelModal from "@/components/modal/ChannelModal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <WorkSpaceModal />
      <ChannelModal />
    </>
  );
};

export default ModalProvider;
