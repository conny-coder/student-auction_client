import { errorCatch } from "@/api/api.helpers";
import { AuctionService } from "@/services/auction.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useDeleteAuction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete auction'],
    mutationFn: ({ auctionId }: { auctionId: string }) =>
      AuctionService.delete(auctionId).then(() => {}),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Лот',
        text2: 'Успішно видалено',
      })

      queryClient.invalidateQueries({queryKey: ['all-auctions']});
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Лот',
        text2: errorCatch(error),
      })
    },
  });
};