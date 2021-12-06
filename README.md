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

## As

우리가 div라고 선언한 컴포넌트를 button으로 바꾸고 싶다면 한번 더 선언해야 된다고 생각이 든다.

다시 한번 말하지만 개발자들은 귀찮은것을 매우 매우 싫어한다. 이를 해결하기 위해 as라는 Prop이 있다. 여기에 내가 바꾸고자 하는 tag를 적어준다면 마법처럼 해당 컴포넌트는 div가 아니라 button으로 생성이 될 것이다.

```jsx
...
return (
	<StyledComponent as="button"></StyledComponent>
)
...
```

## attrs

지금까지는 스타일과 tag 설정만 다룰 수 있었다. 만약 input에 require이라는 속성을 넣고싶다면 모든 컴포넌트에 속성을 적어줘야 할까?

아니다. attrs를 적고 소괄호 안에 내가 원하는 속성을 object (key-value) 형식으로 적어주면 된다. 두가지 이상 원하는 속성을 넣어도 된다.

```jsx
const Input = styled.input.attrs({ require: true })`
  background-color: tomato;
`;
```

## Keyframes

animation도 적용하고 싶다고 한다면 keyframes를 사용하면 된다.

Styled component와 비슷하게 선언하면 된다. 그리고 ${}안에 내가 선언한 애니메이션을 작성하면 된다.

```react
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
const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 3s linear infinite;
`;
```

## Child css (/w tagName)

만약 내가 선언한 styled component 안에 일반 태그를 작성하였다면 어떻게 적용하지 걱정 할 필요 없다. 그저 해당 태그 상위의 styled component css에 작성해주면 된다.

아래와 같이 태그도 지정 가능하며 span:hover라고 사용하지 않아도 &기호 또는 ^기호를 사용하면 보다 간편하게 작성이 가능하다.

```react
const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 3s linear infinite;
  span {
    font-size: 36px;
    &:hover {
      font-size: 72px;
    }
  }
`;
```

## Child css (/w Component)

위의 방법은 tagName에 의존하기 때문에 하위의 tag가 바뀌면 적용되지 않는 단점이 있다.

이는 아래와 같은 방법으로 해결이 가능하다. 또한 Box 안에만 있는 Component만 새로운 css를 적용 시킬 수 있는 장점도 가지고있다.

```react
const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: tomato;
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
```

