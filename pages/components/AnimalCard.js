import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { motion } from "framer-motion";

function AnimalCard({name = "Binugs", gender="N/A", age="99", breed="N/A", img="/image/adoptme.png"}) {
    return (
        <div class="card mb-3" style={{ maxWidth: "540px" }}>
            <div class="row g-0">
                <div class="col-md-4">
                    <img src={img} class="img-fluid rounded-start" alt="..." style={{height: "180px", width: "180px"}}/>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{name}</h5>
                        <p class="card-text">
                            <b>Gender: {gender}</b> <br />
                            <b>Age: {age}</b><br />
                            <b>Breed: {breed}</b>
                        </p>
                        <button>Adopt!</button>
                    </div>
                </div>
            </div>
        </div>


    );
}
export default AnimalCard;