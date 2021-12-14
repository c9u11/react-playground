# TodoList

## 개요

## 기능

## Package

### React-hook-form

#### Install

```bash
npm i react-hook-form
```

#### Import

기본적으로 아래와 같이 import 해주면 된다.

```tsx
import { useForm } from "react-hook-form";
```

우리는 import한 useForm을 사용하여 다양한 변수를 받을 수 있다. 이는 아래에 나열된 항목들이다.

#### Register

register는 함수로 name, onBlur, onChange, ref 를 리턴해준다.

기본적으로 첫번째 인자에 해당 data의 name 값을 받으며 아래와 같이 import 해주면 된다.

```tsx
const { register } = useForm();

console.log(register("data"));
```

이는 input tag에서 아래와 같이 사용할 수 있다. useState를 사용한 예시와 비교해보자.

```tsx
//useState
const [toDo, setToDo] = useState("");
const onChange = (event: React.FormEvent<HTMLInputElement>) => {
	const { currentTarget: { value },
  } = event;
  setToDo(value);
};
<input onChange={onChange} value={toDo}></input>

//react-hook-form
<input {...register("todo")}/>
```

#### Watch

watch는 register를 통하여 등록된 data들을 한번에 모아서 볼 수 있는 함수이다.

```tsx
const { register, watch } = useForm();

console.log(watch());

<input {...register("todo1")}/>
<input {...register("todo2")}/>
<input {...register("todo3")}/>
<input {...register("todo4")}/>
<input {...register("todo5")}/>

>> {todo1:"", todo2:"", todo3:"", todo4:"", todo5:""}
```

#### HandleSubmit

handleSubmit은 form tag에서 onSubmit에 사용된다. 예시는 아래와 같다.

```tsx
const { register, handleSubmit } = useForm();

const onValid = (data: any) => {
  console.log(data);
};

<form onSubmit={handleSubmit(onValid)}>
  <input {...register("todo1")}/>
  <input {...register("todo2")}/>
  <input {...register("todo3")}/>
  <input {...register("todo4")}/>
  <input {...register("todo5")}/>
</form>

>> {todo1:"", todo2:"", todo3:"", todo4:"", todo5:""}
```

위와 같은 예시라면 watch를 쓰면 해결되는거 아닌가 생각이 든다.

하지만 handleSubmit은 regitster의 두번째 인자와 함께 사용할 때 빛을 보인다.

```tsx
const { register, handleSubmit } = useForm();

const onValid = (data: any) => {
  console.log(data);
};

<form onSubmit={handleSubmit(onValid)}>
  <input {...register("todo1", { required: true })}/>
  <input {...register("todo2")}/>
  <input {...register("todo3")}/>
  <input {...register("todo4")}/>
  <input {...register("todo5")}/>
</form>

>> 
```

만약 todo1 tag에 아무런 내용을 작성하지 않는다면 아래와 같은 결과가 나온다.

- onValid 함수가 실행되지 않음
- 마우스 커서가 todo1 tag에 focus 됨

이를 바닐라자바스크립트로 개발하거나 react의 useState를 사용한다면 꽤 긴 코드를 작성해야한다. 그리고 input이 많을 수록, 조건이 까다로울수록 그저 키보드만 두들기는 개발자가 된 자신을 볼 수 있다.

#### FormState

formState는 위 handleSubmit과 같이 input의 데이터를 검증하고 그것을 에러로 표시하기 위해 에러의 내용을 확인 하는 용도로 사용된다.

```tsx
const { register, handleSubmit, formState } = useForm();

const onValid = (data: any) => {
  console.log(data);
};
console.log(formState.errors);

<form onSubmit={handleSubmit(onValid)}>
  <input {...register("todo1", { required: true })}/>
  <input {...register("todo2")}/>
  <input {...register("todo3")}/>
  <input {...register("todo4")}/>
  <input {...register("todo5")}/>
</form>

>> {todo1: {message: "", ref: input, type:"required"}}
```

위 코드를 보면 친절하게 해당 tag에서 데이터가 어떠한 조건에 따라서 submit이 되지 않았는지 가르쳐준다.

Message 키의 값은 

```
required:"Todo1 is required"
```

와 같이 사용하여 바꾸어 줄 수 있다. register의 두번째 인자인 object의 다른 key 값들은 스스로 찿아보자.
