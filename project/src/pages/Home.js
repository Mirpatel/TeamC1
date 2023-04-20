
import { useEffect } from 'react';
import './style/home.css';
import React, { useState} from 'react';
import MovieCard from '../components/MovieCard';
import Layout from '../components/Layout';
import {FaSearch} from 'react-icons/fa';
import NowPlayingLayout from '../components/NowPlayingLayout';
import Axios from 'axios';
const MOVIES = [

  {
    Name: 'The Avengers',
    description: 'A movie that shows some super heros doing some stuff',
    Url:
      'https://flxt.tmsimg.com/assets/p8815512_p_v8_ax.jpg',
    rating: "5/5",
    trailer: 'eOrNdBpGMv8 ',
    genre: "Action",
  
  },
  {
    Name: 'The Texas Chainsaw Massacre',
    description: 'Great film',
    Url:
      'https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1240/MTkwNTgxMjk3MDYzNTM1NzQx/the-texas-chain-saw-massacre.webp',
      rating: "2/5",
      trailer: '-e3sv1NzrCA',
      genre: "Horror",
     
  },
  {
    Name: 'Parasite',
    description: 'scury film',
    Url: 'https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_750/MTkwNTgxMjk2NzkxODg5MDIx/parasite2.webp',
    rating: "4/5",
    trailer: 'SEUXfv87Wpk ',
    genre: "Suspense",
  },
  {
    Name: 'The Little Mermaid',
    description: 'good movie',
    imageUrl: 'https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1000/MTkwNTgxMjk3MDY1NTY3MzU3/usa-the-little-mermaid---in-studio-preview.webp',
    rating: "3/5",
    trailer: '0-wPm99PF9U',
    genre: 'Feel-good'
  },

  {
    Name: 'The Avengers',
    description: 'A movie that shows some super heros doing some stuff',
    imageUrl:
      'https://flxt.tmsimg.com/assets/p8815512_p_v8_ax.jpg',
      rating: "4/5",
      trailer: 'eOrNdBpGMv8 ',
  
  },
  {
    Name: 'The Texas Chainsaw Massacre',
    description: 'Great film',
    imageUrl:
      'https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1240/MTkwNTgxMjk3MDYzNTM1NzQx/the-texas-chain-saw-massacre.webp',
      rating: "1/5",
      trailer: '-e3sv1NzrCA',
     
  },
  {
    title: 'Parasite',
    description: 'scury film',
    imageUrl: 'https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_750/MTkwNTgxMjk2NzkxODg5MDIx/parasite2.webp',
    rating: "5/5",
    trailer: 'SEUXfv87Wpk ',
  },
  {
    title: 'The Little Mermaid',
    description: 'good movie',
    imageUrl: 'https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1000/MTkwNTgxMjk3MDY1NTY3MzU3/usa-the-little-mermaid---in-studio-preview.webp',
    rating: "4/5",
    trailer: '0-wPm99PF9U',
  },
  

];

function Home({showSearch}) {
  
const handleGenre = () => {
setActiveOption('genre');
console.log("genre active");
}

const handleTitle = () => {
  setActiveOption('title');
}

const handleChange = (event) => {

setSearchQuery(event.target.value);
if (event.target.value === "") {
  setPage2(false);
  setNotFound(false);
}
else {
  setPage2(true);
} 
}
  const [notFound, setNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [nowPlayingData, setNowPlayingData] = useState(MOVIES);
  const [comingSoonData, setComingSoonData] = useState(MOVIES);
  const [page2, setPage2] = useState(false);
  useEffect(() => {
   //call coming soon api
   Axios.post('http://localhost:3001/movies-coming-soon', {
  
   })
   .then((response) => {
    console.log(response)
    setComingSoonData(response.data);
})
   .catch((error) => console.log(error));

   //call now playing API

   Axios.post('http://localhost:3001/movies-now-playing', {
  
  })
  .then((response) => {
   console.log(response)
   setNowPlayingData(response.data);
   
})
  .catch((error) => console.log(error));

      console.log(showSearch);
     const fetchMovies = async () => {
       const response = await fetch("http://localhost:3003");
       const data = await response.json();
       setFilteredData(data);
     };

     fetchMovies();


     if (showSearch === false) {
      setPage2(false);
     }
  },  [showSearch]);
const search = () => {
setNotFound(false);

  const query = searchQuery;
 
//get active option and then send to database with search event value
//set response to filtered data and make page2 set to true
//if search value is at "" then set page2 to false
if (activeOption === 'genre') {
  console.log(query);
Axios.post('http://localhost:3001/movie-filter-genre', {
  genre: query
})
.then((response) => {
 console.log(response)
 setFilteredData(response.data);
})
.catch((error) => {
  //make error message here
  setNotFound(true);
  console.log(error)});
  setFilteredData('');
}

else if (activeOption === 'title') {
  Axios.post('http://localhost:3001/movie-filter-title', {
  title: query
  })
  .then((response) => {
   console.log(response)
   setFilteredData(response.data);
  })
  .catch((error) => {
    //make error message here
    setNotFound(true);
    console.log(error)});
    setFilteredData('');
}
};

const [activeOption, setActiveOption] = useState('genre');




  return (

  
    
    <div className = "homeHeight">
     
      {showSearch && (
        <div className = "searchButtonPos">
          <div className = "searchChoice">
          <div
          className='searchOpt'
          style = {{ filter: activeOption === 'title' ? 'drop-shadow(4px 4px 4px rgba(252, 252, 252, 0.5))' : 'none' }}
        onClick={handleTitle}
      >
        <p className="p">TITLE</p>
      </div>

      <div
      className='searchOpt'
        style = {{ filter: activeOption === 'genre' ? 'drop-shadow(4px 4px 4px rgba(252, 252, 252, 0.5))' : 'none' }}
        onClick={handleGenre}
      >
        <p className="p">GENRE</p>
      </div>
          </div>
            <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search..."
            className='inputBoxSearch'
          />
          <button onClick = {search} className = "faSearch"><FaSearch/></button>
          </div>
      )}

{!page2 && (
  <>
   <h3 className = "mov">NOW PLAYING</h3>
        <NowPlayingLayout items={nowPlayingData}/>
        <h3 className = "mov">COMING SOON</h3>
        <Layout items={comingSoonData}/>
        </>
)}


      {page2 && (

        <>
        {notFound && (
          <h3 className = "mov">Movie not found...</h3>
        )}
         <NowPlayingLayout items={filteredData}/>
        </>
      )}
    </div>
    
  );
}

export default Home;
