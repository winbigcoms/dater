import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PageContainer } from "component/pageContainer";
import { PlaceDetail } from "component/place/detail";
import { RootStackParamList } from "types/page";

export type PlaceDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "placeDetail"
>;

export const PlaceDetailPage = ({ route }: PlaceDetailProps) => {
  const id = route.params.id;
  return (
    <PageContainer>
      <PlaceDetail id={id} />
    </PageContainer>
  );
};
