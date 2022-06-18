import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Bar} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart(props) {
  const options = {
    response: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  }
  // data
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 30],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [15, 25, 35],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      <div style ={{ width: "1000px", margin: "auto auto"}}>
        <Bar options ={options} data={data}/>
      </div>
    </>
  );
}

export default Chart;
