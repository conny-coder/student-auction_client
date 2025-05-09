import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuctionService } from '@/services/auction.service';
import { IAuction } from '@/types/auction.types';
import { errorCatch } from '@/api/api.helpers';
import Toast from "react-native-toast-message";
import { IAuctionFormOutput } from './Create';

export const useCreateAuction = () => {
  const queryClient = useQueryClient();

  return useMutation<IAuction, Error, IAuctionFormOutput, unknown>({
    mutationKey: ['create auction'],
    mutationFn: (auctionPayload: IAuctionFormOutput) => AuctionService.create(auctionPayload).then((res) => res.data),
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Створення лоту',
        text2: 'Успішно створено',
      })

      queryClient.invalidateQueries({queryKey: ['all-auctions']});
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Створення лоту',
        text2: errorCatch(error),
      })
    },
  });
};
