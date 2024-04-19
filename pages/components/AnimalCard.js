import React from 'react';
import styles from '../../styles/AnimalCard.module.css';

function AnimalCard({ name = "Binugs", gender = "N/A", age = "99", breed = "N/A", img = "/image/adoptme.png", _id, handleAdopt }) {
    const handleClick = () => {
        handleAdopt(_id);
    };

    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={img} className="img-fluid rounded-start" alt="..." style={{ height: "180px", width: "180px" }} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">
                            <b>Gender: {gender}</b> <br />
                            <b>Age: {age}</b><br />
                            <b>Breed: {breed}</b>
                        </p>
                        <button className={styles.roundedbutton} onClick={handleClick}>Adopt!</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnimalCard;
