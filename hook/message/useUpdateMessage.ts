import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";

import { api } from "@/convex/_generated/api";

import { M_Options } from "@/type";
import { M_ResponseType } from "@/type";
import { M_U_RequestType } from "@/type";

export const useUpdateMessage = () => {
  const [data, setData] = useState<M_ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "pending" | "settled" | null
  >(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.messages.update);

  const mutate = useCallback(
    async (values: M_U_RequestType, options?: M_Options) => {
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
