import 'bootstrap/dist/css/bootstrap.min.css';
import AnimalCard from '../components/AnimalCard';
import Link from "next/link";
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../../styles/pet.module.css';
import { useRouter } from 'next/router';

export default function Cats() {
    const router = useRouter();
    const { pet_type } = router.query;
    const [pets, setPets] = useState([]);

    console.log("type", pet_type);

    const fetchPets = async () => {
        try {
            const response = await fetch(`/api/getPets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pet_type: pet_type })
            });

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

    useEffect(() => {
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
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
