import Item from "./Items";

export interface Looks {
  user_id: string;
  _id: string,
  nameLook?: string;
  itemsInlook: Item[];
  dateCreation?: Date;
  inClothing:boolean
}
export interface SaveLook{
    user_id: string;
  _id: string,
  nameLook?: string;
  itemsInlook: string[];
  dateCreation?: Date;
  inClothing:boolean
}