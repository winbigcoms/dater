import { PLACE_INFO } from "types/place";

export const START_DATE = "2022-09-17";
export const MAIN_TITLE = "시작...!";
export const APIURL =
  "http://ec2-43-203-226-61.ap-northeast-2.compute.amazonaws.com:8000/withyou";
export const PLACE_TYPE = {
  travel: "여행",
  food: "맛집",
};

export const PLACE_SEARCH_TYPE = ["ALL", "isVisited", "notVisited"] as const;

export const PLACE_SEARCH_TYPE_CONVERT = {
  ALL: "모두 보기",
  isVisited: "같이 가본 곳",
  notVisited: "같이 가볼 곳",
};

export const Dummy_PLACE: PLACE_INFO[] = [
  {
    title: "화담숲",
    link: "https://m.hwadamsup.com/",
    id: "testes",
    imgs: [],
    isVisited: false,
    tag: "travel",
    memo: "",
  },
  {
    title: "에버랜드",
    link: "",
    id: "everland",
    imgs: [],
    isVisited: false,
    tag: "travel",
    memo: "",
  },
  {
    title: "전주",
    link: "",
    id: "junjutavel",
    imgs: [
      "https://baek-log-img.s3.ap-northeast-2.amazonaws.com/dater/KakaoTalk_20240401_145956734.jpg",
      "https://baek-log-img.s3.ap-northeast-2.amazonaws.com/dater/KakaoTalk_20240401_145821497_02.jpg",
      "https://baek-log-img.s3.ap-northeast-2.amazonaws.com/dater/KakaoTalk_20240401_145821497_03.jpg",
    ],
    isVisited: true,
    tag: "travel",
    memo: "날씨, 숙소, 음식 무엇하나 빠짐없이 완벽했던 여행이었다. 환영받는 여행같았다는 후기를 들으니 어찌 행복하지 않을 수 있을까",
    date: "2023-06-18",
  },
];
