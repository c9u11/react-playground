import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms"

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      const newToDos = [{ text: toDo, id: Date.now(), category }, ...oldToDos]
      window.localStorage.setItem("ToDos", JSON.stringify(newToDos))
      return newToDos
    })
    setValue("toDo", "");
  };
  const Input = styled.input`
  background-color: ${props => props.theme.boxBgColor};
  color: ${props => props.theme.boxTextColor};
  font-size: inherit;
  padding: .5em 10px;
  border: 0;
  margin: 0;
  border-radius: 3px;
  text-indent: 0.01px;
  text-overflow: '';
  -webkit-appearance: button;
  margin-right: 10px;
`
  const Btn = styled.button`
  background-color: ${props => props.theme.boxBgColor};
  color: ${props => props.theme.accentColor};
  font-size: inherit;
  padding: .5em;
  border: 0;
  margin: 0;
  border-radius: 3px;
  text-indent: 0.01px;
  text-overflow: '';
  -webkit-appearance: button;
  cursor: pointer;
`
  return (
    <form style={{ marginBottom: "30px" }} onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("toDo", {
        required: "Please write a To Do"
      })} placeholder="Todo"></Input>
      <Btn>Add</Btn>
    </form>
  );
}
export default CreateToDo