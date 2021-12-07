import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import Select from 'react-select'
import axios from 'axios'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const GraphFive = () => {

  const data = [
    {
      value: 'IN',
      label: 'India'
    },
    {
      value: 'JP',
      label: 'Japan'
    },
    {
      value: 'TR',
      label: 'Turkey'
    },
    {
      value: 'BG',
      label: 'Bulgaria'
    },
    {
      value: 'CN',
      label: 'China'
    },
    {
      value: 'ID',
      label: 'Indonesia'
    },
    {
      value: 'HK',
      label: 'Hong Kong'
    },
    {
      value: 'PH',
      label: 'Phillipines'
    },
    {
      value: 'SG',
      label: 'Singapore'
    },
    {
      value: 'IL',
      label: 'Ireland'
    },
    {
      value: 'CN',
      label: 'Canada'
    }
  ]
  const [selectedValue, setSelectValue] = useState(null);
  const handleChange = obj => {
    setSelectValue(obj.value);
    console.log(selectedValue)
  }

  let yearForLanguage = [];
  let popularityForLanguage = [];

  axios.post("http://localhost:3000/popularLanguages", {
    region: selectedValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        yearForLanguage.push(dataObj.YEAR)
        popularityForLanguage.push(dataObj.POPULARITY)
    }
  })
  .catch(err => {
    console.log(err)
  });


  return (
    <div>
      <h1>Popularity of Region-Specific for Titles</h1>
      <Select
      value = {selectedValue}
      options={data}
      onChange={handleChange}/>   
      <Line
        data={{
          labels: yearForLanguage,
          datasets: [
            {
              label: 'Popularity for Current Region',
              data: popularityForLanguage,
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
          aspectRatio: 4,
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

export default GraphFive