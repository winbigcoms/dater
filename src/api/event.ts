import { APIURL } from "const";
import { EVENT_DATA } from "store/eventStore";
import { makeQueryString } from "utill/api";
import * as imagePicker from "expo-image-picker";
import { convertUriToBlob } from "utill";

export const get_event_data = async (owner: string) => {
  const url = `${APIURL}/login?${makeQueryString({ owner }).toString()}`;
  try {
    const loginDataJSON = await fetch(url);

    const loginData: EVENT_DATA = await loginDataJSON.json();
    return loginData;
  } catch (err) {
    return false;
  }
};

export const upload_imgs = async (
  images: imagePicker.ImagePickerAsset[],
  uploader: string
) => {
  const url = `${APIURL}/event-imgs`;
  const formData = new FormData();
  console.log(uploader);
  await Promise.all(
    images.map((img) =>
      convertUriToBlob(img.uri).then((res) => {
        formData.append("files", { ...img, file: res });
      })
    )
  );
  formData.append("uploader", uploader);
  console.log(url);
  try {
    const post: { s3_urls: string[] } = await fetch(url, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    return post;
  } catch (err) {
    console.log(err);
    return { s3_urls: [] };
  }
};
