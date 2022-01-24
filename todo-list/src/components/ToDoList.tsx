import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, CustomCategories, toDoSelector } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [catecory, setCatecory] = useRecoilState(categoryState)
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCatecory(event.currentTarget.value as string);
  }

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0px;
  `
  const Title = styled.h1`
    font-size: 52px;
    font-weight: bolder;
    color: ${props => props.theme.accentColor};
  `;
  const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 50px;
`
  const DropDown = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin: 10px;
  select {
    background-color: ${props => props.theme.boxBgColor};
    color: ${props => props.theme.boxTextColor};
    font-size: inherit;
    padding: .5em;
    padding-right: 2.5em; 
    border: 0;
    margin: 0;
    border-radius: 3px;
    text-indent: 0.01px;
    text-overflow: '';
    -webkit-appearance: button;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
  }
  `
  return (
    <Container>
      <Title>To Dos</Title>
      <Box>
        <DropDown>
          <select value={catecory} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
            {CustomCategories.map((category =>
              <option key={category} value={category}>{category}</option>))}
          </select>
        </DropDown>
        <CreateCategory></CreateCategory>
      </Box>
      <CreateToDo></CreateToDo>
      <ul style={{ listStyle: "none", width: "50vw" }}>
        {toDos.map(aToDo => <ToDo key={aToDo.id} {...aToDo}></ToDo>)}
      </ul>
    </Container>
  );
}
export default ToDoList