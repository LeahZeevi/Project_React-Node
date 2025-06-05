import Item from "./Items";

export interface Looks {
  user_id: string;
  _id: string,
  nameLook?: string;
  itemsInlook: Item[];
  dateCreation?: string;
  inClothing:boolean
}
