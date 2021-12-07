# Typescript

## 개요

Javascript는 기본적으로 어떠한 변수의 타입에 대해서 강제적이지 않다. 내가 언제든 원하는 타입으로 해당 변수를 변경 할 수 있다. 이는 개발하면서 가장 큰 장점이자 가장 큰 단점이다. 하지만 그로 인해서 여러 에러에 대해서 예상하지 못할 때가 많고 개발을 할수록 장점보단 단점이 부각될 것이다.

Typescript는 내가 개발하는 모든 것에 대해서 알고싶어한다. 단순하게 변수를 선언하더라도 함수의 인자를 받더라도 이것들의 타입이 무엇인지 알아야한다. 그리고 모른다면 에러를 띄운다. 잠깐보면 이는 개발자를 더 귀찮게 하는게 아닌가 생각이 들 수 있지만 조금 더 생각해보면 생각이 바뀐다. 서비스를 제공하다 보면 고작 타입 때문에 예상하지 못한 에러가 나올 때가 종종 있다. Typescript는 코드를 실행하기 전 에러를 알려줌으로써 이를 방지할 수 있도록 도와준다.

### 장점

- 모든것에 대한 타입을 지정해주어야 하기 때문에 코드 실행 전 예상하지 못한 에러를 잡을 수 있다.
- Event 등의 타입 또한 지정되기 때문에 자동완성 기능을 사용 할 수 있다. (Ex/ event.preventDefault();)
  - 오타로 인한 에러 걱정이 줄어듬

## 설치

설치는 현재 사용하고 있는 package에 맞는 typescript를 모두 설치해야한다.

기본적으로 npx create-react-app my-app 명령어를 사용하였다면 아래의 명령어를 사용하면 된다.

```shell
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

추가로 styled-components 등의 package를 사용 할 때도 별도로 설치해주어야한다. 이는 @types git에서 많은 패키지에 대해 지원해준다. 그렇기에 typescript를 사용한다면 추가 패키지 설치 시 꼭 잊지않고 설치하길 바란다.

## 사용

기본적으로 아래의 문법을 보면 충분히 사용이 가능하다.

```tsx
const sum = (a:number, b:number) => a+b;
```

설명하지 않아도 a와 b라는 인자가 숫자 타입을 가지고 있을거라 예상이 된다. 

## Interface

아래와 같이 Object를 사용 할 때는 interface를 사용하면 된다. object와 형식은 비슷하지만 항목이 늘어날 수록 , 로 구분하지않고 ;으로 구분한다는 점을 잘 기억해두어야한다.

```tsx
interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj:PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old.`

console.log(sayHello({name:"nico", age:12}));
console.log(sayHello({name:"hi", age:12}));
```



## Interface (optional)

```tsx
interface PlayerShape {
  name: string;
  age: number;
  text?: string;
}

const sayHello = (playerObj:PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old. {text ?? "Bye..."}`

console.log(sayHello({name:"nico", age:12, text:"wow!"}));
console.log(sayHello({name:"hi", age:12}));
```

