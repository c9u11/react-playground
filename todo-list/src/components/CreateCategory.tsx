import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, CustomCategories } from "../atoms";
interface IForm {
  category: string;
}
function CreateCategory() {
  const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm<IForm>();
  const setCategory = useSetRecoilState(categoryState)
  const onSubmit = ({ category }: IForm) => {
    if (CustomCategories.findIndex((data) => data === category) !== -1) return setError("category", { message: `${category} is already exists` }, { shouldFocus: true })
    CustomCategories.push(category)
    setCategory(category)
    setValue("category", "");
    window.localStorage.setItem("categories", JSON.stringify(CustomCategories))
  }
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
  const Form = styled.form`
    position: relative;
    span {
      color: red;
      left: 0;
      bottom: 0;
      transform: translate(0,150%);
      width: 100%;
    }
  `
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("category", {
        required: "Please write a Custom Category"
      })} placeholder="Add Category..."></Input>
      <Btn>Add</Btn>
      <span style={{ color: "red", position: "absolute", bottom: "0" }}>{errors?.category?.message || ""}</span>
    </Form>
  )
}

export default CreateCategory;