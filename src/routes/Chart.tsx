import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { ThemeContext } from "styled-components";
import { useContext } from "react";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const themeContext = useContext(ThemeContext);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => [price.time_open, [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)]]),
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
              foreColor: themeContext.primaryTextColor
            },
            grid: { show: false },
            yaxis: {
              show: true
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#FF9500',
                  downward: '#06B4F9'
                }
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;