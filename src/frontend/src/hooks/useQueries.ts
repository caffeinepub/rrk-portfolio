import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContactMessage } from "../backend.d";
import { useActor } from "./useActor";

export function useSubmitContactMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      subject,
      message,
    }: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      // biome-ignore lint/suspicious/noExplicitAny: backend interface is narrowly typed at source
      return (actor as any).submitContactMessage(
        name,
        email,
        subject,
        message,
      ) as Promise<bigint>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
    },
  });
}

export function useGetContactMessages() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactMessage[]>({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      // biome-ignore lint/suspicious/noExplicitAny: backend interface is narrowly typed at source
      return (actor as any).getContactMessages() as Promise<ContactMessage[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      // biome-ignore lint/suspicious/noExplicitAny: backend interface is narrowly typed at source
      return (actor as any).isCallerAdmin() as Promise<boolean>;
    },
    enabled: !!actor && !isFetching,
  });
}
