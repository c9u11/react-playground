import { useEffect, useState } from "react";
import { Switch, useLocation, useParams, Route, useRouteMatch } from "react-router";
import Price from "./Price";
import Chart from "./Chart";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoins, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
font-size: 48px;
  color:${props => props.theme.accentColor}
`

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Tabs = styled.span<{ isActive: boolean }>`
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor}
`;
interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

interface RouteParams {
  coinId: string;
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_: string;
}
interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24: number;
    }
  }
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<CoinInterface>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId))
  const { isLoading: tickersLoading, data: tickersData } = useQuery<ITickersData>(["tickers", coinId], () => fetchCoinTickers(coinId), { refetchInterval: 5000 })
  const loading = infoLoading || tickersLoading;
  return <Container>
    <Helmet>
      <title>{loading ? "Loading" : coinId}</title>
    </Helmet>
    <Header>
      <Title>{loading ? "Loading" : coinId}</Title>
    </Header>
    {loading ? <Loader>Loading...</Loader> :
      <div>
        {tickersData?.quotes.USD.percent_change_24h}
        <Tabs isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>
            price
          </Link>
        </Tabs>
        <Tabs isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>
            Chart
          </Link>
        </Tabs>
        <Switch>
          <Route path={`/:coinId/price`}>
            <Price></Price>
          </Route>
          <Route path={`/:coinId/chart`}>
            <Chart coinId={coinId}></Chart>
          </Route>
        </Switch>
      </div>
    }
  </Container >
}
export default Coin;