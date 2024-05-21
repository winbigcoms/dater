import { APIURL } from "const";

export const makeQueryString = (params: {}) => new URLSearchParams(params);

export function sendXmlHttpRequest(data: FormData, api: string) {
  const xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject("Request Failed");
      }
    };
    xhr.open("POST", api);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.send(data);
  });
}

export const make_pre_sign_url = async (uploader: string) => {
  const url = `${APIURL}/event/img/pre-url?${makeQueryString({
    uploader,
  }).toString()}`;
  try {
    const pre_sign_url: string = await fetch(url).then((res) => res.json());
    return pre_sign_url;
  } catch (err) {
    console.log("error");
    return "";
  }
};
