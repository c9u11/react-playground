import { useForm } from "react-hook-form";

interface IForm {
  Email: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  PasswordConfirm: string;
}

function ToDoList() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<IForm>({
    defaultValues: {
      Email: "@naver.com",
    }
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  // console.log(watch);
  // console.log(formState.errors);
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input {...register("Email", {
          required: "Email is required", pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: "Only naver.com emails allowed"
          }
        })} placeholder="Email"></input>
        <span>{errors?.Email?.message}</span>
        <input {...register("FirstName", { required: "FirstName is Required" })} placeholder="FirstName"></input>
        <span>{errors?.FirstName?.message}</span>
        <input {...register("LastName", { required: "LastName is Required" })} placeholder="LastName"></input>
        <span>{errors?.LastName?.message}</span>
        <input {...register("UserName", {
          required: "UserName is Required", minLength: {
            value: 5,
            message: "Your UserName is too short."
          }
        })} placeholder="UserName"></input>
        <span>{errors?.UserName?.message}</span>
        <input {...register("Password", {
          required: "Password is Required", minLength: {
            value: 5,
            message: "Your password is too short."
          }
        })} placeholder="Password"></input>
        <span>{errors?.Password?.message}</span>
        <input {...register("PasswordConfirm", {
          required: "PasswordConfirm is required", minLength: {
            value: 5,
            message: "Your password is too short."
          }
        })} placeholder="PasswordConfirm"></input>
        <span>{errors?.PasswordConfirm?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList