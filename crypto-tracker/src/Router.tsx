import { BrowserRouter, Switch, Route } from "react-router-dom"
import Coin from "./routes/Coin"
import Coins from "./routes/Coins"

function Router() {
  return <BrowserRouter basename="/react-playground/crypto-tracker">
    <Switch>
      <Route path="/:coinId">
        <Coin></Coin>
      </Route>
      <Route path="/">
        <Coins></Coins>
      </Route>
    </Switch>
  </BrowserRouter>
}
export default Router;