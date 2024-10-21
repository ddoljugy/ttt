import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Show() {
    const [carsSeoul, setCarsSeoul] = useState([]);
    const [carsSaoPaulo, setCarsSaoPaulo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resSeoul = await axios.get('/api/cars?region=seoul');
                const resSaoPaulo = await axios.get('/api/cars?region=saopaulo');
                setCarsSeoul(resSeoul.data);
                setCarsSaoPaulo(resSaoPaulo.data);
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Seoul Region Cars</h1>
            <ul>
                {carsSeoul.map((car, index) => (
                    <li key={index}>
                        {car.brand} - {car.model} ({car.made_year}) - ${car.price}
                    </li>
                ))}
            </ul>

            <h1>Sao Paulo Region Cars</h1>
            <ul>
                {carsSaoPaulo.map((car, index) => (
                    <li key={index}>
                        {car.brand} - {car.model} ({car.made_year}) - ${car.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}
