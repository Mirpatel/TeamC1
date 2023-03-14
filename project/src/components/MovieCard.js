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

    const handleClick = () => {
        setFlip(true);
    }
    const handleClickBack = () => {
        setFlip(!flip);
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
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
    <p className = "top">IMDB: {props.rating}</p>
        <h4>{props.title}</h4>
        
        {!flip &&(
        <img className = "image" src= {props.imageUrl} onClick = {handleClick}/>
        )}
        {flip &&(
            <>
            <hr></hr>
              <div className = "flippedSide">
              
                 
                  <p className = "genre2">{props.genre}</p>
                  
                  
      
            

                <div className = "genre">
                <p className = "dark">Description:</p>
          
                <p className='dark'>{props.description}</p>
                </div>
                <div className = "movInfo">
                  <Link to={{pathname :"/ShowTimes"}} state={{from: props.title}} className='buttonReprise2'>See Show Times</Link>

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