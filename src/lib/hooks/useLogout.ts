import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logout } from "../api";
import { toast } from "sonner";
import { clearAuthClear } from "../helpers/cookie";
import { useAuthStore } from "@/store/authStore";
import { ApiErrorResponse, promiseErrorFunction } from "../types";

export const useLogout = () => {
  const router = useRouter();

  const clearCurrentUser = useAuthStore((state) => state.clearCurrentUser);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout successfully");
      clearAuthClear("walletwiseEventAdminToken");
      clearCurrentUser();
      queryClient.clear();
      router.push("/");
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  return { isLoggingOut: isPending, logout: () => mutate() };
};
