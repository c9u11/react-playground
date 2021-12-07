import styled from "styled-components";

interface CircleProps {
  bgColor: string;
}

const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props)=>props.bgColor};
  border-radius: 50%;
`;

function Circle({bgColor}:CircleProps){
  return(
    <Container bgColor={bgColor}></Container>
  )
}

export default Circle;

interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj:PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old.`

console.log(sayHello({name:"nico", age:12}));
console.log(sayHello({name:"hi", age:12}));