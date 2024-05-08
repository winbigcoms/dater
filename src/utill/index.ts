export const convertUriToBlob = async (imageUri: string) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  return blob;
};
