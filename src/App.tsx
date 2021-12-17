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
  width: 70px;
  height: 70px;
  background-color: rgba(255,255,255,1);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  position:absolute;
  top: 100px;
`;

const box = {
  entry: (back: boolean) => {
    return {
      x: back ? 200 : -200,
      opacity: 0,
      scale: 0,
    }
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    }
  },
  exit: (back: boolean) => {
    return {
      x: back ? -200 : 200,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
      }
    }
  }
}

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(true);
    setVisible(prev => prev === 10 ? 1 : prev + 1)
  }
  const prevPlease = () => {
    setBack(false);
    setVisible(prev => prev === 1 ? 10 : prev - 1)
  }
  return (
    <Wrapper>
      <AnimatePresence exitBeforeEnter custom={back}>
        <Box custom={back} variants={box} initial="entry" animate="center" exit="exit" key={visible}>{visible}</Box>
      </AnimatePresence>
      <button onClick={prevPlease}>Prev</button>
      <button onClick={nextPlease}>Next</button>
    </Wrapper >
  );
}

export default App;