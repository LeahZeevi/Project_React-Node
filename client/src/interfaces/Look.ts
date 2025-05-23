import Item from "./Items";

export interface Look {
  id: string;
  title: string;
  items: Item[]; // בגדים המרכיבים את הלוק
  createdAt: string;
  comments?: string[];
}
