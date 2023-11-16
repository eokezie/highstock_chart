import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface AreaChartProps {
  initialData: Highcharts.SeriesAreaOptions[];
  title?: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  initialData,
  title = "Area Chart",
  xAxisTitle = "X-Axis",
  yAxisTitle = "Y-Axis"
}) => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    chart: {
      type: "area"
    },
    title: {
      text: title
    },
    xAxis: {
      title: {
        text: xAxisTitle
      }
    },
    yAxis: {
      title: {
        text: yAxisTitle
      }
    },
    series: initialData
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: initialData
    }));
  }, [initialData]);

  return (
    <div className="w-full h-96">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default AreaChart;
