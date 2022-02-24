# Coin Tracker

react의 기본적인 문법 파악 및 간단한 프로젝트 제작을 목적으로 진행함



## React 프로젝트의 기본 구조 이해

사용자는 기본적으로 public 폴더의 index.html을 요청하여 첫 페이지를 본다.

index.html에서 아래 index.js를 import 하고 app.js를 Rendering 한다.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

이후 App.js에서 자신의 원하는 코드를 작성하면된다.

> App.js 및 index.js는 언제든지 이름을 바꾸어도 괜찮다. 다만 import 부분을 그에 맞게 수정해주어야 한다.
>
> 모든 프로젝트의 구조가 위와 같지는 않다. 경우에 따라 App.js에서 router 등으로 프로젝트 구조를 펼칠 수 있다.



## useState를 사용하여 loading 구현

```jsx
const [loading, setLoading] = useState(true);

...

{loading ? <strong>Loading...</strong> : <Content/>}
```



## useEffect를 사용하여 처음 페이지를 들어왔을 때만 Coin 정보를 가져오는 로직 구현

```jsx
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(res => res.json())
      .then(json => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
```



## Example Page

[Example Page]: https://c9u11.github.io/react-playground/coin-tracker/build/index.html

