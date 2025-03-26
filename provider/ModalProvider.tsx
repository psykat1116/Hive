"use client";
import { useEffect, useState } from "react";
import WorkSpaceModal from "@/components/modal/WorkSpaceModal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <WorkSpaceModal />
    </>
  );
};

export default ModalProvider;
