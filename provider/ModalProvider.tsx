"use client";
import WorkSpaceModal from "@/components/modal/WorkSpaceModal";
import { useEffect, useState } from "react";

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
