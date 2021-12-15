import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, CustomCategories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const setCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name } } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as string };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1)
      ]
      window.localStorage.setItem("ToDos", JSON.stringify(newToDos))
      return newToDos
    })
  }
  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1)
      ]
      window.localStorage.setItem("ToDos", JSON.stringify(newToDos))
      return newToDos
    })
  }
  const Li = styled.li`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 20px;
  `;
  const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    button {
      margin: 1px;
      color: ${props => props.theme.boxTextColor};
      background-color: ${props => props.theme.boxBgColor};
      padding: 3px;
      border: none;
      border-radius: 5px;
    }
  `
  return <Li>
    <span>{text}</span>
    <Grid>
      {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={setCategory}>ToDo</button>}
      {category !== Categories.DOING && <button name={Categories.DOING} onClick={setCategory}>Doing</button>}
      {category !== Categories.DONE && <button name={Categories.DONE} onClick={setCategory}>Done</button>}
      {CustomCategories.map((customCategory => {
        if (customCategory === category) return null
        return <button name={customCategory} key={customCategory} onClick={setCategory}>{customCategory}</button>
      }
      ))}
      <button onClick={deleteToDo}>Delete</button>
    </Grid>
  </Li>;
}
export default ToDo