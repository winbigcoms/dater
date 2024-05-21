export interface PLACE_INFO {
  title: string;
  memo: string;
  imgs: string[];
  link: string;
  isVisited: boolean;
  tag: "food" | "travel";
  id?: string;
  date?: string;
}

// export type PLACE_SEARCH_TYPE = "ALL" | "isVisited" | "notVisited";
