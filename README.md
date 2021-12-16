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



------

## Sample

1. Basic animation

   ```tsx
   <Box transition={{ type: "spring", delay: 0.5 }} initial={{ scale: 0 }} animate={{ scale: 1, rotateZ: 360 }} />
   ```

![BasicAnimation](https://user-images.githubusercontent.com/29428714/146380923-e2005545-2c04-43de-898e-0c417f1e2956.gif)



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
