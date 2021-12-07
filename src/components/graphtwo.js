import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import "./custom.css"
import {Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import axios from 'axios'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphTwo = () => {
  //SEARCH BAR 1
  const [titles, setTitles] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([])
  const [answer, setAnswer] = useState([])

  //SEARCH BAR 2
  const [text1, setText1] = useState('');
  const [suggestions1, setSuggestions1] = useState([])
  const [answer1, setAnswer1] = useState('');

  useEffect(() => {
    const loadTitles = async () => {
      const response = await axios.get("http://localhost:3000/episodeTitle");
      console.log(response.data)
      setTitles(response.data)
    }
    loadTitles();
  }, [])

  const onSuggestHandler = (text)=> {
    setText(text);
    setSuggestions([]);
  }
  const onSuggestHandler1 = (text1)=> {
    setText1(text1);
    setSuggestions1([]);
  }
  const onChangeHandler = (text) => {
    let matches = []
    if(text.length > 0) {
    matches = titles.filter(title => {
      const regex = new RegExp(`${text}`, "gi");
      return title.PRIMARYTITLE.match(regex)
    })
  }
    setSuggestions(matches)
    setText(text)
  }
 
  const onChangeHandler1 = (text1) => {
    let matches = []
    if(text1.length > 0) {
    matches = titles.filter(title => {
      const regex = new RegExp(`${text1}`, "gi");
      return title.PRIMARYTITLE.match(regex)
    })
  }
    console.log(matches)

    setSuggestions1(matches)
    setText1(text1)
  }
  let episodeNum = [];
  let ratingsForEpisode = [];
  let popularityForEpisode = [];

  function handleSubmit () {
  setAnswer(text)

  axios.post("http://localhost:3000/episodeRatings1", {
    seriesName: answer
    }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      const epSeason = 'S' + dataObj.SEASON + 'E' + dataObj.EPISODENUMBER
      episodeNum.push(epSeason)
      ratingsForEpisode.push(dataObj.AVERAGERATING) 
    }
  })
  .catch(err => {
    console.log(err)
  });

  axios.post("http://localhost:3000/episodePopularity1", {
    seriesName: answer
  }).then(res => {
    console.log(res)
    for(const dataObj of res.data) {
      popularityForEpisode.push(dataObj.POPULARITY) 
    }
  })
  .catch(err => {
    console.log(err)
  });
  }
  
  let episodeNum1 = [];
  let ratingsForEpisode1 = [];
  let popularityForEpisode1 = [];

  function handleSecondSubmit () {
    setAnswer1(text1)
    axios.post("http://localhost:3000/episodeRatings2", {
      seriesName: answer1
    }).then(res => {
      console.log(res)
      for(const dataObj of res.data) {
        const epSeason = 'S' + dataObj.SEASON + 'E' + dataObj.EPISODENUMBER
        episodeNum1.push(epSeason)
        ratingsForEpisode1.push(dataObj.AVERAGERATING)
      }
    })
    .catch(err => {
      console.log(err)
    });
    
    axios.post("http://localhost:3000/episodePopularity2", {
      seriesName: answer1
    }).then(res => {
      console.log(res)
      for(const dataObj of res.data) {
        popularityForEpisode1.push(dataObj.POPULARITY)
      }
    })
    .catch(err => {
      console.log(err)
    });
  
  }
  
  return (
    <div>
      <h1>Popularity vs Ratings for TV Series</h1>
      <div className="container">
      <input type="text" className="col-md-12" style ={{ marginTop: 10 }}
      onChange={e => onChangeHandler(e.target.value)}
      placeholder="Type first series..."
      onBlur={() => {
        setTimeout(() => {
          setSuggestions([])
        }, 100);
      }}
      value={text}
      />
      {suggestions && suggestions.map((suggestion, i) =>
      <div key={i} className="suggestion col-md-12 justify-content-md-center"
      onClick={()=> onSuggestHandler(suggestion.PRIMARYTITLE)}>{suggestion.PRIMARYTITLE} </div>
      )}
      </div>
      <button onClick={handleSubmit}
      disabled = {text === null}>Submit</button>
      <div className="container">
      <input type="text" className="col-md-12" style ={{ marginTop: 10 }}
      onChange={e => onChangeHandler1(e.target.value)}
      placeholder="Type second series..."
      onBlur={() => {
        setTimeout(() => {
          setSuggestions1([])
        }, 100);
      }}
      value={text1}
      />
      {suggestions1 && suggestions1.map((suggestion1, i) =>
      <div key={i} className="suggestion col-md-12 justify-content-md-center"
      onClick={()=> onSuggestHandler1(suggestion1.PRIMARYTITLE)}>{suggestion1.PRIMARYTITLE} </div>
      )}
      </div>
      <button onClick = {handleSecondSubmit}>Submit</button>
      <Line
        data={{
          labels: episodeNum,
          datasets: [
            {
              label: 'Average Ratings of Series 1',
              data: ratingsForEpisode,
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
              label: 'Popularity of Series 1',
              data: popularityForEpisode,
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
              label: 'Average Ratings on Series 2',
              data: ratingsForEpisode1,
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
              label: 'Popularity of Series 2',
              data: popularityForEpisode1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
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

export default GraphTwo