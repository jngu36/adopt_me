import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';

function PetList() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await fetch('http://localhost:5000/getpets');
            const data = await response.json();
            setPets(data.pets);
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    };

    const handleAdopt = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/removepet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            console.log(data.message); // Log success or error message
            // Refresh the list of pets after adoption
            fetchPets();
        } catch (error) {
            console.error('Error adopting pet:', error);
        }
    };

    return (
        <div>
            {pets.map(pet => (
                <AnimalCard
                    key={pet._id}
                    name={pet.name}
                    gender={pet.gender}
                    age={pet.age}
                    breed={pet.breed}
                    handleAdopt={handleAdopt}
                    _id={pet._id}
                />
            ))}
        </div>
    );
}

export default PetList;
