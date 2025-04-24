import { useCallback, useMemo, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Toast from "react-native-toast-message";

import { useMutation } from '@tanstack/react-query';
import { errorCatch } from '@/api/api.helpers';
import { FileService } from '@/services/file.service';

type TypeUpload = (
  onChange: (url: string) => void,
  folder?: string
) => {
  uploadFile: () => Promise<void>;
  isLoading: boolean;
};

interface UploadResponse {
  data: { url: string }[];
}

export const useUpload: TypeUpload = (onChange, folder) => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation<UploadResponse, Error, FormData, unknown>( {
    mutationKey: ['upload file'],
    mutationFn: ( data: FormData ) => FileService.upload( data, folder ),
    onSuccess: ( data ) =>
    {
      onChange( data.data[0].url );
    },
    onError: ( error ) =>
    {
      Toast.show({
        type: 'Завантаження файлу',
        text2: errorCatch( error ),
      })
    },
  });

  const uploadFile = useCallback(async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Toast.show({
        type: 'error',
        text1: 'Доступ до медіа бібліотеки відмовлено',
      })
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets?.[0];
    if (!asset?.uri) return;

    // Создаём FormData для загрузки файла
    const formData = new FormData();
    formData.append('file', {
      uri: asset.uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    } as any);

    setIsLoading(true);

    try {
      await mutateAsync(formData);
    } catch (error) {

    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [mutateAsync]);

  return useMemo(() => ({ uploadFile, isLoading }), [uploadFile, isLoading]);
};
