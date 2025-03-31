"use client";
import { useParams } from "next/navigation";

import { Id } from "@/convex/_generated/dataModel";

export const useWorkSpaceId = () => {
  const { workspaceId } = useParams();
  return workspaceId as Id<"workspaces">;
};
