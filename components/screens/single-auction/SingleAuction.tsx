import CurrencyIcon from "@/components/icons/CurrencyIcon";
import Slider from "@/components/Slider";
import AuctionFavorite from "@/components/ui/AuctionFavorite";
import AuctionTime from "@/components/ui/AuctionTime";
import StyledButton from "@/components/ui/StyledButton";
import StyledText from "@/components/ui/StyledText";
import { useAuth } from "@/hooks/useAuth";
import { useCreateBid } from "@/hooks/useCreateBid";
import { useToggleFavorite } from "@/hooks/useToggleFavorite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {  Pressable, ScrollView, TextInput, View } from "react-native"
import ExpandableDescription from "./ExpandableDescription";
import ImageSlider from "./ImageSlider";
import { useDeleteAuction } from "./useDeleteAuction";
import { useGetAuction } from "./useGetAuction";
import Toast from "react-native-toast-message";
import MyModal from "@/components/MyModal";
import { useCreateChat } from "@/hooks/useCreateChat";
import Loader from "@/components/loaders/Loader";
import { useProfile } from "../profile/useProfile";

const SingleAuction = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetAuction( id as string );
  const user = useAuth()
  const [isBidModalVisible, setIsBidModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const {data: owner} = useProfile(data?.ownerId || "")

  const [isFavoriteState, setIsFavoriteState] = useState(data?.isFavourite || false);
  const [bid, setBid] = useState<number>(data ? data.currentBid + data.step : 0);

  useEffect(() => {
    if (data) {
      setIsFavoriteState(data.isFavourite);
      setBid(data.currentBid + data.step);
    }
  }, [data]);

  const { mutate: toggleFavorite } = useToggleFavorite();
  const { mutate: createBid } = useCreateBid();
  const { mutate: deleteAuction } = useDeleteAuction()
  const { mutate: createChat } = useCreateChat();

  const changeFavorite = async (isFavorite: boolean) =>
  {
    setIsFavoriteState( isFavorite );

    toggleFavorite({ _id: data?._id || "", isFavorite });
  };

  // TODO: improve these two blocks with Loader and NotFound component
  if (isLoading) return <Loader />;
  if (!data) return <StyledText>Not found</StyledText>;

  const handleDelete = () => {
    if (data.highestBidderId === null) {
      deleteAuction({ auctionId: data._id });

      Toast.show({
        type: 'success',
        text1: 'Лот',
        text2: 'Успішно видалено',
      })

      router.back();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Лот',
        text2: 'Неможливо видалити лот, що має ставку',
      })
    }
  }

  return (
    <ScrollView className="bg-black">
      <View className="px-4">
        <StyledText className="text-xl mb-4">{data.title}</StyledText>
        <View className="mb-4">
          <StyledText className="text-lg mb-3">
            <Slider
              isPagination={true}
              height={200}
              data={data.images}
              renderItem={(item, index) => <ImageSlider imageUri={item} key={index} />}
            />
          </StyledText>
        </View>
        <View className="flex-row justify-between items-center mb-3">
          <StyledText className="text-lg">Детальний опис</StyledText>
          <Pressable onPress={() => changeFavorite(!isFavoriteState)}>
            <AuctionFavorite isFavorite={isFavoriteState} />
          </Pressable>
        </View>
        <ExpandableDescription description={data.description} collapsedHeight={90} />
        <View className="mb-3 flex-row justify-between items-center">
          <StyledText className="text-lg mb-3">Продавець:</StyledText>
          <Pressable onPress={() => router.push(`/user/${data.ownerId}`)} className="text-base mb-3 underline"><StyledText className="text-base underline">{owner?.name}</StyledText></Pressable>
        </View>
        {data.ownerId !== user?._id
          && <View style={{ width: 250 }}>
            <StyledButton size="small" handlePress={() => {createChat(data.ownerId)}} color="gray" className="mb-4">Написати продавцю</StyledButton>
          </View>
        }
        <View className="flex-row justify-between items-center mb-4">
          <StyledText className="text-lg mb-3">Локація:</StyledText>
          <StyledText className="text-base mb-3">{data.location.city}, {data.location.region}</StyledText>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <StyledText className="text-lg mb-3">Залишок часу</StyledText>
          <AuctionTime isSingle={true} endTime={data.endTime} />
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <StyledText className="text-lg">Мінімальний крок ставки:</StyledText>
          <View className="flex-row justify-between items-center gap-2">
            <StyledText className="text-lg">{data.step}</StyledText>
            <CurrencyIcon />
          </View>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <StyledText className="text-lg">Поточна ставка:</StyledText>
          <View className="flex-row justify-between items-center gap-2">
            <StyledText className="text-lg">{data.currentBid}</StyledText>
            <CurrencyIcon />
          </View>
        </View>
        {data.ownerId !== user?._id
          && <View className="mb-4">
            <View className="flex-row justify-between items-center">
              <StyledText className="text-lg">Введіть суму ставки:</StyledText>
              <View>
                <TextInput
                  value={bid.toString()}
                  onChangeText={( text ) => setBid( parseInt( text ) || 0 )}
                  className="text-primary text-base border border-gray-30p border-solid rounded-xl"
                  style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 30, height: 45, width: 100 }}
                  placeholder="0"
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                />
                <View className="absolute" style={{ top: 15, right: 10 }}>
                  <CurrencyIcon />
                </View>
              </View>
            </View>
            {user?._id === data.highestBidderId
              && <StyledText color="text-green" className="ml-auto text-lg">Ваша ставка лідирує!</StyledText>
            }
          </View>
        }
        
        {data.ownerId !== user?._id 
          ? <>
            <StyledButton handlePress={() => { setIsBidModalVisible(true)}} color="green" className="mb-4">Зробити ставку</StyledButton>
            <MyModal title={`Зробити ставку (${bid} грн)?`} onConfirm={() => {createBid({ auctionId: data._id, amount: bid })}} onClose={() => {setIsBidModalVisible(false)}} visible={isBidModalVisible}></MyModal>
          </> 
          : <>
            <StyledButton handlePress={() => { setIsDeleteModalVisible( true ) }} color="red" style={{ backgroundColor: "#E53935" }} className="mb-4">Видалити лот</StyledButton>
            <MyModal title="Видалити лот?" onConfirm={handleDelete} onClose={() => { setIsDeleteModalVisible( false ) }} visible={isDeleteModalVisible}></MyModal>
          </>
        }
        
      </View>
    </ScrollView>
  )
}
export default SingleAuction