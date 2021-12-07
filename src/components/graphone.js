import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import Select from 'react-select'
import axios from 'axios'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const GraphOne = () => {

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
    },
    {
      value: 4,
      label: 'Talk-Show'
    },
    {
      value: 5,
      label: 'Short'
    },
    {
      value: 6,
      label: 'Drama'
    },
    {
      value: 7,
      label: 'Musical'
    },
    {
      value: 8,
      label: 'Adult'
    },
    {
      value: 9,
      label: 'Crime'
    },
    {
      value: 10,
      label: 'Documentary'
    },
    {
      value: 11,
      label: 'Reality-TV'
    },
    {
      value: 12,
      label: 'Thriller'
    },
    {
      value: 13,
      label: 'Sci-Fi'
    },
    {
      value: 14,
      label: 'Action'
    },
    {
      value: 15,
      label: 'Animation'
    },
    {
      value: 16,
      label: 'Biography'
    },
    {
      value: 17,
      label: 'Mystery'
    }
  ]
  const [selectedValue, setSelectValue] = useState(null);
  const handleChange = obj => {
    setSelectValue(obj.label);
  }

  const [selectedTValue, setSelectTValue] = useState(null);
  const handleTChange = objj => {
    setSelectTValue(objj.label);
  }

  let yearForMovies = [];
  let ratingsForMovies = [];

  let yearForTV = [];
  let ratingsForTV = [];

  axios.post("http://localhost:3000/genreRatingsSeries", {
    genre: selectedTValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      yearForTV.push(dataObj.STARTYEAR)
      ratingsForTV.push(dataObj.AVERAGERATING)
    }
  })
  .catch(err => {
    console.log(err)
  });

  axios.post("http://localhost:3000/genreratings", {
    genre: selectedValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      yearForMovies.push(dataObj.STARTYEAR)
      ratingsForMovies.push(dataObj.AVERAGERATING)
    }
  })
  .catch(err => {
    console.log(err)
  });



  
  return (
    <div>
      <h1>Genre vs Ratings for Movies</h1>
      <Select
      value = {selectedValue}
      options={data}
      onChange={handleChange}/>   
      <Line
        data={{
          labels: yearForMovies,
          datasets: [
            {
              label: 'Average Ratings',
              data: ratingsForMovies,
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
          aspectRatio: 8,
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
      <h1>Genre vs Ratings for Television Shows</h1>
      <Select
      value = {selectedTValue}
      options={data}
      onChange={handleTChange}/> 
      <Line
        data={{
          labels: yearForTV,
          datasets: [
            {
              label: 'Average Ratings',
              data: ratingsForTV,
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
          aspectRatio: 8,
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