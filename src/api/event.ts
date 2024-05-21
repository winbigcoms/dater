import { APIURL } from "const";
import { EVENT_DATA } from "store/eventStore";
import { makeQueryString, make_pre_sign_url } from "utill/api";
import * as imagePicker from "expo-image-picker";
import { PLACE_INFO } from "types/place";

export const get_events = async (owner: string) => {
  const url = `${APIURL}/events?${makeQueryString({ owner }).toString()}`;
  try {
    const eventsDataJSON = await fetch(url);

    const eventsData: EVENT_DATA[] = await eventsDataJSON.json();
    return eventsData;
  } catch (err) {
    return false;
  }
};

export const get_event = async (owner: string) => {
  const url = `${APIURL}/events?${makeQueryString({ owner }).toString()}`;
  try {
    const eventDataJSON = await fetch(url);

    const eventData: EVENT_DATA = await eventDataJSON.json();
    return eventData;
  } catch (err) {
    return false;
  }
};

export const post_promise = async (promiseData: PLACE_INFO) => {
  const url = `${APIURL}/promise`;
  try {
    const postPormiseResult: boolean = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promiseData),
    }).then((res) => res.json());

    console.log(postPormiseResult);
  } catch (err) {
    console.log(err);
  }
};

const uploadImgToS3 = async (
  imgData: imagePicker.ImagePickerAsset,
  uploader: string
) => {
  const response = await fetch(imgData.uri);
  const blob = await response.blob();
  const key = imgData.fileName;
  const pre_sign_url = await make_pre_sign_url(uploader + "/" + key);

  const uploadResult: { url: string } = await fetch(pre_sign_url, {
    method: "PUT",
    body: blob,
    headers: {
      "Content-Type": blob.type,
    },
  });

  return uploadResult;
};

export const upload_imgs = async (
  images: imagePicker.ImagePickerAsset[],
  uploader: string
) => {
  const uploadPromises = images.map((imgData) =>
    uploadImgToS3(imgData, uploader)
  );
  try {
    const result = await Promise.all(uploadPromises);
    const filterUrl = result.map((data) => data.url.split("?")[0]);
    return filterUrl;
  } catch (err) {
    console.log(err, "erorr");
    return [];
  }
};
