import React, {Component} from "react";
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

class Chart extends Component {
  constructor(props){
    super(props);
    this.state={
      chartData: {
        labels: ['2019', '2020', '2021', '2022', 'Q4 2020', 'Q4 2021'],
        datasets: [
          {
            label: 'Earnings',
            data: [500, 600, 700, 800, 300, 400],
            backgroundColor: "rgba(255, 99, 132, 0.5)"
          },
          {
            label: 'Gross Profit',
            data: [400, 450, 600, 750, 240, 390],
            backgroundColor: "rgba(53, 162, 235, 0.5)"
          },
          {
            label: 'Operating Income',
            data: [300, 400, 550, 700, 200, 350],
            backgroundColor: "rgba(255, 148, 120, 0.5)"
          }
        ]
      }
    };
  }
  render() {
    return(
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            aspectRatio: 3
          }}
        />
      </div>
    )
  }
}

export default Chart;
