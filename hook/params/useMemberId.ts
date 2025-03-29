"use client";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

export const useMemberId = () => {
  const { memberId } = useParams();
  return memberId as Id<"members">;
};
