import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './components/Navbar';
import styles from '../styles/pet.module.css';

export default function AddPet() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [breed, setBreed] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('/api/addpet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, gender, age, breed }),
            });

            if (response.ok) {
                router.push('/cats');
            } else {
                console.error('Add Pet failed');
            }
        } catch (error) {
            console.error('Error adding pet:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.maincontainer}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name_input" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name_input" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender_input" className="form-label">Gender</label>
                        <select className="form-select" id="gender_input" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>                    
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age_input" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age_input" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="breed_input" className="form-label">Breed</label>
                        <input type="text" className="form-control" id="breed_input" value={breed} onChange={(e) => setBreed(e.target.value)} />
                    </div>
                    <button type="submit" className={styles.roundedbutton}>Submit</button>
                </form>
            </div>
        </>
    );
}
