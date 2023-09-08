import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export const ChartRotacion1 = ({tipo}) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const data = {
      labels: ["1", "2", "3"],
      datasets: [
        {
          label: "cantidad en stock",
          data: [47, 32, 7],
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    };
    
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <div className="cardChart">
      <Chart type={tipo} data={chartData} options={chartOptions} />
    </div>
  );
};
