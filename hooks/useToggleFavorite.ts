import { FavoriteAuctionService } from '@/services/favorite-auction.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ToggleFavoriteVariables = {
  _id: string;
  isFavorite: boolean;
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ToggleFavoriteVariables, unknown>({
    mutationKey: ['toggle favorite'],
    mutationFn: ({ _id, isFavorite }) => {
      if (!isFavorite) {
        return FavoriteAuctionService.delete(_id).then(() => {});
      } else {
        return FavoriteAuctionService.set(_id).then(() => {});
      }
    },
    onSuccess: () => {
      console.log('Favorite toggled successfully');

      queryClient.invalidateQueries({queryKey: ['all-auctions']});
    },
    onError: (error) => {
      console.error('Error toggling favorite', error);
    },
  });
};
