
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // CSS 스타일 임포트

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link href="/"><a className={styles.logo}>Next Hop</a></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
