export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { email, password } = req.body;
  
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(405).end();
    }
}
