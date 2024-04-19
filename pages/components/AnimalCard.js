import React from 'react';
import styles from '../../styles/AnimalCard.module.css';
import { useRouter } from 'next/router'

function AnimalCard({ name = "Binugs", gender = "N/A", age = "99", adopted = false, img = "/image/adoptme.png", id }) {

    if(adopted){
        img = "/image/kittypet.png";
    }
    const router = useRouter();

    const handleClick = async () => {
        await fetch('/api/adopt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id}),
        });

        //router.reload();
        
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
                        </p>
                        {
                            adopted ?
                                <button className={styles.roundedbutton} onClick={handleClick}>I got adopted!</button> :
                                <button className={styles.roundedbutton} onClick={handleClick} disabled>Adopt!</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnimalCard;
