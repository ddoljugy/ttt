import React, { useState } from 'react';
import styles from '../styles/Filters.module.css';

function SellYourCar() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  const handleSellCar = async () => {
    const carData = { brand, model, year, price };

    try {
      const response = await fetch('/api/moveCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Car data sent successfully:', result);
        alert('Car has been successfully listed!');
      } else {
        console.error('Error:', result);
        alert('Error occurred while listing the car.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error occurred while listing the car.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Sell Your Car</h2>
      <form>
        <div className={styles.formRow}>
          <label>Brand:</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className={styles.formRow}>
          <label>Model:</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className={styles.formRow}>
          <label>Year:</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className={styles.formRow}>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button type="button" onClick={handleSellCar}>Sell</button>
      </form>
    </div>
  );
}

export default SellYourCar;
