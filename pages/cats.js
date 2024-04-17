import 'bootstrap/dist/css/bootstrap.min.css';
import AnimalCard from './components/AnimalCard';
import Link from "next/link";
import { useEffect } from 'react';
import { useState } from 'react';

export default function Cats() {
    const [pets, setPets] = useState([]);

    const [displayLeft, addLeft] = useState("");
    const [displayMiddle, addMiddle] = useState("");
    const [displayRight, addRight] = useState("");


    //first useEffect
    useEffect(() => {
        setPets(
            [
                { name: "Binugs", gender: "Male", age: "11", breed: "yes" },
                { name: "Mango", gender: "Female", age: "12", breed: "yes" },
                { name: "Mochi", gender: "Male", age: "13", breed: "yes" },
                { name: "Chicken", gender: "Female", age: "14", breed: "yes" },
                { name: "Cat", gender: "Male", age: "15", breed: "yes" },
                { name: "Bobo", gender: "Female", age: "16", breed: "yes" },
                { name: "Yeetus", gender: "Male", age: "17", breed: "yes" },
                { name: "Dictator", gender: "Female", age: "18", breed: "yes" }
            ]
        )
    }, [])

    //fires whenever pets is changed
    useEffect(() => {
        for (let i = 0; i < pets.length; i++) {
            console.log(i);
            switch (i % 3) {
                case 0:
                    addLeft(old => [...old, <AnimalCard name={pets[i].name} gender={pets[i].gender} age={pets[i].age} breed={pets[i].breed} />])
                    break;
                case 1:
                    addMiddle(old => [...old, <AnimalCard name={pets[i].name} gender={pets[i].gender} age={pets[i].age} breed={pets[i].breed} />])
                    break;
                case 2:
                    addRight(old => [...old, <AnimalCard name={pets[i].name} gender={pets[i].gender} age={pets[i].age} breed={pets[i].breed} />])
                    break;
            }
        }
    }, [pets])

    return (
        <>
            <div className="container">
                <Link href="/">Back!</Link>
                <div className="row">
                    <div className="col">
                        {displayLeft}
                    </div>
                    <div className="col">
                        {displayMiddle}
                    </div>
                    <div className="col">
                        {displayRight}
                    </div>
                </div>
            </div>
        </>
    );
}
