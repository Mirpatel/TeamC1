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
        setFlip(false);
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
    <div className = "card">
        <h5>{props.title}</h5>
        {!flip &&(
        <img className = "image" src= {props.imageUrl} onClick = {handleClick}/>
        )}
        {flip &&(
            <>
              <div className = "flippedSide">
                
                <p>{props.description}</p>
                <p>Rating: {props.rating}</p>
                  <Link to={{pathname :"/ShowTimes"}} state={{from: props.title}} className='button'>See Show Times</Link>

                  <button onClick={openModal} className="button">Watch Trailer</button>
                  <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style="content"
                  contentLabel="Example Modal"
                  >
                    <button onClick={closeModal}>close</button>
                  <div>
                    <YoutubeEmbed embedId={props.trailer}/>
                  </div>
                  </Modal>
                  
              </div>
            <FaChevronCircleLeft className = "back" onClick = {handleClickBack}/>
            </>
        )}
        
      </div>
    </>
  );
}

export default MovieCard;