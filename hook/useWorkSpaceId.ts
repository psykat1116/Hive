"use client";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

export const useWorkSpaceId = () => {
  const { workspaceId } = useParams();
  return workspaceId as Id<"workspaces">;
};
