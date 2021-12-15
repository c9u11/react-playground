import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Categories, categoryState, CustomCategories } from "../atoms";
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("category", {
        required: "Please write a Custom Category"
      })} placeholder="Category"></input>
      <button>Add Catecory</button>
      <span style={{ color: "red" }}>{errors?.category?.message || ""}</span>
    </form>
  )
}

export default CreateCategory;