import React, { useState, Component } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import Select from 'react-select'
import axios from 'axios'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const GraphOne = () => {
  const [chartData, setChartData] = useState({});
  const [startYear, setStartYear] = useState([]);
  const [averageRatings, setAverageRatings] = useState([]);
  const data = [
    {
      value: 1,
      label: 'Romance'
    },
    {
      value: 2,
      label: 'Comedy'
    },
    {
      value: 3,
      label: 'Horror'
    }
  ]
  const [selectedValue, setSelectValue] = useState(null);
  const handleChange = obj => {
    setSelectValue(obj.label);
  }


  let year = [];
  let ratings = [];

  axios.post("http://localhost:3000/genreratings", {
    genre: selectedValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      year.push(dataObj.STARTYEAR)
      ratings.push(dataObj.AVERAGERATING)
    }
  })
  .catch(err => {
    console.log(err)
  });


  
  return (
    <div>
      <Select
      value = {selectedValue}
      options={data}
      onChange={handleChange}/>   
      <Line
        data={{
          labels: year,
          datasets: [
            {
              label: 'Average Ratings',
              data: ratings,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
             
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: true,
          aspectRatio: 3,
          responsive: true,
          scales: {
            xAxes: [{
            }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
      </div>
  )
}

export default GraphOne