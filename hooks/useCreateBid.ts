import { errorCatch } from "@/api/api.helpers";
import { BidService } from "@/services/bid.service";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useCreateBid = () => {
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