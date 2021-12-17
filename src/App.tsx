import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background:linear-gradient(135deg , rgb(238, 0, 153), rgb(221, 0, 238));
`;
const Box = styled(motion.div)`
  margin: 20px;
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,1);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 50px;
  width: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(prev => !prev);
  return (
    <Wrapper onClick={toggleClicked}>
      <Box >
        {!clicked ? <Circle layoutId="circle" style={{ borderRadius: 50, scale: 1 }}></Circle> : null}
      </Box>
      <Box >
        {clicked ? <Circle layoutId="circle" style={{ borderRadius: 0, scale: 2 }}></Circle> : null}
      </Box>
    </Wrapper >
  );
}

export default App;