export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, gender, age, breed } = req.body;

            const response = await fetch('http://localhost:5000/addpet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, gender, age, breed }),
            });

            if (response.ok) {
                const data = await response.json();
                res.status(200).json(data);
            } else {
                throw new Error('Add pet failed');
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end();
    }
}
