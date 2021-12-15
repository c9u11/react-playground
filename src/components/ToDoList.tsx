import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, IToDo, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [catecory, setCatecory] = useRecoilState(categoryState)
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCatecory(event.currentTarget.value as Categories);
  }
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={catecory} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo></CreateToDo>
      {toDos.map(aToDo => <ToDo key={aToDo.id} {...aToDo}></ToDo>)}
    </div>
  );
}
export default ToDoList