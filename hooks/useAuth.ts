import { useAuthStore } from "@/store/useAuthStore";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);

  return user;
};
