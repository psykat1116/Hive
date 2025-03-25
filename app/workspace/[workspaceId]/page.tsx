"use client";
import { useGetWorkSpace } from "@/hook/useGetWorkSpace";
import { useWorkSpaceId } from "@/hook/useWorkSpaceId";

const WorkSpaceIdPage = () => {
  const workspaceId = useWorkSpaceId();
  const { data } = useGetWorkSpace({ id: workspaceId });

  return <div></div>;
};

export default WorkSpaceIdPage;
