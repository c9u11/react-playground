import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled(motion.div)`
  width: 70px;
  height: 70px;
  background-color: rgba(255,255,255,1);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-200, 0, 200], [2, 1, 0.1]);
  useEffect(() => {
    scale.onChange(() => console.log(scale.get()))
  }, [x])
  return (
    <Wrapper>
      <Box
        style={{ x, scale }}
        drag="x"
        dragSnapToOrigin
      >
      </Box>
    </Wrapper>
  );
}

export default App;