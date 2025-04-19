import { errorCatch } from "@/api/api.helpers";
import { BidService } from "@/services/bid.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useAuth } from "./useAuth";

export const useCreateBid = () => {
  const queryClient = useQueryClient();
  const user = useAuth();

  return useMutation({
    mutationKey: ['create bid'],
    mutationFn: ({ auctionId, amount }: { auctionId: string, amount: number }) =>
      BidService.create(auctionId, amount).then(() => {}),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Ставка',
        text2: 'Успішно відправлено',
      })

      queryClient.invalidateQueries({queryKey: ['my balance']});
      queryClient.invalidateQueries({queryKey: ['all-auctions']});
      queryClient.invalidateQueries({queryKey: [`profile-${user?._id}`]});
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Ставка',
        text2: errorCatch(error),
      })
    },
  });
};