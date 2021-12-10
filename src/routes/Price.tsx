import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface PriceProps {
  coinId: string;
}
interface PriceData {
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
      volume_24h_change_24h: number;
    };
  };
}

const Table = styled.table`
  text-align: center;
  text-transform: uppercase;
  background-color: ${props => props.theme.boxBgColor};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 10px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px;
  th {
    color : ${props => props.theme.boxTextColor};
    font-weight: bolder;
  }
  tr {
    color : ${props => props.theme.secondaryTextColor};
  }
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data: priceData } = useQuery<PriceData>(
    ["ohlcv", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <Table>
          <tbody>
            <tr>
              <th>Price</th>
              <td>{priceData?.quotes?.USD.price}</td>
            </tr>
            <tr>
              <th>percent_change_15m</th>
              <td>{priceData?.quotes?.USD.percent_change_15m}</td>
            </tr>
            <tr>
              <th>percent_change_30m</th>
              <td>{priceData?.quotes?.USD.percent_change_30m}</td>
            </tr>
            <tr>
              <th>percent_change_1h</th>
              <td>{priceData?.quotes?.USD.percent_change_1h}</td>
            </tr>
            <tr>
              <th>percent_change_6h</th>
              <td>{priceData?.quotes?.USD.percent_change_6h}</td>
            </tr>
            <tr>
              <th>percent_change_12h</th>
              <td>{priceData?.quotes?.USD.percent_change_12h}</td>
            </tr>
            <tr>
              <th>percent_change_24h</th>
              <td>{priceData?.quotes?.USD.percent_change_24h}</td>
            </tr>
            <tr>
              <th>percent_change_7d</th>
              <td>{priceData?.quotes?.USD.percent_change_7d}</td>
            </tr>
            <tr>
              <th>percent_change_30d</th>
              <td>{priceData?.quotes?.USD.percent_change_30d}</td>
            </tr>
            <tr>
              <th>percent_change_1y</th>
              <td>{priceData?.quotes?.USD.percent_change_1y}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default Price;