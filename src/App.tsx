/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const symbol = "ETH";
const dataUrl = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=400`;
const priceUrl = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`;

interface AppState {
  loading: boolean;
  data: [number, number][] | null;
}

const StockChart: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    loading: false,
    data: null
  });

  useEffect(() => {
    setAppState({ loading: true, data: null });
    const arr1: number[] = [];

    fetch(priceUrl)
      .then((response) => response.json())
      .then((data1) => {
        const price = data1.USD;
        arr1.push(price);

        fetch(dataUrl)
          .then((res) => res.json())
          .then((timeSeriesData) => {
            const arr = timeSeriesData.Data.Data.map(
              (key: any) => [key.time * 1000, key.close] as [number, number][]
            );
            setAppState({ loading: false, data: arr });
          });
      });
  }, [setAppState]);

  const { data } = appState;
  const firstColor = Highcharts.getOptions()?.colors?.[0] || "#000000";

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "white",
      type: "area",
      height: "500px"
    },
    accessibility: {
      enabled: false
    },
    plotOptions: {
      series: {
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, firstColor] as Highcharts.GradientColorStopObject,
            [
              1,
              Highcharts.color(firstColor).setOpacity(0).get("rgba")
            ] as Highcharts.GradientColorStopObject
          ]
        }
      }
    },
    series: [
      {
        name: "NASD OTC",
        // @ts-ignore
        data,
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  };

  return (
    <div id="container">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={options}
      />
    </div>
  );
};

export default StockChart;
