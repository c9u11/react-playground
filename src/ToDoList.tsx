import { useForm } from "react-hook-form";

// add todo List using useState
// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const { currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do"></input>
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  // console.log(watch);
  console.log(formState.errors);
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input {...register("Email", { required: true })} placeholder="Email"></input>
        <input {...register("FirstName", { required: true })} placeholder="FirstName"></input>
        <input {...register("LastName", { required: true })} placeholder="LastName"></input>
        <input {...register("UserName", { required: true, minLength: 10 })} placeholder="UserName"></input>
        <input {...register("Password", { required: true, minLength: 5 })} placeholder="Password"></input>
        <input {...register("PasswordConfirm", {
          required: "Password is required", minLength: {
            value: 5,
            message: "Your password is too short."
          }
        })} placeholder="PasswordConfirm"></input>
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList