import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}
function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log(data);
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("toDo", {
          required: "Please write a To Do"
        })} placeholder="Todo"></input>
        <button>Add</button>
      </form>
      <ul>

      </ul>
    </div>
  );
}
export default ToDoList