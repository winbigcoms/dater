import { APIURL } from "const";
import { EVENT_DATA } from "store/eventStore";
import { makeQueryString } from "utill/api";

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
