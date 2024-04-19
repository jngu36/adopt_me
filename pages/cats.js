import 'bootstrap/dist/css/bootstrap.min.css';
import AnimalCard from './components/AnimalCard';
import Link from "next/link";
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import styles from '../styles/pet.module.css';

export default function Cats() {
    const [pets, setPets] = useState([]);

    const handleAdopt = async (petId) => {
        try {
            const response = await fetch('http://localhost:5000/removepet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: petId })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log success message
                // Remove the adopted pet from the pets array
                setPets(prevPets => prevPets.filter(pet => pet._id !== petId));
            } else {
                throw new Error('Failed to remove pet');
            }
        } catch (error) {
            console.error('Error adopting pet:', error);
        }
    };

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch('http://localhost:5000/getpets');
                if (response.ok) {
                    const data = await response.json();
                    setPets(data.pets);
                } else {
                    throw new Error('Failed to fetch pets');
                }
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };
        fetchPets();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <div className={styles.buttoncontainer}>
                    <Link href="/" className={styles.roundedbutton}>Back!</Link>
                    <Link href="/addpet" className={styles.roundedbutton}>Add Pet!</Link>
                </div>
                <div className={styles.maincontainer}>
                    <div className="row">
                        {pets.map(pet => (
                            <div key={pet.name} className="col">
                                <AnimalCard
                                    name={pet.name}
                                    gender={pet.gender}
                                    age={pet.age}
                                    breed={pet.breed}
                                    _id={pet._id}
                                    handleAdopt={handleAdopt}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
