import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import Select from 'react-select'
import axios from 'axios'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const GraphFour = () => {

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

  let yearForRuntime30 = [];
  let percentForRuntime30 = [];

  axios.get("http://localhost:3000/runtimePercent30Series").then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        yearForRuntime30.push(dataObj.STARTYEAR)
        percentForRuntime30.push(dataObj.PERCENT)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let percentForRuntime30and60 = [];
  axios.get("http://localhost:3000/runtimePercent30and60Series").then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        percentForRuntime30and60.push(dataObj.PERCENT)
    }
  })
  .catch(err => {
    console.log(err)
  });
   
  let percentForRuntime60 = [];
  axios.get("http://localhost:3000/runtimePercent60Series").then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        percentForRuntime60.push(dataObj.PERCENT)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let percentForRuntime90Movies = [];
  axios.get("http://localhost:3000/runtimePercent90Movies").then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        percentForRuntime90Movies.push(dataObj.PERCENT)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let percentForRuntime90to120Movies = [];
  axios.get("http://localhost:3000/runtimePercent90to120Movies").then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        percentForRuntime90to120Movies.push(dataObj.PERCENT)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let percentForRuntime120Movies = [];
  axios.get("http://localhost:3000/runtimePercent120Movies").then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        percentForRuntime120Movies.push(dataObj.PERCENT)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let yearForRuntimePop30 = [];
  let percentForRuntimePop30 = [];

  axios.post("http://localhost:3000/runtimePopularity30Series", {
      genre: selectedValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        yearForRuntimePop30.push(dataObj.YEAR)
        percentForRuntimePop30.push(dataObj.POPULARITY)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let yearForRuntimePop30and60 = [];
  let percentForRuntimePop30and60 = [];

  axios.post("http://localhost:3000/runtimePopularity30to60Series", {
      genre: selectedValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        yearForRuntimePop30and60.push(dataObj.YEAR)
        percentForRuntimePop30and60.push(dataObj.POPULARITY)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let yearForRuntimePop60 = [];
  let percentForRuntimePop60 = [];

  axios.post("http://localhost:3000/runtimePopularity60Series", {
      genre: selectedValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        yearForRuntimePop60.push(dataObj.YEAR)
        percentForRuntimePop60.push(dataObj.POPULARITY)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let yearForRuntimePop90Movies = [];
  let percentForRuntimePop90Movies = [];

  axios.post("http://localhost:3000/runtimePopularity90Movies", {
      genre: selectedTValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        yearForRuntimePop90Movies.push(dataObj.YEAR)
        percentForRuntimePop90Movies.push(dataObj.POPULARITY)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let yearForRuntimePop90to120Movies = [];
  let percentForRuntimePop90to120Movies = [];

  axios.post("http://localhost:3000/runtimePopularity90to120Movies", {
      genre: selectedTValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        yearForRuntimePop90to120Movies.push(dataObj.YEAR)
        percentForRuntimePop90to120Movies.push(dataObj.POPULARITY)
    }
  })
  .catch(err => {
    console.log(err)
  });

  let yearForRuntimePop120Movies = [];
  let percentForRuntimePop120Movies = [];

  axios.post("http://localhost:3000/runtimePopularity120Movies", {
      genre: selectedTValue
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
        yearForRuntimePop120Movies.push(dataObj.YEAR)
        percentForRuntimePop120Movies.push(dataObj.POPULARITY)
    }
  })
  .catch(err => {
    console.log(err)
  });
 

  return (
    <div>
      <h1>Percentage for Different Runtimes in Television Series</h1> 
      <Line
        data={{
          labels: yearForRuntime30,
          datasets: [
            {
              label: '< 30 Minute Series %',
              data: percentForRuntime30,
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
              label: '30 to 60 Minutes Series %',
              data: percentForRuntime30and60,
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
                label: '> 60 Minute Series %',
                data: percentForRuntime60,
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
          aspectRatio: 5,
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
      <h1>Percentage for Different Runtimes in Movies</h1>
      <Line
        data={{
          labels: yearForRuntime30,
          datasets: [
            {
                label: '< 90 Minute Movies %',
                data: percentForRuntime90Movies,
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
                label: '90 to 120 Minutes Movies %',
                data: percentForRuntime90to120Movies,
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
                label: '> 120 Minute Movies %',
                data: percentForRuntime120Movies,
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
            }
             
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: true,
          aspectRatio: 5,
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
      <h1>Popularity for Different Runtimes in Different Genres (TV Series)</h1>
      <Select
      value = {selectedValue}
      options={data}
      onChange={handleChange}/> 
      <Line
        data={{
          labels: yearForRuntimePop30,
          datasets: [
            {
              label: '< 30 Minute Series Popularity',
              data: percentForRuntimePop30,
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
              label: '30 to 60 Minutes Series Popularity',
              data: percentForRuntimePop30and60,
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
                label: '> 60 Minute Series Popularity',
                data: percentForRuntimePop60,
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
            }
             
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: true,
          aspectRatio: 5,
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
      <h1>Popularity for Different Runtimes in Different Genres (Movies)</h1>
      <Select
      value = {selectedTValue}
      options={data}
      onChange={handleTChange}/> 
      <Line
        data={{
          labels: yearForRuntimePop30,
          datasets: [
            {
                label: '< 90 Minute Movies Popularity',
                data: percentForRuntimePop90Movies,
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
                label: '90 to 120 Minutes Movies Popularity',
                data: percentForRuntimePop90to120Movies,
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
                label: '> 120 Minute Movies Popularity',
                data: percentForRuntimePop120Movies,
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
            }
             
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: true,
          aspectRatio: 5,
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

export default GraphFour