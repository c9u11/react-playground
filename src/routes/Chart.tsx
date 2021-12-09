import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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

interface CharProps {
  coinId: string;
}

function Chart({ coinId }: CharProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
  console.log(isLoading, data);
  return (
    <div>{isLoading ? "Loading chart..." :
      <ApexChart
        type="line"
        series={[
          {
            name: "price",
            data: data?.map(price => price.close)
          }
        ]}
        options={{
          theme: { mode: "dark" },
          chart: {
            height: 500,
            width: 500,
            toolbar: {
              show: false
            },
            background: "trasnparent"
          },
          grid: { show: false },
          xaxis: { labels: { show: false }, axisTicks: { show: false }, categories: data?.map(price => price.time_close), type: "datetime" },
          yaxis: { show: false },
          stroke: { curve: "smooth", width: 4 },
          fill: { type: "gradient", gradient: { gradientToColors: ["#0be881"], stops: [0, 100] } },
          colors: ["#0fbcf9"],
          tooltip: {
            x: {

            },
            y: {
              formatter: value => `$ ${value.toFixed(2)}`
            }
          }
        }}
      ></ApexChart>}
    </div >);
}

export default Chart