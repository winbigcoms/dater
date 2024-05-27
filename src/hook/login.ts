import { get_event } from "api/event";
import { login } from "api/login";
import { useEffect } from "react";
import uuid from "react-native-uuid";
import { useEventStore } from "store/eventStore";
import useUserStore from "store/userStore";
import { getItem, setItem } from "utill/asyncStorage";

export const useLogin = () => {
  const { setUserId, setUserLogin } = useUserStore();
  const { setEvent } = useEventStore();

  const checkLogin = async () => {
    try {
      const savedId = await getItem("uuid");
      const loginData = await login("bigcoms6290@gmail.com");
      if (!loginData) return;

      setUserLogin(loginData);

      if (loginData.main_event) {
        const event = await get_event(loginData.main_event);
        if (event) {
          setEvent(event);
        }
      }

      if (savedId) {
        setUserId(savedId);
      } else {
        const newId = uuid.v4() as string;

        await setItem("uuid", newId);
        setUserId(newId);
      }
    } catch (err) {
      console.log(err);
      console.log("loginErr");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return;
};
