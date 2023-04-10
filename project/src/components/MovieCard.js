import './style/movieCard.css';
import { useState } from 'react';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import {FaChevronCircleLeft} from 'react-icons/fa';
import { useLocation} from "react-router-dom"

//Code for embedding youtube video
import PropTypes from "prop-types";
const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};
Modal.setAppElement('#root');
//code for MovieCard
const MovieCard = props  => {
    const [flip, setFlip] = useState(false);

    const handleClick = (event) => {
      // Check if the click event was on the "Watch Trailer" button
      const isWatchTrailerButton = event.target.closest('.card').querySelector('.buttonReprise2') === event.target;
      
      if (!isWatchTrailerButton) {
        setFlip(true);
      } else {
        setFlip(false);
      }
    }
    
    const handleClickBack = () => {
        setFlip(!flip);
        console.log(props.key);
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(event) {
      event.stopPropagation();
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        
      }
    
      function closeModal() {
        setIsOpen(false);
      }
      
  return (
    <>
    <div className = "card" onClick = {handleClickBack}>

        
        
        {!flip &&(
          <>
          <h4 className = "comingSoonTitle">{props.Name}</h4>
        <img className = "imageComing" src= {props.Url} onClick = {handleClick}/>
        </>
        )}
        {flip &&(
            <>
           
              <div className = "flippedSide">

              <p className = "comingSoonTitleBack">{props.Name}</p>

                <div className = "genre">
                  <div className = "otherInfo">
                    <div className = "infoOpt2">
                <p className = "cate2">Genre</p>
              
                <p className='ans2'>{props.genre}</p>
                </div>
     
          <div className = "genreSpace infoOpt2">
          <p className = "cate2">Rating</p>
    
          <p className='ans2'>{props.movierating}</p>
          </div>
          </div>
          <div className = "otherInfo">
          <div className = "genreSpace infoOpt2">
          <p className = "cate2">Producer</p>
        
          <p className='ans2'>{props.producer}</p>
          </div>
          <div className = "genreSpace infoOpt2">
          <p className = "cate2">Director</p>
        
          <p className='ans2'>{props.director}</p>
          </div>
          </div>
          <div className = "genreSpace">
          <p className = "cate2">Cast</p>
        
          <p className='ans2'>{props.cast}</p>
          </div>
          <div className = "line2"/>
            <div className='descriptionSpace'>

                    <p className = "cate2">Description</p>
          
                    <p className='ans2'>{props.description}</p>

              </div>

                </div>
                <div className = "cardButtons">
                    <Link to={{pathname :"/ShowTimes"}} state={{from: props.Name, id: props.index}} className='buttonReprise2'>See Show Times</Link>

                   <button onClick={openModal} className="buttonReprise2">Watch Trailer</button>
                </div>
                  <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style="content"
                  contentLabel="Example Modal"
                  >
                    <button className = "buttonReprise2" onClick={closeModal}>close</button>
                  <div>
                    <YoutubeEmbed embedId={props.trailer}/>
                  </div>
                  </Modal>
                  
              </div>
    
            </>
        )}
        
      </div>
    </>
  );
}

export default MovieCard;