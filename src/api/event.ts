import { APIURL } from "const";
import { EVENT_DATA } from "store/eventStore";
import { makeQueryString } from "utill/api";
import * as imagePicker from "expo-image-picker";

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

export const upload_imgs = async (images: imagePicker.ImagePickerAsset[]) => {
  const url = `${APIURL}/event-imgs`;
  const formData = new FormData();
  await Promise.all(
    images.map((img) =>
      convertUriToBlob(img.uri).then((res) => {
        formData.append("files", { ...img, file: res });
      })
    )
  );
  try {
    const post = await fetch(url, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    console.log(post);
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};