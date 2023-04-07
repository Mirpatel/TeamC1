import './style/nowPlayingCard.css';
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
const NowPlayingCard = props  => {
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
    <div className = "cardNowPlaying" onClick = {handleClickBack}>

       
        
        {!flip &&(
            <div className = "frontCard">
            <div className = "leftSide">
            <p className = "movieTitle">{props.Name}</p>

            <div className='genreBlock'>
                <p className = "cate">Genre</p>
                <p className = "ans">{props.genre}</p>
                <div className = "line"></div>
                <div className = "ratingBottom">
                    <p className = "cate">Rating</p>
                    <p className = "ans">{props.movierating}</p>
                </div>
            </div>
            </div>

            <div>
            <img className = "imageNow" src= {props.Url} onClick = {handleClick}/>
            </div>
            </div>
      

        )}
        {flip &&(
            <>
            <div className = "flippedSide">
            <p className = "movieTitleNow">{props.Name}</p>
              
            
                <div className = "genreReprise">
                <p className = "cate">Description</p>
              <div className = "line3"/>
                <p className='ans ratingBottom'>{props.description}</p>

                <div className = "otherInfo">
                  <div className = "infoOpt">
                <p className = "cate">Producer</p>
              <div className = "line10"/>
                <p className='ans2 ratingBottom'>{props.producer}</p>
                </div>
                <div className = "infoOpt">
                <p className = "cate">Director</p>
              <div className = "line10"/>
                <p className='ans2 ratingBottom'>{props.director}</p>
                </div>
                <div className = "infoOpt">
                <p className = "cate">Cast</p>
              <div className = "line10"/>
                <p className='ans2 ratingBottom'>{props.cast}</p>
                </div>
                </div>
                </div>
                            
            
        
            
                <div className =  "cardButtons">
                  <Link to={{pathname :"/ShowTimes"}} state={{from: props.Name, id: 1}} className='buttonReprise2'>See Show Times</Link>

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

export default NowPlayingCard;