import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import Select from 'react-select'
import axios from 'axios'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphThree = () => {

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

  let yearForMatureMovies = [];
  let percentageForMatureMovies = [];
  //Adult Percent Movies
  axios.get("http://localhost:3000/adultPercentMovies").then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      yearForMatureMovies.push(dataObj.YEAR)
      percentageForMatureMovies.push(dataObj.PERCENT)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let yearForMatureSeries = [];
  let percentageForMatureSeries = [];
  //Adult Percent Series
  axios.get("http://localhost:3000/adultPercentSeries").then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      yearForMatureSeries.push(dataObj.YEAR)
      percentageForMatureSeries.push(dataObj.PERCENT)
    }
  })
  .catch(err => {
    console.log(err)
  });
  
  const [selectedValue, setSelectValue] = useState(null);
  const handleChange = obj => {
    setSelectValue(obj.label);
  }

  let yearForMatureGenreMovies = [];
  let percentageForMatureGenreMovies = [];
  //Genre Percent Movies
  axios.post("http://localhost:3000/adultGenrePercentMovies" , {
    genre: selectedValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      yearForMatureGenreMovies.push(dataObj.YEAR)
      percentageForMatureGenreMovies.push(dataObj.PERCENT)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let percentageForMatureGenreSeries = [];
  //Genre Percent Series
  axios.post("http://localhost:3000/adultGenrePercentSeries" , {
    genre: selectedValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      percentageForMatureGenreSeries.push(dataObj.PERCENT)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let yearForPopularitySeries = [];
  let percentageForPopularitySeries = [];
  //Adult Popularity Series
  axios.get("http://localhost:3000/adultPopularitySeries").then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      yearForPopularitySeries.push(dataObj.YEAR)
      percentageForPopularitySeries.push(dataObj.POPULARITY)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let percentageForPopularityMovies = [];
  //Adult Popularity Movies
  axios.get("http://localhost:3000/adultPopularityMovies").then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      percentageForPopularityMovies.push(dataObj.POPULARITY)
    }
  })
  .catch(err => {
    console.log(err)
  });

  return (
    <div>
      <h1>Percentage of Mature Titles over the years</h1> 
      <Line
        data={{
          labels: yearForMatureMovies,
          datasets: [
            {
              label: 'Percentage for Mature Movies',
              data: percentageForMatureMovies,
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
            {
              label: 'Percentage for Mature Series',
              data: percentageForMatureSeries,
              backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
             ],
             borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
              'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
            }
             
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
      <div>
        <h1> Percentage of Mature Films within Genre </h1>
      <Select
      value = {selectedValue}
      options={data}
      onChange={handleChange}/>  
      <Line
        data={{
          labels: yearForMatureGenreMovies,
          datasets: [
            {
              label: 'Percentage in Genre Movies',
              data: percentageForMatureGenreMovies,
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
            {
              label: 'Percentage in Genre Series',
              data: percentageForMatureGenreSeries,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }
             
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
      <h1>Popularity of Mature Titles over the years</h1>
      <Line
        data={{
          labels: yearForPopularitySeries,
          datasets: [
            {
              label: 'Popularity for Mature Movies',
              data: percentageForPopularityMovies,
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
            {
              label: 'Popularity for Mature Series',
              data: percentageForPopularitySeries,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }
             
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
      </div>
  )
}

export default GraphThree