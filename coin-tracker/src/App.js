import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(res => res.json())
      .then(json => console.log(json));
  }, []);
  return (
    <div>
      <h1>The Coins!</h1>
      {loading ? <strong>Loading...</strong> : null}
    </div>
  );
}

export default App;
