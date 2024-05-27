export interface UPLOAD_PLACE_INFO {
  title: string;
  memo: string;
  imgs: string[];
  link: string;
  isVisited: boolean;
  event_id: string;
  tag: "food" | "travel";
  date: string;
}

export interface PLACE_INFO extends UPLOAD_PLACE_INFO {
  id: string;
}

// export type PLACE_SEARCH_TYPE = "ALL" | "isVisited" | "notVisited";
