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
            maintainAspectRatio: false
          }}
        />
      </div>
    )
  }
}

export default Chart;