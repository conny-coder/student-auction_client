import { useMutation } from '@tanstack/react-query';
import { AuctionService } from '@/services/auction.service';
import { IAuction } from '@/types/auction.types';
import { errorCatch } from '@/api/api.helpers';
import Toast from "react-native-toast-message";

export type CreateAuctionPayload = Omit<
  IAuction,
  "_id" | "ownerId" | "highestBidderId" | "status" | "currentBid" | "isFavourite"
>;

export const useCreateAuction = () => {
  return useMutation<IAuction, Error, CreateAuctionPayload, unknown>({
    mutationKey: ['create auction'],
    mutationFn: (auctionPayload: CreateAuctionPayload) => AuctionService.create(auctionPayload).then((res) => res.data),
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Створення лоту',
        text2: 'Успішно створено',
      })
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
