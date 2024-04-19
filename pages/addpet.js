import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './components/Navbar';
import styles from '../styles/pet.module.css';

export default function AddPet() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState("Male");
    const [pet_type, setType] = useState("Cat");
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name && age && gender && pet_type) {
            try {

                const response = await fetch('/api/addpet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: name, age: age, gender: gender, pet_type: pet_type, adopted: 0 }),
                });

                if (response.ok) {
                    pet_type === "Cat" ?
                    router.push('/pets/Cat'):
                    router.push('/pets/Dog');
                    ;
                } else {
                    console.error('Add Pet failed');
                }

            } catch (error) {
                console.error('Error adding pet:', error);
            }
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
                        <label htmlFor="age_input" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age_input" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender_input" className="form-label">Gender</label>
                        <select className="form-select" id="gender_input" onChange={(e) => setGender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type_input" className="form-label">Type</label>
                        <select className="form-select" id="type_input" onChange={(e) => setType(e.target.value)}>
                            <option value="Cat">Cat</option>
                            <option value="Dog">Dog</option>
                        </select>
                    </div>
                    <button type="submit" className={styles.roundedbutton}>Submit</button>
                </form>
            </div>
        </>
    );
}
