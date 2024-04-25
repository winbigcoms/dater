import { APIURL } from "const";
import { UserLoginData } from "store/userStore";
import { makeQueryString } from "utill/api";

export const login = async (email: string) => {
  const url = `${APIURL}/login?${makeQueryString({ email }).toString()}`;

  try {
    const loginDataJSON = await fetch(url);

    const loginData: UserLoginData = await loginDataJSON.json();
    return loginData;
  } catch (err) {
    return false;
  }
};
