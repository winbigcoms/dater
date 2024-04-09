import { DdayCounter } from "component/d-day";
import { MainHeader } from "component/mainHeader";
import { PlaceList } from "component/place/list";
import { PageContainer } from "component/pageContainer";

export const MainPage = () => {
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
