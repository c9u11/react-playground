import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
function App() {
  return (
    <Router basename="/react-playground/ott-page/build">
      <Header></Header>
      <Switch>
        <Route path={["/tv", "/tv/:category/:movieId"]}>
          <Tv></Tv>
        </Route>
        <Route path="/search">
          <Search></Search>
        </Route>
        <Route path={["/", "/movies/:category/:movieId"]}>
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
