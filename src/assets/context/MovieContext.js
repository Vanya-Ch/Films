import Modal from "../components/Modal";
import { useState} from "react";

const API_IMAGES = "https://image.tmdb.org/t/p/w500";

const Movies = ({title, poster_path, id, overview, vote_average }) => {
    
    const [show, setShow] = useState(false);


    return(
        <div className="movie">
            <img className="movie__image" src={API_IMAGES+poster_path} alt="film"/>
            <button className="movie__info" onClick={()=>setShow(true)}>View more</button>
            <Modal show={show} setShow={setShow} >
                <div className="modal__head">
                    <img className="modal__image" src={API_IMAGES+poster_path} alt="film"/>
                    <div>
                        <h2 className="modal__title">{title}</h2>
                        <h4>ImDB: {vote_average}</h4>
                    </div>
                </div>
                <div className="modal__overview">
                    <h3>Overview:</h3>
                    <div>
                        {overview}
                    </div>
                </div>
                <button className="modal__button" onClick={()=>setShow(false)}>Close</button>
            </Modal>
        </div>
    )
}

export default Movies;