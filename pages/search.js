import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Search() {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/cars', { brand, model, year, price });
            router.push('/show');
        } catch (error) {
            console.error('Error submitting car data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Brand:</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <label>Model:</label>
            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
            <label>Year:</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
            <label>Price:</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    );
}
