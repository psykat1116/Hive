import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";

import { api } from "@/convex/_generated/api";

import { W_Options } from "@/type";
import { W_ResponseType } from "@/type";
import { W_N_RequestType } from "@/type";

export const useUpdateCode = () => {
  const [data, setData] = useState<W_ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "pending" | "settled" | null
  >(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.workspaces.newJoinCode);

  const mutate = useCallback(
    async (values: W_N_RequestType, options?: W_Options) => {
      try {
        setData(null);
        setError(null);

        setStatus("pending");

        const response = await mutation(values);
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus("error");
        options?.onError?.(error as Error);
        if (options?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled");
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
};
