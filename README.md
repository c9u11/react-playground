# Animations

------

## 개요

framer-motion package를 사용하여 애니메이션을 구현해보는 프로젝트이다.



------

## Framer-motion

### Install

```bash
npm install framer-motion
```

### Motion import

```tsx
import { motion } from "framer-motion"
```

### Create motion tag

기본적으로 아래와 같이 태그를 사용하면된다.

```tsx
<motion.div><motion.div/>
```

만약 styled-components와 같이 사용하고싶다면 아래의 예시를 보고 따라하면 된다.

```tsx
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

...
<Box/>
...
```

### Props

#### Transition

기본적으로 동작에 대한 자세한 설정이나 물리법칙을 적용하는 속성이다.

```tsx
<Box transition={{ type: "spring", delay: 0.5 }}/>
```



#### Initial

components가 rendering 되었을 때 초기의 모습에 대한 설정이다.

```tsx
<Box initial={{ scale: 0 }}/>
```



#### Animate

components의 최종 모습이라고 생각하면 된다. 즉 initial > animate로 설정한 값에 따라서 애니메이션 효과를 부여한다 라고 볼 수 있다.

```tsx
<Box animate={{ scale: 1, rotateZ: 360 }}/>
```



#### Variants

우리는 지금까지 transition, Initial, Animate를 태그 안에 작성했다.

이는 적은 양이라면 문제가 없지만 양이 많아지면 보기도 불편하고 관리도 불편할 것이다. 그렇기에 우리는 variants를 사용하여 해결 할 수 있다.

```tsx
const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 0.5 } }
}

...
<Box variants={myVars} initial="start" animate="end" />
```

object를 만들어주고 variants에 넣어주기만 하면 끝이다.

그 이후에는 내가 원하는 prop에 원하는 값의 key를 작성해주면 된다.



또한 아래와 같이 variants와 initial, animate가 부모 컴포넌트에 있다면 framer는 자동으로 아래 코드와 같이 동작한다.

```tsx
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle />
        <Circle />
        <Circle />
        <Circle />
      </Box>
      
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle initial="start" animate="end"/>
        <Circle initial="start" animate="end"/>
        <Circle initial="start" animate="end"/>
        <Circle initial="start" animate="end"/>
      </Box>
```

위 사항을 알고 잘 사용한다면 아래와 같이 적용할 수 있다.

여기서 부모의 variants와 자식의 variants 각각의 key name을 동일하게 한다면 우리가 직접 작성하지 않아도 자동으로 적용된다.

```tsx
const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5
    }
  }
}

const circleVariants = {
  start: {
    scale: 0
  },
  end: {
    scale: 2,
    transition: {
      type: "spring",
      bounce: 0.8
    }
  }
}

...
<Box variants={boxVariants} initial="start" animate="end">
  <Circle variants={circleVariants} />
  <Circle variants={circleVariants} />
  <Circle variants={circleVariants} />
  <Circle variants={circleVariants} />
</Box>
```



------

## Sample

- Example1

  ![Example1](https://user-images.githubusercontent.com/29428714/146386253-f4d1d9b2-791e-4d2e-b9db-9ae94a27b920.gif)

```tsx
<Box transition={{ type: "spring", delay: 0.5 }} initial={{ scale: 0 }} animate={{ scale: 1, rotateZ: 360 }} />
```

- Example2

  ![Example2](https://user-images.githubusercontent.com/29428714/146386280-7f760aa9-38a1-4daa-9614-21b726264f73.gif)

```tsx
const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
}

const circleVariants = {
  start: {
    opacity: 0,
    y: 10
  },
  end: {
    opacity: 1,
    y: 0
  }
}

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  );
}
```

- Example3

![Example3](https://user-images.githubusercontent.com/29428714/146576414-64a9ad76-ccc1-43e8-a583-99c24c9ca5a3.gif)

```tsx
const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { borderRadius: "50%", scale: 1 }
}
function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} whileHover="hover" whileTap="click">
      </Box>
    </Wrapper>
  );
}
```

- Example4

![Example4](https://user-images.githubusercontent.com/29428714/146578481-c0a06e52-9c22-40d3-a90a-4ac1ca32155a.gif)

```tsx
const boxVariants = {
  hover: { rotateZ: 90 },
  click: { borderRadius: "50%" },
}
function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null)
  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
          whileDrag="drag"
        >
        </Box>
      </BiggerBox>
    </Wrapper>
  );
}
```

- Example5

![Example5](https://user-images.githubusercontent.com/29428714/146580906-5275ad6a-fdf6-4569-9f0f-59ad3802dcc7.gif)

```tsx
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
```

- Example5-1

![Example5-1](https://user-images.githubusercontent.com/29428714/146583781-58b4febe-6c30-4f1c-b562-3493c6d72289.gif)

```tsx
function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 200], [-360, 360]);
  const gradient = useTransform(x, [-200, 0, 200], [
    'linear-gradient(135deg , rgb(0, 213, 238), rgb(0, 83, 238))',
    'linear-gradient(135deg , rgb(238, 0, 153), rgb(221, 0, 238))',
    'linear-gradient(135deg , rgb(0, 238, 155), rgb(238, 178, 0))'
  ]);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  return (
    <Wrapper style={{ background: gradient }}>
      <Box
        style={{ x, rotateZ, scale }}
        drag="x"
        dragSnapToOrigin
      >
      </Box>
    </Wrapper >
  );
}
```

- Example6

![Example6](https://user-images.githubusercontent.com/29428714/146586667-5daa3c39-7258-4189-9c90-270acaa4283f.gif)

```tsx

const svg = {
  start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
  end: { pathLength: 1, fill: "rgba(255, 255, 255, 1)" },
}

function App() {
  return (
    <Wrapper>
      <Svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><motion.path variants={svg} initial="start" animate="end" transition={{ default: { duration: 5 }, fill: { duration: 2, delay: 2 } }} d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"></motion.path></Svg>
    </Wrapper >
  );
}
```

- Example7

![Example7](https://user-images.githubusercontent.com/29428714/146588103-45d8528b-e689-400e-9e47-cbc2672f0dea.gif)

```tsx
const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50
  }
}
function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing(prev => !prev);
  return (
    <Wrapper>
      <button onClick={toggleShowing}>Click</button>
      <AnimatePresence>
        {showing ? <Box variants={boxVariants} initial="initial" animate="visible" exit="leaving"></Box> : null}
      </AnimatePresence>
    </Wrapper >
  );
}
```



------

## 기타 해결법

### npx create-react-app my-app이 정상적으로 되지 않을때

```bash
You are running `create-react-app` 4.0.3, which is behind the latest release (5.0.0).

We no longer support global installation of Create React App.
```

위와 같은 에러와 함께 app이 정상적으로 만들어지지 않는다면 아래의 커맨드를 통해서 만들어보자.

```
npx create-react-app@5.0.0 my-app
```

### framer-motion 사용 시 에러

https://github.com/framer/motion/issues/1307#issuecomment-955877279 참고
