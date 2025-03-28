import { useQueryState } from "nuqs";

// TODO: Can It be removed

export const useParentMessageId = () => {
  return useQueryState("parentMessageId");
};