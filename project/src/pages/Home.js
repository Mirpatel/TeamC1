
import { useEffect } from 'react';
import './style/home.css';
import React, { useState} from 'react';
import MovieCard from '../components/MovieCard';
import Layout from '../components/Layout';
import {FaSearch} from 'react-icons/fa';

const MOVIES = [

  {
    title: 'The Avengers',
    description: 'A movie that shows some super heros doing some stuff',
    imageUrl:
      'https://flxt.tmsimg.com/assets/p8815512_p_v8_ax.jpg',
    rating: "5/5",
    trailer: 'eOrNdBpGMv8 ',
    genre: "Action",
  
  },
  {
    title: 'The Texas Chainsaw Massacre',
    description: 'Great film',
    imageUrl:
      'https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1240/MTkwNTgxMjk3MDYzNTM1NzQx/the-texas-chain-saw-massacre.webp',
      rating: "2/5",
      trailer: '-e3sv1NzrCA',
      genre: "Horror",
     
  },
  {
    title: 'Parasite',
    description: 'scury film',
    imageUrl: 'https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_750/MTkwNTgxMjk2NzkxODg5MDIx/parasite2.webp',
    rating: "4/5",
    trailer: 'SEUXfv87Wpk ',
    genre: "Suspense",
  },
  {
    title: 'The Little Mermaid',
    description: 'good movie',
    imageUrl: 'https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1000/MTkwNTgxMjk3MDY1NTY3MzU3/usa-the-little-mermaid---in-studio-preview.webp',
    rating: "3/5",
    trailer: '0-wPm99PF9U',
    genre: 'Feel-good'
  },

  {
    title: 'The Avengers',
    description: 'A movie that shows some super heros doing some stuff',
    imageUrl:
      'https://flxt.tmsimg.com/assets/p8815512_p_v8_ax.jpg',
      rating: "4/5",
      trailer: 'eOrNdBpGMv8 ',
  
  },
  {
    title: 'The Texas Chainsaw Massacre',
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

function Home(props) {


  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(MOVIES);
  
  useEffect(() => {
     const fetchMovies = async () => {
       const response = await fetch("http://localhost:8000");
       const data = await response.json();
       setFilteredData(data);
     };

     fetchMovies();
  }, []);
const search = (event) => {
  const query = event.target.value;
  setSearchQuery(query);

  let searchWords = query.toLowerCase().split(" ");
  if (searchWords[0] === "the") {
    searchWords = searchWords.slice(1);
  }

  const filtered = MOVIES.filter((item) => {
    const titleWords = item.title.toLowerCase().split(" ");
    for (let i = 0; i < titleWords.length - searchWords.length + 1; i++) {
      if (titleWords[i] === searchWords[0]) {
        let found = true;
        for (let j = 1; j < searchWords.length; j++) {
          if (titleWords[i + j] !== searchWords[j]) {
            found = false;
            break;
          }
        }
        if (found) {
          return true;
        }
      }
    }
    return false;
  });

  if (filtered.length === 0) {
    setFilteredData(MOVIES);
  } else {
    setFilteredData(filtered);
  }
};




  return (

  
    
    <>
      <h1 className = "mov">Movies</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={search}
        placeholder="Search..."
      />
      <button onClick = {search}><FaSearch/></button>
      <br/>
      <Layout items={filteredData}/>
    </>
    
  );
}

export default Home;
