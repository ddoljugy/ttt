import React, { useState } from 'react';
import styles from '../styles/Filters.module.css';

function Filters() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [made_year, setMadeYear] = useState('');
  const [price, setPrice] = useState('');

  const handleSearchCars = async () => {
    const filterData = { brand, model, made_year, price };

    try {
      const response = await fetch('/api/filterCars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterData),
      });

      if (response.ok) {
        console.log('Filter request successful');
      } else {
        console.error('Error occurred while browsing cars.');
      }
    } catch (error) {
      console.error('Network error occurred while browsing cars.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Browse Cars</h2>
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
          <input type="number" value={made_year} onChange={(e) => setMadeYear(e.target.value)} />  {/* 필드명 수정 */}
        </div>
        <div className={styles.formRow}>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button type="button" onClick={handleSearchCars}>Search</button>
      </form>
    </div>
  );
}

export default Filters;
