import { useAuth } from "@/hooks/useAuth";
import { UserService } from "@/services/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IProfileForm } from "./ChangeProfile";
import Toast from "react-native-toast-message";
import { errorCatch } from "@/api/api.helpers";

export const useChangeProfile = () => {
  const user = useAuth()

  const {data, isLoading, refetch} = useQuery({
    queryKey: ["change profile"],
    queryFn: () => UserService.getById(user?._id || ""),
    select: ({data}) => data,
    enabled: !!user
  })

  const {mutate} = useMutation({
    mutationKey: ["change profile"],
    mutationFn: (data: IProfileForm) => UserService.updateProfile(user?._id || "", data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Профіль',
        text2: 'Успішно змінено',
      })

      refetch();
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Профіль',
        text2: errorCatch(error),
      })
    }
  })

  return {data, isLoading, mutate}
};