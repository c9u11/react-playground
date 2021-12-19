import styled from "styled-components";

const Background = styled.div`
  background-color : ${props => props.theme.black.darker};
  height: 200vh;
`;

function Home() {
  return (
    <Background>

    </Background>
  )
}
export default Home;