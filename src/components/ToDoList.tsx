import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [catecory, setCatecory] = useRecoilState(categoryState)
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCatecory(event.currentTarget.value);
  }
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={catecory} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo></CreateToDo>
      {toDos.map(aToDo => <ToDo key={aToDo.id} {...aToDo}></ToDo>)}
    </div>
  );
}
export default ToDoList