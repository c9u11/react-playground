import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: gray;
`;

const rotationAnimation = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius:0px;
  }
  50% {
    transform:rotate(360deg);
    border-radius:50%;
  }
  100% {
    transform:rotate(0deg);
    border-radius:0px;
  }
`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 3s linear infinite;
  ${Emoji} {
    &:hover {
      font-size: 72px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Emoji as="p">👻</Emoji>
      <Box>
        <Emoji as="p">Emoji</Emoji>
      </Box>
      <Emoji as="p">👻</Emoji>
    </Wrapper>
  );
}

export default App;
