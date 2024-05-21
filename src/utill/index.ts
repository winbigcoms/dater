import * as FileSystem from "expo-file-system";

export const convertUriToBlob = async (imageUri: string) => {
  const blob = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return blob;
};
