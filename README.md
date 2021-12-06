# Styled Component

## 개요

Styled Component는 기존의 Component와 비슷하게 동작하며 CSS를 따로 관리해주지 않아도 되는 장점을 가진 모듈이다. 

tag 뒤 Backtick 기호를 사용하여 그 안에 css와 동일한 문법으로 디자인을 하면 자동으로 class가 생기며 class에 css가 적용된다.

아래를 따라 진행해보면서 styled component를 익혀보자.



## 설치

기본적으로 npm을 사용하여 모듈을 설치해주어야 사용이 가능하다. 아래 커맨드를 복사하여 붙여넣자.

```bash
npm i styled-components
```

## 선언

모듈 설치가 끝나고 해당 js에서 사용하고자 한다면 import가 필수다. styled라고 선언한다면 사용시 styled.{tag}`{css}`; 와 같이 사용할 수 있다. 선언된 변수는 컴포넌트와 동일하게 사용할 수 있다.

```react
import styeld from "styled-components";

const StyledComponent = styled.div`
	display:flex;
	background-color:tomato;
	color: white;
`;
```

## 사용

위에서 말했든 기존 컴포넌트 사용 방법과 동일하다. 아래의 두가지 방법 모두 사용 가능하다.

- <StyledComponent></StyledComponent>

- <StyledComponent/>

```jsx
...
return (
	<StyledComponent></StyledComponent>
)
...
```

## Prop

컴포넌트와 동일하게 Prop이라는 개념을 가지고 있다. 동일한 크기에 배경색깔만 바꾸고 싶을 때 Prop이 없다면 거의 동일한 styled-component를 2번이나 선언해주어야하며 귀찮음이 베이스인 개발자들은 이 모듈을 사용하지 않을것이다.

Prop을 통하여 내가 원하는 값을 넘겨줄 수 있다.

```jsx
const StyledComponent = styled.div`
	display:flex;
	background-color:${(props)=>props.bgColor};
	color: white;
`;
...
return (
	<StyledComponent bgColor="tomato"></StyledComponent>
)
...
```

## Extend

Prop으로는 부족한 경우가 있다. 물론 Prop으로 아래의 경우를 해결 할 수 있다. 하지만 우리에겐 더 좋은 방법이 있다.

Box 컴포넌트를 그대로 가져오고 추가로 border-radius만 추가해줄 수 있다. 또한 더 많은 css를 추가 해줄 수 있다. 이때 주의할 점은 styled.(Box)가 아닌 styled(Box)라는 점이다. 이를 잊지않고 기억하자.

```jsx
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50%;
`;
```

