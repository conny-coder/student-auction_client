import { errorCatch } from "@/api/api.helpers";
import { UserService } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useChangePassword = () => {
  return useMutation({
    mutationKey: ['change password'],
    mutationFn: ({oldPassword, password}: {oldPassword: string, password: string}) => UserService.changePassword({oldPassword, password}),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Пароль',
        text2: 'Успішно змінено',
      })
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Пароль',
        text2: errorCatch(error),
      })

      console.log('Error changing password', error);
    },
  })
};