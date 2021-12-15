import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, CustomCategories, IToDo, toDoSelector } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [catecory, setCatecory] = useRecoilState(categoryState)
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCatecory(event.currentTarget.value as string);
  }
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={catecory} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {CustomCategories.map((category =>
          <option key={category} value={category}>{category}</option>))}
      </select>
      <CreateCategory></CreateCategory>
      <CreateToDo></CreateToDo>
      {toDos.map(aToDo => <ToDo key={aToDo.id} {...aToDo}></ToDo>)}
    </div>
  );
}
export default ToDoList