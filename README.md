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
