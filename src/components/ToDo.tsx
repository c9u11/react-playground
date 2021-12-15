import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name } } = event;
    // setToDos((oldToDos)=>{...oldToDos, [})
  }
  return <li>
    {text}
    {category !== "TO_DO" && <button name="TO_DO" onClick={onClick}>ToDo</button>}
    {category !== "DOING" && <button name="DOING" onClick={onClick}>Doing</button>}
    {category !== "DONE" && <button name="DONE" onClick={onClick}>Done</button>}
  </li>;
}
export default ToDo