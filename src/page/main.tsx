import { DdayCounter } from "component/d-day";
import { MainHeader } from "component/mainHeader";
import { PlaceList } from "component/place/list";
import { PageContainer } from "component/pageContainer";
import { useLogin } from "hook/login";

export const MainPage = () => {
  useLogin();

  return (
    <PageContainer>
      <>
        <MainHeader />
        <DdayCounter />
        <PlaceList />
      </>
    </PageContainer>
  );
};
