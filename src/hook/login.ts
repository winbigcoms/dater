import { useEffect } from "react";
import uuid from "react-native-uuid";
import useUserStore from "store/userStore";
import { getItem, setItem } from "utill/asyncStorage";

export const useLogin = () => {
  const { setUserId } = useUserStore();
  const checkLogin = async () => {
    const savedId = await getItem("uuid");
    if (savedId) {
      setUserId(savedId);
    } else {
      const newId = uuid.v4() as string;

      await setItem("uuid", newId);
      setUserId(newId);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return;
};
