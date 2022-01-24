import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE"
}
export const CustomCategories: string[] = JSON.parse(window.localStorage.getItem("categories") || "[]")
export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: Categories.TO_DO
})

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(window.localStorage.getItem("ToDos") || "[]"),
})

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter(toDo => toDo.category === category)
  }
})

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
})