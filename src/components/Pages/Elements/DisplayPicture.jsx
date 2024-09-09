import React from 'react';
import "./Elements.css";

function DisplayPicture({title, image, credit}) {
    return (
        <div className='image-container'>
            <div className="image-title">{title}</div>
            <img className='image-display' src={image} alt="moon" />
            <div className="image-credit">Photos By {credit}</div>
        </div>
    );
}

export default DisplayPicture;