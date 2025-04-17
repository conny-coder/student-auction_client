import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import FormField from "./FormField";
import RadioGroupField from "./RadioGroupField";
import StyledButton from "@/components/ui/StyledButton";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import FormPriceInput from "@/components/ui/FormPriceInput";
import FormTimeInput from "@/components/ui/FormTimeInput";
import { IAuction, IAuctionForm } from "@/types/auction.types";
import { Controller, useForm } from "react-hook-form";
import LabeledInputField from "./LabeledInputField";
import CustomSelect, { ISelectItem } from "@/components/ui/CustomSelect";
import StyledText from "@/components/ui/StyledText";
import { useCategory } from "../auctions/filter/useCategory";
import { useLocation } from "./useLocation";
import ControlledImageInput from "./ControlledImageInput";
import { useCreateAuction } from "./useCreateAuction";

const radioOptions = [
  { label: "Новий", value: "new" },
  { label: "Б/в", value: "used" },
];

const Create: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IAuctionForm>( {
    defaultValues: {
      category: "",
      condition: "new",
      description: "",
      endTime: 0,
      images: [],
      location: "",
      startPrice: 0,
      title: "",
    },
  } );

  const { mutateAsync } = useCreateAuction()

  const onSubmit = async ( data: IAuctionForm ) =>
  {
    const now = new Date();
    const endDate = new Date( now.getTime() + data.endTime * 3600000 );

    const transformedData:Omit<IAuction , "_id" | "ownerId" | "highestBidderId" | "status" | "currentBid" | "isFavourite"> = {
      ...data,
      endTime: endDate.toISOString(),
      startPrice: +data.startPrice,
      step: Math.max(Math.round(data.startPrice * 0.01 / 10) * 10, 10)
    };

    await mutateAsync(transformedData);
    reset();
  };

  const {categories, isLoading: isLoadingCategories} = useCategory()
  const {locations, isLoading: isLoadingLocations} = useLocation()

  const categoryItems: ISelectItem[] = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const locationItems: ISelectItem[] = locations.map((location) => ({
    label: `${location.city}, ${location.region}`,
    value: location._id,
  }));
  
  return (
    <ScrollView className="bg-black">
      <View className="px-4 pt-5">
        <FormField
          name="title"
          control={control}
          rules={{
            required: { value: true, message: "Поле обов'язкове" },
            minLength: { value: 4, message: "Мінімум 4 символи" },
            maxLength: { value: 50, message: "Максимум 50 символів" },
          }}
          InputComponent={FormInput}
          inputProps={{ placeholder: "Назва лоту" }}
        />

        <FormField
          name="description"
          control={control}
          rules={{
            required: { value: true, message: "Поле обов'язкове" },
            minLength: { value: 10, message: "Мінімум 10 символів" },
            maxLength: { value: 500, message: "Максимум 500 символів" },
          }}
          InputComponent={FormTextarea}
          inputProps={{ placeholder: "Опис" }}
        />

        <LabeledInputField
          label="Початкова ціна:"
          name="startPrice"
          control={control}
          rules={{
            required: { value: true, message: "Поле обов'язкове" },
            min: { value: 50, message: "Мінімальна ціна 50 грн" },
            max: { value: 50000, message: "Максимальна ціна 50 000 грн" },
          }}
          InputComponent={FormPriceInput}
        />

        <LabeledInputField
          label="Тривалість:"
          name="endTime"
          control={control}
          rules={{
            required: { value: true, message: "Поле обов'язкове" },
            min: { value: 5, message: "Мінімальна тривалість 5 годин" },
            max: { value: 50, message: "Максимальна тривалість 50 годин" },
          }}
          InputComponent={FormTimeInput}
        />

        <View className="mb-4">
          <View className="flex-row justify-between items-center">
            <StyledText className="text-lg mb-2">Категорія:</StyledText>
            <Controller
              control={control}
              name="category"
              rules={{ required: { value: true, message: "Поле обов'язкове" } }}
              render={( { field: { onChange, value } } ) => (
                <CustomSelect
                  items={categoryItems}
                  selectedValue={value}
                  onValueChange={( val ) => onChange( val )}
                  placeholder="Виберіть категорію"
                />
              )}
            />
          </View>
          {errors.category && (
            <StyledText
              className="text-xs text-right text-red font-openslight"
            >
              {errors.category.message}
            </StyledText>
          )}
        </View>

        <RadioGroupField
          name="condition"
          control={control}
          rules={{ required: { value: true, message: "Поле обов'язкове" } }}
          label="Стан товару:"
          options={radioOptions}
        />

        <View className="mb-4 ">
          <View className="flex-row justify-between items-center">
            <StyledText className="text-lg mb-2">Локація:</StyledText>
            <Controller
              control={control}
              name="location"
              rules={{ required: { value: true, message: "Поле обов'язкове" } }}
              render={( { field: { onChange, value } } ) => (
                <CustomSelect
                  items={locationItems}
                  selectedValue={value}
                  onValueChange={( val ) => onChange( val )}
                  placeholder="Виберіть локацію"
                />
              )}
            />

          </View>
          {errors.location && (
            <StyledText
              className="text-xs text-right text-red font-openslight"
            >
              {errors.location.message}
            </StyledText>
          )}
        </View>


        <ControlledImageInput name="images" control={control} />

        <StyledButton className="mb-4" handlePress={handleSubmit(onSubmit)}>
          Створити лот
        </StyledButton>
      </View>
    </ScrollView>
  );
};

export default Create;
