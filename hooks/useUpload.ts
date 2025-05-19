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
    mutationFn: (data) => FileService.upload(data, folder),
    onSuccess: ( data ) =>
    {
      onChange( data.data[0].url );
    },
    onError: ( error ) =>
    {
    console.log('Error uploading file', error);
      Toast.show({
        type: 'error',
        text1: 'Завантаження картинки',
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
    const uri = asset.uri;
    if (!asset?.uri) return;

    const match = /\.([a-zA-Z0-9]+)(?:\?|$)/.exec( uri );
    const ext = match?.[1].toLowerCase() ?? 'jpg';

    const mime = ext === 'webp'
      ? 'image/webp'
      : ext === 'png'
        ? 'image/png'
        : 'image/jpeg';

    const name = asset.fileName
      ? asset.fileName
      : `upload_${Date.now()}.${ext}`;

    const formData = new FormData();
    formData.append( 'file', {
      uri,
      name,
      type: mime,
    } as any );

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
