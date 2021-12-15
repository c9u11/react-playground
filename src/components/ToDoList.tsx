import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [toDos, doing, done] = useRecoilValue(toDoSelector);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo></CreateToDo>
      <h2>ToDo</h2>
      <ul>
        {toDos.map(toDo => {
          return (<ToDo {...toDo} key={toDo.id}></ToDo>);
        })}
      </ul>
      <h2>Doing</h2>
      <ul>
        {doing.map(toDo => {
          return (<ToDo {...toDo} key={toDo.id}></ToDo>);
        })}
      </ul>
      <h2>Done</h2>
      <ul>
        {done.map(toDo => {
          return (<ToDo {...toDo} key={toDo.id}></ToDo>);
        })}
      </ul>
    </div>
  );
}
export default ToDoList